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
      // console.log("First Render");
      return;
    } else {
      change();
    }
  }, [selected]);

  React.useEffect(() => {
    if (firstRender) {
      // console.log("First Render");
      return;
    } else {
      change();
    }
  }, [qtd]);

  const change = () => {
    props.change(props.giftId, {
      gifted: gifted,
      selected: selected,
      qtd: qtd,
    });
  };

  const handleQtdChange = (e) => {
    // let min = 0;
    // let max = props.product.stock_quantity;

    // if (e.target.value <= max && e.target.value > min) {
    //   setQtd(e.target.value);
    // } else if (e.target.value > max) {
    //   setQtd(max);
    // } else {
    //   setQtd(min);
    // }

    setQtd(e.target.value);

    // change();
  };

  const addToCart = () => {
    dispatch(cartAddRequest(props.product, giftsOnCart));
    history.push(`/checkout/${step}`);
  };

  return (
    <li id="product">
      {props.product.images[0] !== undefined ? (
        <img src={props.product.images[0]} alt="" />
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
                  //max={props.product.stock_quantity}
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
