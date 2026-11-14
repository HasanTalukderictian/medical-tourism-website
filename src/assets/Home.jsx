import Achievements from "./Frontend/Achievements";
import Banner from "./Frontend/Banner";
import Faq from "./Frontend/Faq";
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
              <Faq />
              <Mission/>
              <Testominal/>
         
       </>
    );
}

export default Home;