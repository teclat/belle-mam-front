import React, { Component } from 'react'
import "./style.scss";
import OwlCarousel from 'react-owl-carousel2';

export default class Notes extends Component {
    render() {
        return (
            <section id="messages" class={this.props.color == "green" ? "invite-green" : "invite-purple"}>
                <div class="d-flex justify-content-center align-items-center invite-title-box">
                    <h2>Recadinhos</h2>
                    <img src={require("../../../assets/images/white-heart.png")} />
                </div>
                <OwlCarousel options={{ nav: true, center: true }} class="owl-carousel owl-carousel-testimonial">
                    <div class="message-box d-flex flex-row">
                        <img class="testiminial-img" src={require("../../../assets/images/testimonial-img.png")} />
                        <div class="d-flex flex-column">
                            <h5>Tia Cláudia</h5>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. </p>
                            <button class={"btn d-flex align-items-center justify-content-around " + (this.props.color == "green" ? 'btn-secondary' : 'btn-primary')}>
                                <img src={require("../../../assets/images/heart.png")} /> CURTIR!
                    </button>
                        </div>
                    </div>
                    <div class="message-box d-flex flex-row">
                        <img class="testiminial-img" src={require("../../../assets/images/testimonial-img.png")} />
                        <div class="d-flex flex-column">
                            <h5>Tia Cláudia</h5>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. </p>
                            <button class={"btn d-flex align-items-center justify-content-around " + (this.props.color == "green" ? 'btn-secondary' : 'btn-primary')}>
                                <img src={require("../../../assets/images/heart.png")} /> CURTIR!
                    </button>
                        </div>
                    </div>
                    <div class="message-box d-flex flex-row">
                        <img class="testiminial-img" src={require("../../../assets/images/testimonial-img.png")} />
                        <div class="d-flex flex-column">
                            <h5>Tia Cláudia</h5>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. </p>
                            <button class={"btn d-flex align-items-center justify-content-around " + (this.props.color == "green" ? 'btn-secondary' : 'btn-primary')}>
                                <img src={require("../../../assets/images/heart.png")} /> CURTIR!
                    </button>
                        </div>
                    </div>
                    <div class="message-box d-flex flex-row">
                        <img class="testiminial-img" src={require("../../../assets/images/testimonial-img.png")} />
                        <div class="d-flex flex-column">
                            <h5>Tia Cláudia</h5>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. </p>
                            <button class={"btn d-flex align-items-center justify-content-around " + (this.props.color == "green" ? 'btn-secondary' : 'btn-primary')}>
                                <img src={require("../../../assets/images/heart.png")} /> CURTIR!
                    </button>
                        </div>
                    </div>
                    <div class="message-box d-flex flex-row">
                        <img class="testiminial-img" src={require("../../../assets/images/testimonial-img.png")} />
                        <div class="d-flex flex-column">
                            <h5>Tia Cláudia</h5>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. </p>
                            <button class={"btn d-flex align-items-center justify-content-around " + (this.props.color == "green" ? 'btn-secondary' : 'btn-primary')}>
                                <img src={require("../../../assets/images/heart.png")} /> CURTIR!
                    </button>
                        </div>
                    </div>
                    <div class="message-box d-flex flex-row">
                        <img class="testiminial-img" src={require("../../../assets/images/testimonial-img.png")} />
                        <div class="d-flex flex-column">
                            <h5>Tia Cláudia</h5>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. </p>
                            <button class={"btn d-flex align-items-center justify-content-around " + (this.props.color == "green" ? 'btn-secondary' : 'btn-primary')}>
                                <img src={require("../../../assets/images/heart.png")} /> CURTIR!
                    </button>
                        </div>
                    </div>
                    <div class="message-box d-flex flex-row">
                        <img class="testiminial-img" src={require("../../../assets/images/testimonial-img.png")} />
                        <div class="d-flex flex-column">
                            <h5>Tia Cláudia</h5>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. </p>
                            <button class={"btn d-flex align-items-center justify-content-around " + (this.props.color == "green" ? 'btn-secondary' : 'btn-primary')}>
                                <img src={require("../../../assets/images/heart.png")} /> CURTIR!
                    </button>
                        </div>
                    </div>
                </OwlCarousel>
            </section>
        )
    }
}
