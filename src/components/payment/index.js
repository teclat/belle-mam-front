import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import {
  nextStepAction,
  previousStepAction,
} from "../../redux/actions/checkoutActions";
import "./styles.scss";

function Payment(props) {
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
    <div className="payment-main-container">
      <div>
        <h2>Escolha sua forma de pagamento</h2>
      </div>
      <div className="payment-buttons">
        <button onClick={goBack}>Retornar à informações</button>
        <Link to="/checkout/3" onClick={proceed}>
          Prosseguir
        </Link>
      </div>
    </div>
  );
}

export default Payment;
