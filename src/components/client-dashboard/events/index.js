import React, { Component, useState } from "react";
import "./style.scss";
import { Button, Card, Modal } from "antd";
import { Constants } from "../../../constants";
import axios from "axios";
import { Link, Route, Switch } from "react-router-dom";
import PersonalClient from "../personal";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import {
  getSubscribedEventsRequest,
  selectSubscribedEventAction,
} from "../../../redux/actions/eventsActions";

function EventsGuest(props) {
  const { isLoading, events, err } = useSelector((state) => ({
    isLoading: state.event.isLoading,
    events: state.event.events,
    err: state.event.err,
  }));

  const [currentEvent, setCurrentEvents] = useState([]);

  const dispatch = useDispatch();

  React.useEffect(() => {
    getEvents();
  }, []);

  const getEvents = async () => {
    let user = await JSON.parse(localStorage.getItem("user"));
    dispatch(getSubscribedEventsRequest(user));
  };

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

  const selectEvent = (event) => {
    dispatch(selectSubscribedEventAction(event.event_id));
  };

  return (
    <div id="events-guest">
      <div className="d-flex flex-column justify-content-center align-items-center title-box">
        <h4>Eventos</h4>
      </div>
      <div>
        {/* {isLoading !== false ? <LoadingComponent></LoadingComponent> : null} */}
        {currentEvent.length === 0 ? (
          <h3>Não participa de eventos ainda.</h3>
        ) : (
          events.map((event) => {
            return (
              <div key={event.id} className={"mb-3"}>
                <Card>
                  <div className={"d-flex"}>
                    {event.event.baby_image_url !== "" ? (
                      <img src={event.event.baby_image_url} alt="" />
                    ) : (
                      <img
                        src={require("../../../assets/images/woocommerce-placeholder.png")}
                      />
                    )}
                    <div>
                      <Link
                        className="event-button"
                        onClick={() => selectEvent(event)}
                        to={`/guest/event/${event.event.url}`}
                      >
                        {event.event.baby_name || event.event.url}
                      </Link>
                      <p>{event.event.history_text}</p>
                      <p>{event.event.address}</p>
                      <p>{event.event.date}</p>
                      <p>{event.event.hour}</p>
                    </div>
                  </div>
                </Card>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default EventsGuest;
