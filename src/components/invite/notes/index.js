import React, { Component } from "react";
import "./style.scss";
import OwlCarousel from "react-owl-carousel2";

export default class Notes extends Component {
  render() {
    return (
      <section
        id="messages"
        class={
          this.props.event.theme === "green" ? "invite-green" : "invite-purple"
        }
      >
        <div class="d-flex justify-content-center align-items-center invite-title-box">
          <h2>Recadinhos</h2>
          <img src={require("../../../assets/images/white-heart.png")} alt="" />
        </div>
        <OwlCarousel
          options={{ nav: true, center: true }}
          class="owl-carousel owl-carousel-testimonial"
        >
          {this.props.event && this.props.event.notes
            ? this.props.event.notes.map((note) => {
                return (
                  <div key={note.id} class="message-box d-flex flex-row">
                    <img
                      class="testiminial-img"
                      src={note.user.image_url}
                      alt=""
                    />
                    <div class="d-flex flex-column">
                      <h5>{note.user.name}</h5>
                      <p>{note.text}</p>
                      {/* <button class={"btn d-flex align-items-center justify-content-around " + (this.props.color == "green" ? 'btn-secondary' : 'btn-primary')}>
                                            <img src={require("../../../assets/images/heart.png")} /> CURTIR!
                                        </button> */}
                    </div>
                  </div>
                );
              })
            : null}
        </OwlCarousel>
      </section>
    );
  }
}
