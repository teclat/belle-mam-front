import React, { Component } from 'react';
import "./style.scss";
import OwlCarousel from 'react-owl-carousel2';

export default class Gallery extends Component {
    render() {
        return (
            <section id="gallery" class={this.props.event.theme == "green" ? "invite-green" : "invite-purple"}>
                <div class="d-flex justify-content-center align-items-center invite-title-box">
                    <img src={this.props.event.theme == "green" ? require("../../../assets/images/green-heart.png") : require("../../../assets/images/purple-heart.png")} />
                    <h2>Galeria de fotos</h2>
                </div>
                <OwlCarousel options={{ nav: true, center: true, loop: true, navText: ["<", ">"] }} class="owl-carousel owl-carousel-gallery">
                    {
                        this.props.event && this.props.event.gallery ?
                            this.props.event.gallery.map((gallery) => {
                                return <div class="box">
                                    <img src={gallery.image_url} />
                                    {/* <div class="label">
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus condimentum lacus eget justo
                                        eleifend, ac ultrices lectus vehicula.
                                    </div> */}
                                </div>
                            })
                            : null
                    }
                </OwlCarousel>
            </section>
        );
    }
}
