import React, { Component } from 'react';
import "./style.scss";

export default class Testimonial extends Component {
    render() {
        return (
            <section id="testimonial" class="container-fluid d-flex flex-column align-items-center">
                <h2 class="h2">Quem usou, amou! &#60;3</h2>
                <div>
                    <div class="testimonial-box d-flex align-items-center">
                        <div class="testimonial-img mr-5">
                            <img src={require("../../../assets/images/couple-testimonial.jpg")} />
                        </div>
                        <div>
                            <p class="quotation">&ldquo;</p>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                            labore
                        et dolore magna aliqua. Ut enim ad.”</p>
                            <p class="mt-3">- Cláudio e Joana</p>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}
