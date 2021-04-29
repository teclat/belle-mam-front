import React, { Component } from "react";
import "./style.scss";
import Header from "../../components/header";
import Footer from "../../components/footer";

function WhyBelleMam(props) {
  return (
    <div id="why">
      <Header />
      <section className="why-1 d-flex align-items-center">
        <div>
          <h2>
            Como <br />
            <span>começou?</span>
          </h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Pellentesque aliquam tincidunt nisl a congue. Praesent gravida quis
            justo vitae mattis. Quisque egestas, neque sed faucibus congue, nunc
            metus cursus est, nec porta justo ipsum et dolor. Nullam mattis
            imperdiet massa, et mollis tortor faucibus vitae. Curabitur eget
            faucibus libero.{" "}
          </p>
        </div>
        <img src={require("../../assets/images/why-1-img.png")} alt="" />
      </section>
      <section className="why-2 d-flex align-items-center">
        <div>
          <h2>
            Quem é <br />
            <span>
              Natália
              <br /> Lemos?
            </span>
          </h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Pellentesque aliquam tincidunt nisl a congue. Praesent gravida quis
            justo vitae mattis. Quisque egestas, neque sed faucibus congue, nunc
            metus cursus est, nec porta justo ipsum et dolor. Nullam mattis
            imperdiet massa, et mollis tortor faucibus vitae. Curabitur eget
            faucibus libero.{" "}
          </p>
        </div>
        <img src={require("../../assets/images/why-2-img.png")} alt="" />
      </section>
      <section className="why-3 d-flex align-items-center">
        <div>
          <h2>
            Empreendedorismo <br />
            <span>Materno</span>
          </h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Pellentesque aliquam tincidunt nisl a congue. Praesent gravida quis
            justo vitae mattis. Quisque egestas, neque sed faucibus congue, nunc
            metus cursus est, nec porta justo ipsum et dolor. Nullam mattis
            imperdiet massa, et mollis tortor faucibus vitae. Curabitur eget
            faucibus libero.{" "}
          </p>
        </div>
        <img src={require("../../assets/images/why-3-img.png")} alt="" />
      </section>
      <section className="why-4 d-flex align-items-center">
        <div>
          <h2>
            Belle Mam <br />e o{" "}
            <span>
              nosso <br />
              propósito
            </span>
          </h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Pellentesque aliquam tincidunt nisl a congue. Praesent gravida quis
            justo vitae mattis. Quisque egestas, neque sed faucibus congue, nunc
            metus cursus est, nec porta justo ipsum et dolor. Nullam mattis
            imperdiet massa, et mollis tortor faucibus vitae. Curabitur eget
            faucibus libero.{" "}
          </p>
        </div>
        <img src={require("../../assets/images/why-4-img.png")} alt="" />
      </section>
      <Footer />
    </div>
  );
}

export default WhyBelleMam;
