import { useEffect, useMemo, useState } from "react";
import "../Backend/Css/UsersRoles.css";
import { getUser, usersApi, rolesApi, listOf } from "../../components/api";
import { PERMISSION_GROUPS, ALL_PERMISSIONS, FULL_ACCESS_ROLES, roleSlug, roleLabel } from "./permissions";

/* =====================================================
   USERS & ROLES ("urp-" class)
   Rakhbe: src/assets/Backend/UsersRoles.jsx
   Import: api -> src/components/api.js, permissions -> src/assets/Backend/permissions.js
   - Users tab: user list, notun user, edit, active/inactive, delete
   - Roles tab: role banao, checkbox diye menu access dao

   Backend route na thakle (404) DEMO data dekhay, jate design dekha jay.
   Demo te kora change save hoy na.
   ===================================================== */

/* ---------------------------- DEMO DATA ---------------------------- */
const DEMO_ROLES = [
  { id: 1, name: "Super Admin", slug: "super_admin", permissions: ALL_PERMISSIONS },
  { id: 2, name: "Manager", slug: "manager", permissions: ["dashboard", "queries", "treatment_plans", "appointments", "consultations", "bookings", "visa", "reports"] },
  { id: 3, name: "Content Editor", slug: "content_editor", permissions: ["dashboard", "home", "hospitals", "doctors", "packages", "media", "career"] },
  { id: 4, name: "Support Staff", slug: "support_staff", permissions: ["queries", "appointments", "messages"] },
];

const DEMO_USERS = [
  { id: 1, name: "Admin", email: "admin@gmail.com", role_id: 1, active: true, created_at: "2026-10-02" },
  { id: 2, name: "Nusrat Jahan", email: "nusrat@akbh.com", role_id: 2, active: true, created_at: "2026-10-14" },
  { id: 3, name: "Rakib Hasan", email: "rakib@akbh.com", role_id: 3, active: true, created_at: "2026-11-01" },
  { id: 4, name: "Sadia Islam", email: "sadia@akbh.com", role_id: 4, active: false, created_at: "2026-11-09" },
];

/* ---------------------------- ICONS ---------------------------- */
const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
};

const paths = {
  users: <><circle cx="9" cy="8" r="3.2" /><path d="M3 20c.6-3.4 3-5 6-5s5.4 1.6 6 5" /><circle cx="17" cy="9" r="2.4" /><path d="M16.5 14.2c2.4.2 4 1.7 4.5 4.3" /></>,
  shield: <><path d="M12 3l8 3v6c0 4.5-3.4 8.2-8 9-4.6-.8-8-4.5-8-9V6z" /><path d="M9 12l2 2 4-4" /></>,
  plus: <path d="M12 5v14M5 12h14" />,
  search: <><circle cx="11" cy="11" r="7" /><path d="M20 20l-3.5-3.5" /></>,
  edit: <><path d="M4 20h4L19 9l-4-4L4 16z" /><path d="M13.5 6.5l4 4" /></>,
  trash: <><path d="M4 7h16M10 11v6M14 11v6" /><path d="M6 7l1 13h10l1-13M9 7V4h6v3" /></>,
  close: <path d="M6 6l12 12M18 6L6 18" />,
  check: <path d="M5 12.5l4.5 4.5L19 7.5" />,
  eye: <><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" /><circle cx="12" cy="12" r="3" /></>,
  eyeOff: <><path d="M3 3l18 18" /><path d="M10.6 5.1A10.7 10.7 0 0 1 12 5c6.5 0 10 7 10 7a17 17 0 0 1-3.2 4.1M6.6 6.6A17 17 0 0 0 2 12s3.5 7 10 7a9.7 9.7 0 0 0 5.4-1.6" /></>,
  lock: <><rect x="5" y="11" width="14" height="9" rx="2" /><path d="M8 11V8a4 4 0 0 1 8 0v3" /></>,
  alert: <><circle cx="12" cy="12" r="9" /><path d="M12 8v5M12 16v.01" /></>,
  info: <><circle cx="12" cy="12" r="9" /><path d="M12 11v5M12 8v.01" /></>,
};

const Icon = ({ name, size = 18 }) => (
  <svg {...base} width={size} height={size}>
    {paths[name]}
  </svg>
);

