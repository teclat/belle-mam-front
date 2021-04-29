import React, { Component, useState } from "react";
import "./style.scss";
import { Constants } from "../../../constants";
import axios from "axios";

function Testimonial(props) {
  const [testimonial, setTestimonial] = useState({});

  React.useEffect(() => {
    get();
  }, []);

  const get = async (e) => {
    axios
      .get(Constants.ApiUrl + "custom/testimonial")
      .then((response) => {
        console.log(response.data);
        //this.setState({ testimonial: response.data });
        setTestimonial(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <section
      id="testimonial"
      class="container-fluid d-flex flex-column align-items-center"
    >
      <div className="testimonial-header">
        <h2 class="h2">Quem usou, amou! &#60;3</h2>
      </div>
      <div>
        <div class="testimonial-box d-flex align-items-center">
          <div class="testimonial-img mr-5">
            <img src={testimonial.image_url} alt="" />
          </div>
          <div>
            <p class="quotation">&ldquo;</p>
            <p className="testimonial-content"> {testimonial.text}”</p>
            <p class="mt-3">- {testimonial.obs}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Testimonial;
