import React, { Component, useState } from "react";
import "./style.scss";
import Product from "../../product";
import { Constants } from "../../../constants";
import axios from "axios";

function Products(props) {
  const [products, setProducts] = useState([]);

  React.useEffect(() => {
    get();
  }, []);

  const get = async () => {
    let user = await JSON.parse(localStorage.getItem("user"));

    axios
      .get(Constants.ApiUrl + "products", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((response) => {
        // this.setState({
        //     products: response.data
        // })
        setProducts(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div id="products">
      <div className="d-flex flex-column justify-content-center align-items-center title-box">
        <h4>Produtos</h4>
      </div>
      <div className="gifts justify-content-center">
        <ul class="d-flex flex-row justify-content-around flex-wrap">
          {products.map((product) => {
            return <Product product={product} />;
          })}
        </ul>
      </div>
    </div>
  );
}

export default Products;

// export default class Products extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       products: [],
//     };
//     this.get();
//   }

//   get = async () => {
//     let user = JSON.parse(await localStorage.getItem("user"));

//     axios
//       .get(Constants.ApiUrl + "products", {
//         headers: {
//           Authorization: `Bearer ${user.token}`,
//         },
//       })
//       .then((response) => {
//         this.setState({
//           products: response.data,
//         });
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   };

//   render() {
//     return (
//       <div id="products">
//         <div className="d-flex flex-column justify-content-center align-items-center title-box">
//           <h4>Produtos</h4>
//         </div>
//         <div className="gifts justify-content-center">
//           <ul class="d-flex flex-row justify-content-around flex-wrap">
//             {this.state.products.map((product) => {
//               return <Product product={product} />;
//             })}
//           </ul>
//         </div>
//       </div>
//     );
//   }
// }