/* ---------------------------- HELPERS ---------------------------- */
const initials = (name) =>
  String(name || "?")
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

const fmtDate = (d) => {
  if (!d) return "-";
  const dt = new Date(d);
  return isNaN(dt) ? "-" : dt.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
};

const isActive = (u) => u.active === true || u.active === 1 || u.active === "1";
const isFullRole = (role) => FULL_ACCESS_ROLES.includes(roleSlug(role));
const permLabel = PERMISSION_GROUPS.reduce((m, g) => {
  g.items.forEach((i) => {
    m[i.key] = i.label;
  });
  return m;
}, {});

/* User er role (role_id / role object / role string jei ashuk) */
const roleOfUser = (u, roles) => {
  if (u.role_id) {
    const r = roles.find((x) => String(x.id) === String(u.role_id));
    if (r) return r;
  }
  if (u.role && typeof u.role === "object" && u.role.id) {
    const r = roles.find((x) => String(x.id) === String(u.role.id));
    return r || u.role;
  }
  if (u.role) {
    const slug = roleSlug(u.role);
    return roles.find((x) => roleSlug(x) === slug) || { name: u.role, slug };
  }
  return null;
};

/* =====================================================
   PAGE
   ===================================================== */
const UsersRoles = () => {
  const me = getUser() || {};
  const [tab, setTab] = useState("users");
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [demo, setDemo] = useState(false);
  const [loadError, setLoadError] = useState("");
  const [toast, setToast] = useState(null);

  const notify = (text, type = "success") => {
    setToast({ text, type, id: Date.now() });
  };

  useEffect(() => {
    if (!toast) return undefined;
    const t = setTimeout(() => setToast(null), 3500);
    return () => clearTimeout(t);
  }, [toast]);

  const load = async () => {
    setLoading(true);
    setLoadError("");
    try {
      const [u, r] = await Promise.all([usersApi.list(), rolesApi.list()]);
      setUsers(listOf(u));
      setRoles(listOf(r));
      setDemo(false);
    } catch (err) {
      if (err.status === 404) {
        // Backend e ekhono route nai -> demo
        setUsers(DEMO_USERS);
        setRoles(DEMO_ROLES);
        setDemo(true);
      } else {
        setLoadError(err.message);
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="urp">
      {/* ---------- Page head ---------- */}
      <div className="urp-head">
        <div>
          <h2>Users &amp; Roles</h2>
          <p>Create staff accounts and choose which menus each role can open.</p>
        </div>
        <div className="urp-tabs" role="tablist">
          <button type="button" role="tab" aria-selected={tab === "users"} className={tab === "users" ? "is-on" : ""} onClick={() => setTab("users")}>
            <Icon name="users" /> Users <span>{users.length}</span>
          </button>
          <button type="button" role="tab" aria-selected={tab === "roles"} className={tab === "roles" ? "is-on" : ""} onClick={() => setTab("roles")}>
            <Icon name="shield" /> Roles &amp; Permissions <span>{roles.length}</span>
          </button>
        </div>
      </div>

      {demo && (
        <div className="urp-banner">
          <Icon name="info" />
          <span>
            <strong>Demo data.</strong> The backend routes <code>/api/admin/users</code> and <code>/api/admin/roles</code> are
            not ready yet, so changes here are not saved.
          </span>
        </div>
      )}

      {loadError && (
        <div className="urp-banner urp-banner--error" role="alert">
          <Icon name="alert" />
          <span>{loadError}</span>
          <button type="button" onClick={load}>
            Try again
          </button>
        </div>
      )}

      {loading ? (
        <div className="urp-card urp-loading">
          <span className="urp-spinner" aria-hidden="true" /> Loading...
        </div>
      ) : tab === "users" ? (
        <UsersTab users={users} setUsers={setUsers} roles={roles} demo={demo} me={me} notify={notify} />
      ) : (
        <RolesTab roles={roles} setRoles={setRoles} users={users} demo={demo} notify={notify} />
      )}

      {toast && (
        <div key={toast.id} className={`urp-toast urp-toast--${toast.type}`} role="status">
          <Icon name={toast.type === "error" ? "alert" : "check"} />
          {toast.text}
        </div>
      )}
    </div>
  );
};

/* =====================================================
   USERS TAB
   ===================================================== */
const UsersTab = ({ users, setUsers, roles, demo, me, notify }) => {
  const [q, setQ] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [editing, setEditing] = useState(null); // null | "new" | user
  const [deleting, setDeleting] = useState(null);
  const [busyId, setBusyId] = useState(null);

  const shown = useMemo(() => {
    const term = q.trim().toLowerCase();
    return users.filter((u) => {
      const r = roleOfUser(u, roles);
      if (roleFilter !== "all" && (!r || String(r.id) !== roleFilter)) return false;
      if (!term) return true;
      return `${u.name} ${u.email}`.toLowerCase().includes(term);
    });
  }, [users, roles, q, roleFilter]);

  const isMe = (u) => String(u.id) === String(me.id);

  const toggleActive = async (u) => {
    if (isMe(u)) return;
    const next = !isActive(u);
    setBusyId(u.id);
    try {
      if (!demo) await usersApi.update(u.id, { active: next });
      setUsers((list) => list.map((x) => (x.id === u.id ? { ...x, active: next } : x)));
      notify(`${u.name} is now ${next ? "active" : "inactive"}.`);
    } catch (err) {
      notify(err.message, "error");
    }
    setBusyId(null);
  };

  const confirmDelete = async () => {
    const u = deleting;
    setBusyId(u.id);
    try {
      if (!demo) await usersApi.remove(u.id);
      setUsers((list) => list.filter((x) => x.id !== u.id));
      notify(`${u.name} was deleted.`);
      setDeleting(null);
    } catch (err) {
      notify(err.message, "error");
    }
    setBusyId(null);
  };

  const onSaved = (saved, isNew) => {
    setUsers((list) => (isNew ? [saved].concat(list) : list.map((x) => (x.id === saved.id ? { ...x, ...saved } : x))));
    notify(isNew ? `${saved.name} was added.` : `${saved.name} was updated.`);
    setEditing(null);
  };

  return (
    <div className="urp-card">
      <div className="urp-toolbar">
        <label className="urp-search">
          <Icon name="search" />
          <input type="search" placeholder="Search name or email" value={q} onChange={(e) => setQ(e.target.value)} aria-label="Search users" />
        </label>
        <select className="urp-select" value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)} aria-label="Filter by role">
          <option value="all">All roles</option>
          {roles.map((r) => (
            <option key={r.id} value={String(r.id)}>
              {roleLabel(r)}
            </option>
          ))}
        </select>
        <button type="button" className="urp-btn" onClick={() => setEditing("new")}>
          <Icon name="plus" /> Add User
        </button>
      </div>

      <div className="urp-table-wrap">
        <table className="urp-table">
          <thead>
            <tr>
              <th>User</th>
              <th>Role</th>
              <th>Status</th>
              <th>Joined</th>
              <th className="urp-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {shown.map((u) => {
              const r = roleOfUser(u, roles);
              const active = isActive(u);
              return (
                <tr key={u.id}>
                  <td>
                    <div className="urp-person">
                      <span className="urp-avatar">{initials(u.name)}</span>
                      <div>
                        <strong>
                          {u.name} {isMe(u) && <em className="urp-you">You</em>}
                        </strong>
                        <small>{u.email}</small>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className={`urp-role ${isFullRole(r) ? "is-full" : ""}`}>
                      {isFullRole(r) && <Icon name="shield" size={14} />}
                      {roleLabel(r)}
                    </span>
                  </td>
                  <td>
                    <button
                      type="button"
                      className={`urp-status ${active ? "is-on" : ""}`}
                      onClick={() => toggleActive(u)}
                      disabled={isMe(u) || busyId === u.id}
                      title={isMe(u) ? "You cannot deactivate yourself" : active ? "Click to deactivate" : "Click to activate"}
                    >
                      <i aria-hidden="true" />
                      {active ? "Active" : "Inactive"}
                    </button>
                  </td>
                  <td>{fmtDate(u.created_at)}</td>
                  <td className="urp-right">
                    <div className="urp-actions">
                      <button type="button" onClick={() => setEditing(u)} aria-label={`Edit ${u.name}`} title="Edit">
                        <Icon name="edit" />
                      </button>
                      <button
                        type="button"
                        className="is-danger"
                        onClick={() => setDeleting(u)}
                        disabled={isMe(u)}
                        aria-label={`Delete ${u.name}`}
                        title={isMe(u) ? "You cannot delete yourself" : "Delete"}
                      >
                        <Icon name="trash" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {shown.length === 0 && (
          <div className="urp-empty">
            <Icon name="users" size={28} />
            <p>{users.length ? "No user matches your search." : "No users yet. Add your first staff member."}</p>
          </div>
        )}
      </div>

      {editing && (
        <UserModal user={editing === "new" ? null : editing} roles={roles} demo={demo} isMe={editing !== "new" && isMe(editing)} onClose={() => setEditing(null)} onSaved={onSaved} />
      )}

      {deleting && (
        <Confirm
          title="Delete this user?"
          text={`${deleting.name} (${deleting.email}) will lose access to the admin panel. This cannot be undone.`}
          busy={busyId === deleting.id}
          onCancel={() => setDeleting(null)}
          onConfirm={confirmDelete}
        />
      )}
    </div>
  );
};

/* ---------------------------- ADD / EDIT USER ---------------------------- */
const UserModal = ({ user, roles, demo, isMe, onClose, onSaved }) => {
  const isNew = !user;
  const startRole = user ? roleOfUser(user, roles) : null;
  const [form, setForm] = useState({
    name: user ? user.name : "",
    email: user ? user.email : "",
    password: "",
    password_confirmation: "",
    role_id: startRole && startRole.id ? String(startRole.id) : "",
    active: user ? isActive(user) : true,
  });
  const [showPass, setShowPass] = useState(false);
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const [serverError, setServerError] = useState("");

  const set = (k) => (e) => {
    const v = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setForm((f) => ({ ...f, [k]: v }));
    setErrors((er) => ({ ...er, [k]: "" }));
  };

  const pickedRole = roles.find((r) => String(r.id) === form.role_id);

  const validate = () => {
    const er = {};
    if (form.name.trim().length < 2) er.name = "Enter the full name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) er.email = "Enter a valid email.";
    if (isNew || form.password) {
      if (form.password.length < 8) er.password = "Use at least 8 characters.";
      else if (!/[A-Za-z]/.test(form.password) || !/\d/.test(form.password)) er.password = "Use letters and numbers.";
      if (form.password !== form.password_confirmation) er.password_confirmation = "Passwords do not match.";
    }
    if (!form.role_id) er.role_id = "Choose a role.";
    setErrors(er);
    return Object.keys(er).length === 0;
  };

  const submit = async (e) => {
    e.preventDefault();
    if (saving || !validate()) return;
    setSaving(true);
    setServerError("");

    const body = { name: form.name.trim(), email: form.email.trim(), role_id: form.role_id, active: form.active };
    if (form.password) {
      body.password = form.password;
      body.password_confirmation = form.password_confirmation;
    }

    try {
      let saved;
      if (demo) {
        saved = { id: user ? user.id : Date.now(), created_at: user ? user.created_at : new Date().toISOString(), ...body };
      } else {
        const res = isNew ? await usersApi.create(body) : await usersApi.update(user.id, body);
        saved = (res && (res.user || res.data)) || { ...user, ...body };
      }
      delete saved.password;
      delete saved.password_confirmation;
      onSaved({ ...saved, role_id: saved.role_id || body.role_id }, isNew);
    } catch (err) {
      // Laravel 422: { errors: { email: ["The email has already been taken."] } }
      if (err.data && err.data.errors) {
        const er = {};
        Object.keys(err.data.errors).forEach((k) => {
          er[k] = err.data.errors[k][0];
        });
        setErrors(er);
      }
      setServerError(err.message);
      setSaving(false);
    }
  };

  return (
    <Modal title={isNew ? "Add new user" : "Edit user"} onClose={onClose}>
      <form onSubmit={submit} noValidate className="urp-form">
        {serverError && (
          <div className="urp-banner urp-banner--error" role="alert">
            <Icon name="alert" /> <span>{serverError}</span>
          </div>
        )}

        <div className="urp-grid">
          <Field label="Full name" error={errors.name}>
            <input value={form.name} onChange={set("name")} placeholder="e.g. Nusrat Jahan" autoComplete="off" />
          </Field>
          <Field label="Email" error={errors.email}>
            <input type="email" value={form.email} onChange={set("email")} placeholder="name@akbh.com" autoComplete="off" />
          </Field>
          <Field label={isNew ? "Password" : "New password"} hint={isNew ? "" : "Leave empty to keep the old one"} error={errors.password}>
            <div className="urp-pass">
              <input type={showPass ? "text" : "password"} value={form.password} onChange={set("password")} placeholder="At least 8 characters" autoComplete="new-password" />
              <button type="button" onClick={() => setShowPass((v) => !v)} aria-label={showPass ? "Hide password" : "Show password"}>
                <Icon name={showPass ? "eyeOff" : "eye"} />
              </button>
            </div>
          </Field>
          <Field label="Confirm password" error={errors.password_confirmation}>
            <input type={showPass ? "text" : "password"} value={form.password_confirmation} onChange={set("password_confirmation")} placeholder="Type it again" autoComplete="new-password" />
          </Field>
        </div>

        <Field label="Role" error={errors.role_id}>
          <select value={form.role_id} onChange={set("role_id")} disabled={isMe}>
            <option value="">Select a role</option>
            {roles.map((r) => (
              <option key={r.id} value={String(r.id)}>
                {roleLabel(r)}
              </option>
            ))}
          </select>
          {isMe && <small className="urp-hint">You cannot change your own role.</small>}
        </Field>

        {/* Ei role ki ki dekhte parbe */}
        {pickedRole && (
          <div className="urp-preview">
            <strong>
              <Icon name="shield" size={15} /> This role can open:
            </strong>
            {isFullRole(pickedRole) ? (
              <p className="urp-full">Everything (full access)</p>
            ) : (pickedRole.permissions || []).length ? (
              <ul>
                {(pickedRole.permissions || []).map((p) => (
                  <li key={p}>{permLabel[p] || p}</li>
                ))}
              </ul>
            ) : (
              <p>No menus yet. Give this role access in the Roles tab.</p>
            )}
          </div>
        )}

        <label className="urp-switch">
          <input type="checkbox" checked={form.active} onChange={set("active")} disabled={isMe} />
          <span aria-hidden="true" />
          <div>
            <strong>Active account</strong>
            <small>Inactive users cannot sign in.</small>
          </div>
        </label>

        <div className="urp-modal-foot">
          <button type="button" className="urp-btn urp-btn--ghost" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className="urp-btn" disabled={saving}>
            {saving ? <span className="urp-spinner" aria-hidden="true" /> : <Icon name="check" />}
            {isNew ? "Create user" : "Save changes"}
          </button>
        </div>
      </form>
    </Modal>
  );
};

/* =====================================================
   ROLES TAB
   ===================================================== */
const RolesTab = ({ roles, setRoles, users, demo, notify }) => {
  const [selectedId, setSelectedId] = useState(roles.length ? roles[0].id : "new");
  const [deleting, setDeleting] = useState(null);
  const [busy, setBusy] = useState(false);

  const selected = selectedId === "new" ? null : roles.find((r) => r.id === selectedId) || null;

  const countUsers = (role) =>
    users.filter((u) => {
      const r = roleOfUser(u, roles);
      return r && String(r.id) === String(role.id);
    }).length;

  const onSaved = (saved, isNew) => {
    setRoles((list) => (isNew ? list.concat(saved) : list.map((r) => (r.id === saved.id ? { ...r, ...saved } : r))));
    setSelectedId(saved.id);
    notify(isNew ? `Role "${saved.name}" was created.` : `Role "${saved.name}" was saved.`);
  };

  const confirmDelete = async () => {
    setBusy(true);
    try {
      if (!demo) await rolesApi.remove(deleting.id);
      const rest = roles.filter((r) => r.id !== deleting.id);
      setRoles(rest);
      setSelectedId(rest.length ? rest[0].id : "new");
      notify(`Role "${deleting.name}" was deleted.`);
      setDeleting(null);
    } catch (err) {
      notify(err.message, "error");
    }
    setBusy(false);
  };

  return (
    <div className="urp-roles">
      {/* Bam: role list */}
      <aside className="urp-card urp-role-list">
        <button type="button" className={`urp-role-new ${selectedId === "new" ? "is-on" : ""}`} onClick={() => setSelectedId("new")}>
          <Icon name="plus" /> New role
        </button>
        <ul>
          {roles.map((r) => {
            const full = isFullRole(r);
            const count = full ? ALL_PERMISSIONS.length : (r.permissions || []).length;
            return (
              <li key={r.id}>
                <button type="button" className={selectedId === r.id ? "is-on" : ""} onClick={() => setSelectedId(r.id)}>
                  <span className={`urp-role-dot ${full ? "is-full" : ""}`}>
                    <Icon name={full ? "shield" : "users"} size={16} />
                  </span>
                  <span className="urp-role-info">
                    <strong>{roleLabel(r)}</strong>
                    <small>
                      {countUsers(r)} user{countUsers(r) === 1 ? "" : "s"} · {full ? "Full access" : `${count} menu${count === 1 ? "" : "s"}`}
                    </small>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </aside>

      {/* Dan: editor */}
      <RoleEditor
        key={selectedId}
        role={selected}
        roles={roles}
        demo={demo}
        userCount={selected ? countUsers(selected) : 0}
        onSaved={onSaved}
        onDelete={() => setDeleting(selected)}
        notify={notify}
        busy={busy}
      />

      {deleting && (
        <Confirm
          title={`Delete role "${deleting.name}"?`}
          text={
            countUsers(deleting)
              ? `${countUsers(deleting)} user(s) have this role. Move them to another role first.`
              : "This role will be removed. This cannot be undone."
          }
          blocked={countUsers(deleting) > 0}
          busy={busy}
          onCancel={() => setDeleting(null)}
          onConfirm={confirmDelete}
        />
      )}
    </div>
  );
};

const RoleEditor = ({ role, roles, demo, userCount, onSaved, onDelete, notify }) => {
  const isNew = !role;
  const full = !isNew && isFullRole(role);
  const [name, setName] = useState(role ? role.name : "");
  const [perms, setPerms] = useState(() => (full ? ALL_PERMISSIONS : (role && role.permissions) || []));
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const has = (k) => perms.includes(k);
  const toggle = (k) => setPerms((p) => (p.includes(k) ? p.filter((x) => x !== k) : p.concat(k)));
  const groupState = (g) => {
    const n = g.items.filter((i) => has(i.key)).length;
    return n === 0 ? "none" : n === g.items.length ? "all" : "some";
  };
  const toggleGroup = (g) => {
    const keys = g.items.map((i) => i.key);
    const allOn = groupState(g) === "all";
    setPerms((p) => (allOn ? p.filter((k) => !keys.includes(k)) : Array.from(new Set(p.concat(keys)))));
  };

  const save = async (e) => {
    e.preventDefault();
    const clean = name.trim();
    if (clean.length < 2) return setError("Give the role a name.");
    if (roles.some((r) => r.name.toLowerCase() === clean.toLowerCase() && (!role || r.id !== role.id))) {
      return setError("A role with this name already exists.");
    }
    if (!perms.length) return setError("Tick at least one menu.");
    setError("");
    setSaving(true);
    const body = { name: clean, permissions: perms };
    try {
      let saved;
      if (demo) {
        saved = { id: role ? role.id : Date.now(), slug: clean.toLowerCase().replace(/\s+/g, "_"), ...body };
      } else {
        const res = isNew ? await rolesApi.create(body) : await rolesApi.update(role.id, body);
        saved = (res && (res.role || res.data)) || { ...role, ...body };
      }
      onSaved({ ...saved, permissions: saved.permissions || perms }, isNew);
    } catch (err) {
      setError(err.message);
      notify(err.message, "error");
    }
    setSaving(false);
  };

  return (
    <form className="urp-card urp-editor" onSubmit={save} noValidate>
      <div className="urp-editor-head">
        <div className="urp-editor-name">
          <label htmlFor="urp-role-name">Role name</label>
          <input id="urp-role-name" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Manager" disabled={full} />
        </div>
        <div className="urp-editor-count">
          <strong>{perms.length}</strong>
          <span>of {ALL_PERMISSIONS.length} menus</span>
        </div>
      </div>

      {full && (
        <div className="urp-banner">
          <Icon name="lock" />
          <span>
            <strong>{roleLabel(role)}</strong> always has full access. It cannot be edited or deleted.
          </span>
        </div>
      )}

      {!full && (
        <div className="urp-quick">
          <button type="button" onClick={() => setPerms(ALL_PERMISSIONS)}>
            Select all
          </button>
          <button type="button" onClick={() => setPerms([])}>
            Clear all
          </button>
        </div>
      )}

      <div className="urp-groups">
        {PERMISSION_GROUPS.map((g) => {
          const state = groupState(g);
          return (
            <fieldset key={g.title} className="urp-group" disabled={full}>
              <legend>
                <label className="urp-check">
                  <input
                    type="checkbox"
                    checked={state === "all"}
                    ref={(el) => {
                      if (el) el.indeterminate = state === "some";
                    }}
                    onChange={() => toggleGroup(g)}
                  />
                  <span className="urp-box" aria-hidden="true">
                    <Icon name="check" size={13} />
                  </span>
                  {g.title}
                </label>
                <small>
                  {g.items.filter((i) => has(i.key)).length}/{g.items.length}
                </small>
              </legend>
              <div className="urp-perms">
                {g.items.map((i) => (
                  <label key={i.key} className={`urp-perm ${has(i.key) ? "is-on" : ""}`}>
                    <input type="checkbox" checked={has(i.key)} onChange={() => toggle(i.key)} />
                    <span className="urp-box" aria-hidden="true">
                      <Icon name="check" size={13} />
                    </span>
                    {i.label}
                  </label>
                ))}
              </div>
            </fieldset>
          );
        })}
      </div>

      {error && (
        <p className="urp-form-error" role="alert">
          <Icon name="alert" size={16} /> {error}
        </p>
      )}

      {!full && (
        <div className="urp-editor-foot">
          {!isNew && (
            <button type="button" className="urp-btn urp-btn--danger" onClick={onDelete}>
              <Icon name="trash" /> Delete role
            </button>
          )}
          {!isNew && userCount > 0 && (
            <span className="urp-note">
              Changes apply to {userCount} user{userCount === 1 ? "" : "s"} the next time they sign in.
            </span>
          )}
          <button type="submit" className="urp-btn" disabled={saving}>
            {saving ? <span className="urp-spinner" aria-hidden="true" /> : <Icon name="check" />}
            {isNew ? "Create role" : "Save role"}
          </button>
        </div>
      )}
    </form>
  );
};

/* =====================================================
   SMALL PARTS
   ===================================================== */
const Field = ({ label, hint, error, children }) => (
  <div className={`urp-field ${error ? "has-error" : ""}`}>
    <label>
      <span>{label}</span>
      {children}
    </label>
    {hint && !error && <small className="urp-hint">{hint}</small>}
    {error && <em>{error}</em>}
  </div>
);

const Modal = ({ title, onClose, children }) => {
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const old = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = old;
    };
  }, [onClose]);

  return (
    <div className="urp-overlay" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div className="urp-modal" role="dialog" aria-modal="true" aria-label={title}>
        <div className="urp-modal-head">
          <h3>{title}</h3>
          <button type="button" onClick={onClose} aria-label="Close">
            <Icon name="close" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

const Confirm = ({ title, text, busy, blocked, onCancel, onConfirm }) => (
  <Modal title={title} onClose={onCancel}>
    <div className="urp-confirm">
      <span className="urp-confirm-icon">
        <Icon name={blocked ? "alert" : "trash"} size={24} />
      </span>
      <p>{text}</p>
      <div className="urp-modal-foot">
        <button type="button" className="urp-btn urp-btn--ghost" onClick={onCancel}>
          {blocked ? "OK" : "Cancel"}
        </button>
        {!blocked && (
          <button type="button" className="urp-btn urp-btn--danger" onClick={onConfirm} disabled={busy}>
            {busy ? <span className="urp-spinner" aria-hidden="true" /> : <Icon name="trash" />}
            Delete
          </button>
        )}
      </div>
    </div>
  </Modal>
);

export default UsersRoles;