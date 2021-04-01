import React, { Component, useState } from "react";
import "./style.scss";
import Product from "../../product";
import { Constants } from "../../../constants";
import axios from "axios";
import { Modal } from "antd";

function GiftListParent(props) {
  const [products, setProducts] = useState([]);

  React.useEffect(() => {
    get();
    console.log("products", products);
  }, []);

  const get = async () => {
    let user = JSON.parse(await localStorage.getItem("user"));
    if (props.event.id === undefined) {
      console.log("Event not set.");
    } else {
      axios
        .get(Constants.ApiUrl + "events/gifts/" + props.event.id, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        })
        .then((response) => {
          let products = response.data.map((r) => {
            r.selected = true;
            return r;
          });
          setProducts(products);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const save = async () => {
    let events_products = products.map((product) => {
      return {
        id: product.id,
        selected: product.selected,
        quantity: product.quantity,
      };
    });
    let user = JSON.parse(await localStorage.getItem("user"));

    axios
      .patch(
        Constants.ApiUrl + "events/event-products",
        {
          events_products: events_products,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      )
      .then((response) => {
        Modal.success({ content: "Salvo com sucesso!" });
        get();
      })
      .catch((error) => {
        Modal.error({ content: "Erro ao salvar!" });
        console.log(error);
      });
  };

  const change = (id, values) => {
    let newProducts = products;
    let product = newProducts.filter((p) => p.id == id)[0];
    product.selected = values.selected;
    product.quantity = values.qtd;
    console.log(values);
    console.log("pppp", newProducts);
    setProducts(newProducts);
  };

  return (
    <div id="gifts-parent">
      <div className="d-flex flex-column justify-content-center align-items-center title-box">
        <h4>Lista de Presentes</h4>
      </div>
      <div className="gifts justify-content-center">
        <ul className="d-flex flex-row justify-content-around">
          {products.map((p) => {
            return (
              <Product
                product={p.product}
                change={change()}
                selected={p.selected}
                qtd={p.quantity}
                event_product={p.id}
                gifted={false}
              />
            );
          })}
        </ul>
      </div>
      <div className="d-flex btns justify-content-center">
        <div onClick={() => save()} className="btn btn-secondary">
          SALVAR
        </div>
      </div>
    </div>
  );
}

export default GiftListParent;

// export default class GiftListParent extends Component {
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
//       .get(Constants.ApiUrl + "events/gifts/" + this.props.event.id, {
//         headers: {
//           Authorization: `Bearer ${user.token}`,
//         },
//       })
//       .then((response) => {
//         let products = response.data.map((r) => {
//           r.selected = true;
//           return r;
//         });
//         this.setState({
//           products: products,
//         });
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   };

//   save = async () => {
//     let events_products = this.state.products.map((product) => {
//       return {
//         id: product.id,
//         selected: product.selected,
//         quantity: product.quantity,
//       };
//     });
//     let user = JSON.parse(await localStorage.getItem("user"));

//     axios
//       .patch(
//         Constants.ApiUrl + "events/event-products",
//         {
//           events_products: events_products,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${user.token}`,
//           },
//         }
//       )
//       .then((response) => {
//         Modal.success({ content: "Salvo com sucesso!" });
//         this.get();
//       })
//       .catch((error) => {
//         Modal.error({ content: "Erro ao salvar!" });
//         console.log(error);
//       });
//   };

//   change = (id, values) => {
//     let products = this.state.products;
//     let product = products.filter((p) => p.id == id)[0];
//     product.selected = values.selected;
//     product.quantity = values.qtd;
//     console.log(values);
//     console.log("pppp", products);
//     this.setState({ products: products });
//   };

//   render() {
//     console.log("products", this.state.products);
//     return (
//       <div id="gifts-parent">
//         <div className="d-flex flex-column justify-content-center align-items-center title-box">
//           <h4>Lista de Presentes</h4>
//         </div>
//         <div className="gifts justify-content-center">
//           <ul class="d-flex flex-row justify-content-around">
//             {this.state.products.map((p) => {
//               return (
//                 <Product
//                   product={p.product}
//                   change={this.change}
//                   selected={p.selected}
//                   qtd={p.quantity}
//                   event_product={p.id}
//                   gifted={false}
//                 />
//               );
//             })}
//           </ul>
//         </div>
//         <div className="d-flex btns justify-content-center">
//           <div onClick={() => this.save()} className="btn btn-secondary">
//             SALVAR
//           </div>
//         </div>
//       </div>
//     );
//   }
// }
