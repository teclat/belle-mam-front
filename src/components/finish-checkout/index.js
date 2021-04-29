import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import {
  nextStepAction,
  previousStepAction,
} from "../../redux/actions/checkoutActions";
import "./styles.scss";

function FinishCheckout(props) {
  const { isLoading, err, step } = useSelector((state) => ({
    isLoading: state.checkout.isLoading,
    err: state.checkout.err,
    step: state.checkout.step,
  }));

  const history = useHistory();

  const dispatch = useDispatch();

  const goBack = () => {
    dispatch(previousStepAction(step));
    history.goBack();
  };

  const proceed = () => {
    dispatch(nextStepAction(step));
  };

  return (
    <div className="finish-checkout-main-container">
      <div>
        <h2>Confirme os dados da compra</h2>
      </div>
      <div className="finish-checkout-buttons">
        <button onClick={goBack}>Retornar à pagamentos</button>
        <Link to="/checkout/3" onClick={proceed}>
          Finalizar compra
        </Link>
      </div>
    </div>
  );
}

export default FinishCheckout;
