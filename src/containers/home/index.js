import React, { Component } from "react";
import Footer from "../../components/footer";
import Header from "../../components/header";
import Hero from "../../components/home/hero";
import Benefits from "../../components/home/benefits";
import HowItWorks from "../../components/home/how-it-works";
import Testimonial from "../../components/home/testimonial";
import Services from "../../components/home/services";

import { useState } from "react";
import FirstRender from "../../hooks/FirstRender";

function Home(props) {
  const [service, setService] = useState(2);

  const isFirstRender = FirstRender();

  React.useEffect(() => {
    handleScroll();
  }, []);

  React.useEffect((prevProps) => {
    if (!isFirstRender) {
      const {
        location: { pathname, hash },
      } = this.props;
      if (
        pathname !== prevProps.location.pathname ||
        hash !== prevProps.location.hash
      ) {
        handleScroll();
      }
    }
  }, []);

  const handleScroll = () => {
    const {
      location: { hash },
    } = props;
    const element = document.getElementById(hash.replace("#", ""));

    setTimeout(() => {
      window.scrollTo({
        behavior: element ? "smooth" : "auto",
        top: element ? element.offsetTop : 0,
      });
    }, 100);
  };

  return (
    <div>
      <Header />
      <Hero service={service} />
      <Services setService={(e) => setService(e)} />
      <Benefits />
      <HowItWorks />
      <Testimonial />
      <Footer />
    </div>
  );
}

export default Home;
