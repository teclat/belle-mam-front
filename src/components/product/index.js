import React, { Component, useState } from "react";
import "./style.scss";
import { Switch, Select, Button } from "antd";
import FirstRender from "../../hooks/FirstRender";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { cartAddRequest } from "../../redux/actions/cartActions";
import { useHistory } from "react-router";

function Product(props) {
  const { Option } = Select;

  const [gifted, setGifted] = useState(false);
  const [selected, setSelected] = useState(props.selected);
  const [qtd, setQtd] = useState(props.qtd ? props.qtd : 0);

  const { isLoading, giftsOnCart, err, step } = useSelector((state) => ({
    isLoading: state.cart.isLoading,
    giftsOnCart: state.cart.giftsOnCart,
    err: state.cart.err,
    step: state.checkout.step,
  }));

  const dispatch = useDispatch();

  const history = useHistory();

  const firstRender = FirstRender();

  React.useEffect(() => {
    if (firstRender) {
      console.log("First Render");
    } else {
      change();
    }
  }, [selected]);

  const change = () => {
    props.change(props.event_product, {
      gifted: gifted,
      selected: selected,
      qtd: qtd,
    });
  };

  const handleQtdChange = (e) => {
    let min = 0;
    let max = props.product.stock_quantity;

    if (e.target.value <= max && e.target.value > min) {
      setQtd(e.target.value);
    } else if (e.target.value > max) {
      setQtd(max);
    } else {
      setQtd(min);
    }

    change();
  };

  const addToCart = () => {
    dispatch(cartAddRequest(props.product, giftsOnCart));
    history.push(`/checkout/${step}`);
  };

  return (
    <li id="product">
      {props.product.images[0] !== undefined ? (
        <img src={props.product.images[0].src} alt="" />
      ) : (
        <img
          src={require("../../assets/images/woocommerce-placeholder.png")}
          alt="IMAGEM"
        />
      )}
      <p className="text">{props.product.name}</p>
      <p className="money">
        R$ {parseFloat(props.product.price).toFixed(2).split(".").join(",")}
      </p>
      {props.gifted === false ? (
        <div className="selectContainer">
          {props.type !== "gift-list" ? (
            <div>
              <div className="selectButtonContainer">
                <p>ESCOLHER</p>
                <Switch checked={selected} onChange={(e) => setSelected(e)} />
              </div>
              <div className="selectButtonContainer">
                <label htmlFor="qtdeInput">QUANTIDADE</label>
                <input
                  id="qtdeInput"
                  type="number"
                  min="0"
                  max={props.product.stock_quantity}
                  value={qtd}
                  onChange={(e) => {
                    handleQtdChange(e);
                  }}
                />
              </div>
            </div>
          ) : (
            <div className="addToCartButtonContainer">
              <button onClick={addToCart}>COMPRAR</button>
            </div>
          )}
        </div>
      ) : null}
    </li>
  );
}

export default Product;

// export default class Product extends Component {
//   state = {
//     gifted: false,
//     selected: this.props.selected,
//     qtd: this.props.qtd ? this.props.qtd : 0,
//   };

//   change = () => {
//     this.props.change(this.props.event_product, this.state);
//   };

//   handleQtdChange = (e) => {
//     let min = 0;
//     let max = this.props.product.stock_quantity;

//     if (e.target.value <= max && e.target.value > min) {
//       this.setState({ qtd: e.target.value });
//     } else if (e.target.value > max) {
//       this.setState({ qtd: max });
//     } else {
//       this.setState({ qtd: min });
//     }

//     this.change();
//   };

//   render() {
//     //console.log(this.props.product);
//     return (
//       // <li id="product" class="d-flex flex-column align-items-center">
//       <li id="product">
//         {this.props.product.images[0] !== undefined ? (
//           <img src={this.props.product.images[0].src} alt="" />
//         ) : (
//           <img
//             src={require("../../assets/images/woocommerce-placeholder.png")}
//             alt="IMAGEM"
//           />
//         )}
//         <p className="text">{this.props.product.name}</p>
//         <p className="money">
//           R${" "}
//           {parseFloat(this.props.product.price).toFixed(2).split(".").join(",")}
//         </p>
//         {this.props.gifted === false ? (
//           <div className="selectContainer">
//             <div className="selectButtonContainer">
//               <p>ESCOLHER</p>
//               <Switch
//                 checked={this.state.selected}
//                 onChange={(e) => {
//                   this.setState({ selected: e }, () => {
//                     this.change();
//                   });
//                 }}
//               />
//             </div>
//             <div className="selectButtonContainer">
//               <label htmlFor="qtdeInput">QUANTIDADE</label>
//               <input
//                 id="qtdeInput"
//                 type="number"
//                 min="0"
//                 max={this.props.product.stock_quantity}
//                 value={this.state.qtd}
//                 onChange={(e) => {
//                   this.handleQtdChange(e);
//                 }}
//               />
//             </div>
//             {/* <Select
//               onChange={(e) => {
//                 this.setState({ qtd: e }, () => {
//                   this.change();
//                 });
//               }}
//               defaultValue={this.state.qtd}
//             >
//               <Option value={1}>1</Option>
//               <Option value={2}>2</Option>
//               <Option value={3}>3</Option>
//               <Option value={4}>4</Option>
//               <Option value={5}>5</Option>
//               <Option value={6}>6</Option>
//               <Option value={7}>7</Option>
//               <Option value={8}>8</Option>
//               <Option value={9}>9</Option>
//             </Select> */}
//           </div>
//         ) : null}
//       </li>
//     );
//   }
// }
