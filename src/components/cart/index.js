import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import {
  cartItemChangeQtd,
  cartRemoveRequest,
} from "../../redux/actions/cartActions";
import {
  jumpToStepAction,
  nextStepAction,
} from "../../redux/actions/checkoutActions";
import "./styles.scss";
function Cart(props) {
  const { isLoading, err, giftsOnCart, step } = useSelector((state) => ({
    isLoading: state.cart.isLoading,
    err: state.cart.err,
    giftsOnCart: state.cart.giftsOnCart,
    step: state.checkout.step,
  }));

  const [total, setTotal] = useState(0);

  const dispatch = useDispatch();

  const history = useHistory();

  const proceed = () => {
    dispatch(nextStepAction(step));
  };

  React.useEffect(() => {
    dispatch(jumpToStepAction(0));
  }, []);

  const calcTotal = () => {
    giftsOnCart.forEach((giftOnCart) => {
      setTotal(giftOnCart.price * giftOnCart.count);
    });
  };

  const handleQtdChange = (e, gift) => {
    const qtd = e.target.value;
    console.log(qtd, gift);
    dispatch(cartItemChangeQtd(gift, giftsOnCart, qtd));
  };

  const removeItemFromCart = (gift) => {
    dispatch(cartRemoveRequest(gift, giftsOnCart));
  };

  React.useEffect(() => {
    calcTotal();
  }, [giftsOnCart]);

  React.useEffect(() => {
    if (err !== "") {
      alert(err);
    }
  }, [err]);

  return (
    <div>
      <div className="cart-title">
        <h3>TIPO DO EVENTO</h3>
        <h3>00/00/0000</h3>
      </div>
      <div className="cart-header">
        <p>Descrição do produto</p>
        <p>Quantidade</p>
        <p>Valor Total</p>
      </div>
      <ul className="cart-product-container">
        {giftsOnCart.length === 0
          ? null
          : giftsOnCart.map((gift) => {
              return (
                <li>
                  <div className="product-first-section">
                    <img src={gift.images[0].src} />
                    <p>{gift.name}</p>
                  </div>
                  <div className="product-second-section">
                    <input
                      type="text"
                      id="qtd-input"
                      value={gift.count}
                      onChange={(e) => handleQtdChange(e, gift)}
                      max={parseFloat(gift.selected_quantity)}
                    />
                    <label htmlFor="qtd-input"></label>
                    <div>
                      {/* <a>ADICIONAR</a> */}
                      <button onClick={() => removeItemFromCart(gift)}>
                        REMOVER
                      </button>
                    </div>
                  </div>
                  <div className="product-third-section">
                    <p>
                      R${" "}
                      {parseFloat(gift.price * gift.count)
                        .toFixed(2)
                        .split(".")
                        .join(",")}
                    </p>
                  </div>
                </li>
              );
            })}
      </ul>
      <div className="cart-total">
        <div>
          <p>TOTAL</p>
        </div>
        <p>R$ {parseFloat(total).toFixed(2).split(".").join(",")}</p>
      </div>
      <div className="cart-buttons">
        <button onClick={() => history.push(`/guest/events`)}>
          Voltar à lista
        </button>
        <Link to="/checkout/1" onClick={() => proceed()}>
          Prosseguir
        </Link>
      </div>
    </div>
  );
}

export default Cart;
