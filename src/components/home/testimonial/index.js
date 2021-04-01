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
      <h2 class="h2">Quem usou, amou! &#60;3</h2>
      <div>
        <div class="testimonial-box d-flex align-items-center">
          <div class="testimonial-img mr-5">
            {/* <img src={this.state.testimonial.image_url} /> */}
            <img src={testimonial.image_url} alt="" />
          </div>
          <div>
            <p class="quotation">&ldquo;</p>
            {/* <p>{this.state.testimonial.text}”</p> */}
            <p>{testimonial.text}”</p>
            {/* <p class="mt-3">- {this.state.testimonial.obs}</p> */}
            <p class="mt-3">- {testimonial.obs}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Testimonial;

// export default class Testimonial extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       testimonial: {},
//     };
//     this.get();
//   }

//   get = async (e) => {
//     axios
//       .get(Constants.ApiUrl + "custom/testimonial")
//       .then((response) => {
//         console.log(response.data);
//         this.setState({ testimonial: response.data });
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   };

//   render() {
//     return (
//       <section
//         id="testimonial"
//         class="container-fluid d-flex flex-column align-items-center"
//       >
//         <h2 class="h2">Quem usou, amou! &#60;3</h2>
//         <div>
//           <div class="testimonial-box d-flex align-items-center">
//             <div class="testimonial-img mr-5">
//               <img src={this.state.testimonial.image_url} />
//             </div>
//             <div>
//               <p class="quotation">&ldquo;</p>
//               <p>{this.state.testimonial.text}”</p>
//               <p class="mt-3">- {this.state.testimonial.obs}</p>
//             </div>
//           </div>
//         </div>
//       </section>
//     );
//   }
// }
