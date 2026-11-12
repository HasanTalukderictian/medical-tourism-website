import Achievements from "./Frontend/Achievements";
import Banner from "./Frontend/Banner";
import Mission from "./Frontend/Mission";
import OnlineService from "./Frontend/OnlineService";
import Packages from "./Frontend/Packages";
import Testominal from "./Frontend/Testominal";
import Weworks from "./Frontend/Weworks";
import Offer from "./WhatweOffer/Offer";

function Home() {
    return (
       <>
         
              <Banner/>
              <Offer/>
              <Packages/>
              <Achievements/>
              <Weworks/>
              <OnlineService/>
              <Mission/>
              <Testominal/>
         
       </>
    );
}

export default Home;