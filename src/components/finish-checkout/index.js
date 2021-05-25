import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import {
  jumpToStepAction,
  nextStepAction,
  previousStepAction,
} from "../../redux/actions/checkoutActions";
import { postNoteAction } from "../../redux/actions/giftNoteActions";
import { postOrderAction } from "../../redux/actions/orderActions";
import api from "../../services/api";
import "./styles.scss";
import FirstRender from "../../hooks/FirstRender";
import Modal from "antd/lib/modal/Modal";
function FinishCheckout(props) {
  const {
    isLoading,
    err,
    step,
    giftsOnCart,
    orderData,
    giftNote,
    selectedEventId,
    message,
  } = useSelector((state) => ({
    isLoading: state.checkout.isLoading,
    err: state.checkout.err,
    step: state.checkout.step,
    giftsOnCart: state.cart.giftsOnCart,
    orderData: state.order.data,
    giftNote: state.giftNote.note,
    selectedEventId: state.event.selectedEventId,
    message: state.giftNote.note.text,
  }));

  const firstRender = FirstRender;

  const [total, setTotal] = useState(0);
  const [cardNumber, setCardNumber] = useState("XXXX.XXXX.XXXX.XXXX");
  const [note, setNote] = useState("");
  const [productListId, setProductListId] = useState(-1);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(jumpToStepAction(3));
    firstRender.current = false;
  }, []);

  const goBack = () => {
    dispatch(jumpToStepAction(step - 1));
    history.push(`/checkout/${step - 1}`);
  };

  const finish = async () => {
    let user = await JSON.parse(localStorage.getItem("user"));
    dispatch(postNoteAction(user, selectedEventId, message));
    dispatch(postOrderAction(orderData));
    await giveGift();
    history.push(`/guest/personal`);
  };

  const giveGift = async () => {
    let user = await JSON.parse(localStorage.getItem("user"));
    const body = {
      user_id: user.id,
      product_list_id: productListId,
      products: giftsOnCart,
    };
    console.log(body);
    try {
      const response = await api.post("events/give-gift", body);
      console.log(response.data);
    } catch (err) {
      console.error(err.message);
    }
  };

  const calcTotal = () => {
    giftsOnCart.forEach((giftOnCart) => {
      setTotal(giftOnCart.price * giftOnCart.count);
    });
  };

  const handleModal = () => {
    setModalIsOpen(false);
    history.push("/");
  };

  React.useEffect(() => {
    calcTotal();
  }, [giftsOnCart]);

  React.useEffect(() => {
    if (firstRender.current === true) return;
    if (orderData.card_number === null || orderData.card_number === undefined) {
      setModalIsOpen(true);
      //history.push("/");
      return;
    }
    setCardNumber(orderData.card_number);
  }, [orderData]);

  React.useEffect(() => {
    if (giftNote.text === null || giftNote.text === undefined) return;
    setNote(giftNote.text);
  }, [giftNote]);

  React.useEffect(() => {
    if (giftsOnCart[0] === undefined || giftsOnCart[0] === null) return;
    setProductListId(giftsOnCart[0].product_list_id);
  }, [giftsOnCart]);

  return (
    <>
      <Modal
        title="Erro!"
        visible={modalIsOpen}
        onOk={handleModal}
        cancelButtonProps={{ style: { display: "none" } }}
      >
        Não foi possível finalizar a compra.
      </Modal>
      <div className="finish-checkout-main-container">
        <div>
          <h2>Confirme os dados da compra</h2>
        </div>
        <div className="finish-checkout-content">
          <p>
            {`Total: `}
            <span>{`R$ ${parseFloat(total)
              .toFixed(2)
              .split(".")
              .join(",")}`}</span>
          </p>

          <p>
            {`Cartão: `}
            <span>{`${cardNumber}`}</span>
          </p>
          {note !== "" ? (
            <p>
              {`Recado: `}
              <span>{`${note}`}</span>
            </p>
          ) : null}
        </div>
        <div className="finish-checkout-buttons">
          <button onClick={goBack}>Retornar à pagamentos</button>
          <button onClick={finish}>Finalizar compra</button>
        </div>
      </div>
    </>
  );
}

export default FinishCheckout;
