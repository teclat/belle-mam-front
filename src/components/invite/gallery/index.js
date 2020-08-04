import React, { Component } from 'react';
import "./style.scss";
import OwlCarousel from 'react-owl-carousel2';

export default class Gallery extends Component {
    render() {
        return (
            <section id="gallery" class={this.props.color == "green" ? "invite-green" : "invite-purple"}>
                <div class="d-flex justify-content-center align-items-center invite-title-box">
                    <img src={this.props.color == "green" ? require("../../../assets/images/green-heart.png") : require("../../../assets/images/purple-heart.png")} />
                    <h2>Galeria de fotos</h2>
                </div>
                <OwlCarousel options={{ nav: true, center: true, loop: true, navText: ["<", ">"] }} class="owl-carousel owl-carousel-gallery">
                    <div class="box">
                        <img src={require("../../../assets/images/baby-shower.png")} />
                        <div class="label">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus condimentum lacus eget justo
                            eleifend, ac ultrices lectus vehicula.
                </div>
                    </div>
                    <div class="box">
                        <img src={require("../../../assets/images/baby-shower.png")} />
                        <div class="label">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus condimentum lacus eget justo
                            eleifend, ac ultrices lectus vehicula.
                </div>
                    </div>
                    <div class="box">
                        <img src={require("../../../assets/images/baby-shower.png")} />
                        <div class="label">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus condimentum lacus eget justo
                            eleifend, ac ultrices lectus vehicula.
                </div>
                    </div>
                    <div class="box">
                        <img src={require("../../../assets/images/baby-shower.png")} />
                        <div class="label">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus condimentum lacus eget justo
                            eleifend, ac ultrices lectus vehicula.
                </div>
                    </div>
                    <div class="box">
                        <img src={require("../../../assets/images/baby-shower.png")} />
                        <div class="label">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus condimentum lacus eget justo
                            eleifend, ac ultrices lectus vehicula.
                </div>
                    </div>
                    <div class="box">
                        <img src={require("../../../assets/images/baby-shower.png")} />
                        <div class="label">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus condimentum lacus eget justo
                            eleifend, ac ultrices lectus vehicula.
                </div>
                    </div>
                </OwlCarousel>
            </section>
        );
    }
}
