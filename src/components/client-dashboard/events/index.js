import React, { Component, useState } from "react";
import "./style.scss";
import { Button, Card, Modal } from "antd";
import { Constants } from "../../../constants";
import axios from "axios";
import { Link, Route, Switch, useHistory } from "react-router-dom";
import PersonalClient from "../personal";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import {
  getSubscribedEventsRequest,
  selectSubscribedEventAction,
} from "../../../redux/actions/eventsActions";
import Loading from "../../loading";
//import CartFloatingButton from "../../cart-floating-button";

function EventsGuest(props) {
  const { isLoading, events, err, giftsOnCart } = useSelector((state) => ({
    isLoading: state.event.isLoading,
    events: state.event.events,
    err: state.event.err,
    giftsOnCart: state.cart.giftsOnCart,
  }));

  const [currentEvent, setCurrentEvents] = useState([]);
  const [date, setDate] = useState(new Date());
  const [giftQuantity, setGiftQuantity] = useState(0);

  const dispatch = useDispatch();
  const history = useHistory();

  React.useEffect(() => {
    getEvents();
  }, []);

  React.useEffect(() => {
    if (events[0] === undefined || events[0] === null) {
      return;
    }
    if (events[0].event === undefined || events[0].event === null) {
      return;
    }
    const newDate = new Date(events[0].event.date);
    setDate(newDate);
  }, [events]);

  React.useEffect(() => {
    if (giftsOnCart === undefined || giftsOnCart === null) {
      return;
    }
    setGiftQuantity(giftsOnCart.length);
  }, [giftsOnCart]);

  React.useEffect(() => {
    if (err.length !== 0) {
      Modal.error({
        content: `Erro ao buscar eventos: ${err}`,
      });
    }
  }, [err]);

  React.useEffect(() => {
    setCurrentEvents(events);
  }, [events]);

  const getEvents = async () => {
    let user = await JSON.parse(localStorage.getItem("user"));
    dispatch(getSubscribedEventsRequest(user));
  };

  const selectEvent = (event) => {
    dispatch(selectSubscribedEventAction(event.event_id));
  };

  return (
    <div id="events-guest">
      {/* {giftQuantity > 0 ? (
        <CartFloatingButton link={"/checkout/0"} quantity={giftQuantity} />
      ) : null} */}
      <div className="d-flex flex-column justify-content-center align-items-center title-box">
        <h4>Eventos</h4>
      </div>
      {isLoading === true ? (
        <Loading isLoading={isLoading} />
      ) : (
        <div>
          {currentEvent.length === 0 ? (
            <h3>Não participa de eventos ainda.</h3>
          ) : (
            events.map((event) => {
              return (
                <div key={event.id} className={"mb-3"}>
                  <Card>
                    {event.event !== undefined && event.event !== null ? (
                      <div className={"d-flex"}>
                        {event.event.baby_image_url !== "" ? (
                          <img src={event.event.baby_image_url} alt="" />
                        ) : (
                          <img
                            src={require("../../../assets/images/woocommerce-placeholder.png")}
                          />
                        )}
                        <div className="events-content">
                          <Link
                            className="event-button"
                            onClick={() => selectEvent(event)}
                            to={`/guest/event/${event.event.url}`}
                          >
                            {event.event.baby_name || event.event.url}
                          </Link>
                          <p>{event.event.history_text}</p>
                          <p>Endereço: {event.event.address}</p>
                          <p>Data: {date.toLocaleDateString("pt-BR")}</p>
                          <p>Horário: {event.event.hour}</p>
                        </div>
                      </div>
                    ) : null}
                  </Card>
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
}

export default EventsGuest;
