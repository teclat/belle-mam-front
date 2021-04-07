import React, { Component } from "react";
import "./style.scss";

export default class Hero extends Component {
  state = {
    isTop: true,
    services: [
      {
        title: "Menino ou menina?",
        banner: "BM_BANNER_01.jpg",
        text:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor" +
          "incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsa lacus vel facilisis. ",
      },
      {
        title: "Faça o seu Chá de Fralda",
        banner: "BM_BANNER_02.jpg",
        text:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor" +
          "incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsa lacus vel facilisis. ",
      },
      {
        title: "Faça o seu Chá de Bebê",
        banner: "BM_BANNER_03.jpg",
        text:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor" +
          "incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsa lacus vel facilisis. ",
      },
      {
        title: "Faça seu Batizado",
        banner: "BM_BANNER_04.jpg",
        text:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor" +
          "incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsa lacus vel facilisis. ",
      },
      {
        title: "Hora de apagar as velinhas!",
        banner: "BM_BANNER_05.jpg",
        text:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor" +
          "incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsa lacus vel facilisis. ",
      },
    ],
  };

  componentDidMount() {
    document.addEventListener("scroll", () => {
      const isTop = window.scrollY < 100;
      if (isTop !== this.state.isTop) {
        this.setState({ isTop });
      }
    });
  }

  render() {
    return (
      <section
        id="hero"
        style={{
          background:
            "url(" +
            require("../../../assets/images/" +
              this.state.services[this.props.service].banner) +
            ")",
          backgroundSize: "cover",
        }}
        class="container-fluid d-flex align-items-center"
      >
        <div class="hero-box">
          <h1 class="h1">{this.state.services[this.props.service].title}</h1>
          <p class="mt-4 mb-5">
            {this.state.services[this.props.service].text}
          </p>
          <button class="btn btn-secondary">CRIE SUA LISTA AGORA!</button>
        </div>
        <div
          class={
            "chat-btn d-flex justify-content-center align-items-center " +
            (this.state.isTop ? "" : "scrolled")
          }
        >
          <img src={require("../../../assets/images/chat.png")} alt="" />
        </div>
      </section>
    );
  }
}
