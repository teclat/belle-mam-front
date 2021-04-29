import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import {
  nextStepAction,
  previousStepAction,
} from "../../redux/actions/checkoutActions";
import "./styles.scss";

function GiftMessage(props) {
  const [message, setMessage] = useState("");
  const [charCount, setCharCount] = useState(500);

  const { isLoading, err, step } = useSelector((state) => ({
    isLoading: state.checkout.isLoading,
    err: state.checkout.err,
    step: state.checkout.step,
  }));

  const dispatch = useDispatch();
  const history = useHistory();

  const handleMessage = (e) => {
    setMessage(e.target.value);
  };

  React.useEffect(() => {
    setCharCount(500 - message.length);
  }, [message]);

  const proceed = () => {
    dispatch(nextStepAction(step));
  };

  const goBack = () => {
    dispatch(previousStepAction(step));
    history.goBack();
  };

  return (
    <div>
      <div className="gift-message-main-container">
        <h2>Deixe sua mensagem!</h2>
        <form className="gift-message-main-form">
          <textarea
            maxLength="500"
            value={message}
            onChange={handleMessage}
          ></textarea>
          <div className="gift-message-char-count">
            <span>Restam {charCount} caracteres.</span>
          </div>
        </form>
      </div>
      <div className="gift-message-buttons">
        <button onClick={goBack}>Voltar ao carrinho</button>
        <Link to="/checkout/2" onClick={() => proceed()}>
          Prosseguir
        </Link>
      </div>
    </div>
  );
}

export default GiftMessage;
