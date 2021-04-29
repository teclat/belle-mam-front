import React from "react";
import "./styles.scss";
import Header from "../../components/header";
import Footer from "../../components/footer";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { Route, Switch, useHistory } from "react-router";
import { useCallback } from "react";
import Cart from "../../components/cart";
import GiftMessage from "../../components/gift-message";
import Payment from "../../components/payment";
import FinishCheckout from "../../components/finish-checkout";

function Checkout(props) {
  const { isLoading, step, err, events, selectedEventId } = useSelector(
    (state) => ({
      isLoading: state.checkout.isLoading,
      step: state.checkout.step,
      err: state.checkout.err,
      events: state.event.events,
      selectedEventId: state.event.selectedEventId,
    })
  );

  const dispatch = useDispatch();
  const history = useHistory();
  return (
    <div>
      <div className="checkout-header">
        <Header />
      </div>
      {/* <Loading></Loading> */}
      <div className="checkout-main-container">
        <div className="checkout-steps-container">
          <div className={"checkout-step" + (step === 0 ? "-active" : "")}>
            <span>CARRINHO</span>
          </div>
          <div className={"checkout-step" + (step === 1 ? "-active" : "")}>
            <span>INFORMAÇÕES</span>
          </div>
          <div className={"checkout-step" + (step === 2 ? "-active" : "")}>
            <span>PAGAMENTO</span>
          </div>
          <div className={"checkout-step" + (step === 3 ? "-active" : "")}>
            <span>CONFIRMAÇÃO</span>
          </div>
        </div>
        <Switch>
          <Route path={`/checkout/0`} component={Cart} />
          <Route path={`/checkout/1`} component={GiftMessage} />
          <Route path={`/checkout/2`} component={Payment} />
          <Route path={`/checkout/3`} component={FinishCheckout} />
        </Switch>
        <div className="checkout-button"></div>
      </div>
      <div className="checkout-footer">
        <Footer />
      </div>
    </div>
  );
}

export default Checkout;
