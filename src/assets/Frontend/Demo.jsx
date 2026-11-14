

const SITE_URL = 'https://www.akashbariholidays.com/medical-service'

const css = `
@import url('https://fonts.googleapis.com/css2?family=Sora:wght@500;700&family=Hind+Siliguri:wght@400;500;600&display=swap');

.up-root {
  --ink: #0d2b33;
  --muted: #4d6a72;
  --bg: #eef5f4;
  --card: #ffffff;
  --teal: #0f6b6f;
  --teal-dark: #0a4d50;
  --sun: #f4a63a;
  min-height: 100vh;
  min-height: 100dvh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: clamp(16px, 4vw, 40px);
  box-sizing: border-box;
  background:
    radial-gradient(circle at 85% 10%, rgba(244,166,58,.18), transparent 38%),
    radial-gradient(circle at 10% 90%, rgba(15,107,111,.16), transparent 42%),
    var(--bg);
  font-family: 'Hind Siliguri', system-ui, sans-serif;
  color: var(--ink);
}
.up-root *, .up-root *::before, .up-root *::after { box-sizing: border-box; }

.up-card {
  width: 100%;
  max-width: 620px;
  background: var(--card);
  border-radius: 28px;
  padding: clamp(28px, 6vw, 56px) clamp(22px, 5vw, 52px);
  text-align: center;
  box-shadow: 0 24px 60px -24px rgba(13,43,51,.28);
}

.up-icon {
  width: 84px; height: 84px;
  margin: 0 auto 26px;
  border-radius: 50%;
  background: var(--teal);
  display: grid; place-items: center;
  position: relative;
}
.up-icon::after {
  content: '';
  position: absolute; inset: -9px;
  border-radius: 50%;
  border: 2px solid var(--sun);
  opacity: .0;
  animation: up-ring 2.4s ease-out infinite;
}
@keyframes up-ring {
  0% { transform: scale(.92); opacity: .9; }
  100% { transform: scale(1.25); opacity: 0; }
}

.up-title {
  font-family: 'Sora', system-ui, sans-serif;
  font-weight: 700;
  font-size: clamp(1.6rem, 5.2vw, 2.35rem);
  line-height: 1.2;
  margin: 0 0 14px;
  letter-spacing: -0.01em;
}
.up-text {
  margin: 0 auto 8px;
  max-width: 46ch;
  font-size: clamp(1rem, 2.6vw, 1.1rem);
  line-height: 1.65;
  color: var(--muted);
}
.up-bn {
  margin: 0 auto 30px;
  max-width: 46ch;
  font-size: clamp(1rem, 2.6vw, 1.1rem);
  line-height: 1.7;
  color: var(--ink);
  font-weight: 500;
}

.up-btn {
  display: inline-flex; align-items: center; justify-content: center; gap: 10px;
  width: 100%; max-width: 360px;
  padding: 16px 28px;
  border-radius: 999px;
  background: var(--teal);
  color: #fff;
  font-family: 'Sora', system-ui, sans-serif;
  font-weight: 500;
  font-size: 1rem;
  text-decoration: none;
  transition: background .2s, transform .2s;
}
.up-btn:hover { background: var(--teal-dark); transform: translateY(-2px); }
.up-btn:focus-visible { outline: 3px solid var(--sun); outline-offset: 3px; }

.up-url {
  margin: 18px 0 0;
  font-size: .85rem;
  color: var(--muted);
  word-break: break-all;
}

.up-bar {
  height: 6px; border-radius: 999px;
  background: #dbe8e7;
  margin: 34px auto 0;
  max-width: 260px;
  overflow: hidden;
}
.up-bar span {
  display: block; height: 100%; width: 40%;
  border-radius: inherit;
  background: var(--sun);
  animation: up-slide 1.8s ease-in-out infinite;
}
@keyframes up-slide {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(260%); }
}

@media (prefers-reduced-motion: reduce) {
  .up-icon::after, .up-bar span { animation: none; }
  .up-bar span { width: 60%; }
  .up-btn { transition: none; }
}
`

const Demo = () => {
  return (
    <main className="up-root">
      <style>{css}</style>

      <section className="up-card" aria-labelledby="up-heading">
        <div className="up-icon" aria-hidden="true">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
            <path
              d="M9 3h6v6h6v6h-6v6H9v-6H3V9h6V3z"
              fill="#fff"
            />
          </svg>
        </div>

        <h1 className="up-title" id="up-heading">
          Our website is being upgraded
        </h1>

        <p className="up-text">
          We are building a faster, better experience for you. Until it is
          ready, please visit our current website for all information about our
          medical services.
        </p>
        <p className="up-bn" lang="bn">
          আমাদের ওয়েবসাইট আপগ্রেড করা হচ্ছে। বিস্তারিত তথ্যের জন্য অনুগ্রহ করে
          বর্তমান ওয়েবসাইটটি ভিজিট করুন।
        </p>

        <a
          className="up-btn"
          href={SITE_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          Visit current website
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M7 17L17 7M9 7h8v8"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>

        <p className="up-url">akashbariholidays.com/medical-service</p>

        <div className="up-bar" aria-hidden="true">
          <span />
        </div>
      </section>
    </main>
  )
}

export default Demo