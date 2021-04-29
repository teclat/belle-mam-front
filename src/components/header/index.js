import React, { Component } from "react";
import "./styles.scss";
import { Link } from "react-router-dom";

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
    };
  }

  componentDidMount = async () => {
    let user = await JSON.parse(localStorage.getItem("user"));
    if (user) {
      this.setState({ user });
    }
  };

  getPath = () => {
    if (this.state.user.role === "parent") {
      return "/parents/home";
    } else if (this.state.user.role === "admin") {
      return "/admin/products";
    } else if (this.state.user.role === "guest") {
      return "/guest/personal";
    }
  };

  render() {
    return (
      <header
        id="header"
        class={
          "container-fluid d-flex justify-content-between align-items-center " +
          (this.props.purple ? "purple" : "")
        }
      >
        <Link to="/home">
          <img
            class="header-logo"
            src={require("../../assets/images/" +
              (this.props.purple ? "cha-bebe-logo.png" : "logo-white.png"))}
            alt=""
          />
        </Link>
        <input
          type="checkbox"
          className="nav-menu-toggle"
          id="nav-menu-toggle"
        />
        <label for="nav-menu-toggle" className="nav-menu-toggle-label">
          <span></span>
        </label>
        <ul class="d-flex align-items-start">
          <li>
            <Link to="/why">
              <p>PORQUE A BELLE MAN</p>
            </Link>
          </li>
          <li>
            <Link to="home#how-it-works">
              <p>COMO FUNCIONA</p>
            </Link>
          </li>
          <li>
            <Link to="/partners">
              <p>PARCEIROS</p>
            </Link>
          </li>
          <li>
            <p>NOSSAS LISTAS</p>
          </li>
        </ul>
        <div className="header-btn-container">
          <div>
            {this.state.user ? (
              <Link to={() => this.getPath()}>
                <button
                  class={
                    "header-menu-btn-secondary " +
                    (this.props.purple ? "purple" : "")
                  }
                >
                  DASHBOARD
                </button>
              </Link>
            ) : (
              <Link to="/login">
                <button
                  class={
                    "header-menu-btn-secondary " +
                    (this.props.purple ? "purple" : "")
                  }
                >
                  ENTRAR
                </button>
              </Link>
            )}
          </div>
          <div>
            <a
              class="header-menu-btn-primary"
              href="https://bellemam.com.br/"
              target="_blank"
              rel="noopener noreferrer"
            >
              LOJA BELLE MAN{" "}
              <img src={require("../../assets/images/enter.png")} alt="" />
            </a>
          </div>
        </div>
      </header>
    );
  }
}
