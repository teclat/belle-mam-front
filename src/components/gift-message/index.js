import Axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { Constants } from "../../constants";
import {
  jumpToStepAction,
  nextStepAction,
  previousStepAction,
} from "../../redux/actions/checkoutActions";
import { saveNoteAction } from "../../redux/actions/giftNoteActions";

import "./styles.scss";

function GiftMessage(props) {
  const [message, setMessage] = useState("");
  const [charCount, setCharCount] = useState(500);

  const {
    isLoading,
    err,
    step,
    noteIsLoading,
    noteErr,
    noteSent,
    selectedEventId,
  } = useSelector((state) => ({
    isLoading: state.checkout.isLoading,
    err: state.checkout.err,
    step: state.checkout.step,
    noteIsLoading: state.giftNote.isLoading,
    noteErr: state.giftNote.err,
    noteSent: state.giftNote.note,
    selectedEventId: state.event.selectedEventId,
  }));

  const dispatch = useDispatch();
  const history = useHistory();

  React.useEffect(() => {
    dispatch(jumpToStepAction(1));
  }, []);

  React.useEffect(() => {
    setCharCount(500 - message.length);
  }, [message]);

  const handleMessage = (e) => {
    setMessage(e.target.value);
  };

  const proceed = async () => {
    let user = await JSON.parse(localStorage.getItem("user"));
    dispatch(saveNoteAction(user, selectedEventId, message));
    dispatch(nextStepAction(step));
  };

  const goBack = () => {
    dispatch(jumpToStepAction(step - 1));
    history.push(`/checkout/${step - 1}`);
  };

  return (
    <div>
      <div className="gift-message-main-container">
        <h2>Deixe sua mensagem</h2>
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
