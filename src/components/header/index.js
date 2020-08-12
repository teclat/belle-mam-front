import React, { Component } from 'react';
import "./styles.scss";
import { Link } from 'react-router-dom';

export default class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: null
        }
    }

    componentDidMount = async () => {
        let user = JSON.parse(await localStorage.getItem("user"));
        if (user) {
            this.setState({ user })
        }
    }

    getPath = () => {
        if (this.state.user.role === "parent") {
            return '/parents/home';
        } else if (this.state.user.role === "admin") {
            return '/admin/products';
        } else if (this.state.user.role === "guest") {
            return '/guest/personal';
        }
    }

    render() {
        return (
            <header id="header" class={"container-fluid d-flex justify-content-between align-items-center " + (this.props.purple ? "purple" : "")} >
                <Link to="/home">
                    <img class="header-logo" src={require("../../assets/images/" + (this.props.purple ? "cha-bebe-logo.png" : "logo-white.png"))} />
                </Link>
                <ul class="d-flex align-items-center">
                    <li>
                        <Link to="/why">
                            <p>PORQUE A BELLE MAN</p>
                        </Link>
                    </li>
                    <li>
                        <Link to="/home#how-it-works">
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
                    <li class="menu-btn">
                        {this.state.user ?
                            <Link to={() => this.getPath()}>
                                <button class={"btn btn-outline " + (this.props.purple ? "purple" : "")}>IR PARA DASHBOARD</button>
                            </Link>
                            :
                            <Link to="/login">
                                <button class={"btn btn-outline " + (this.props.purple ? "purple" : "")}>ENTRAR</button>
                            </Link>
                        }
                    </li>
                    <li class="menu-btn">
                        <button class="btn btn-primary d-flex align-items-center">
                            LOJA BELLE MAN <img src={require("../../assets/images/enter.png")} />
                        </button>
                    </li>
                </ul>
            </ header>
        );
    }
}
