import React, { Component } from "react";
import "./style.scss";
import Footer from "../../components/footer";
import Header from "../../components/header";
import InviteBox from "../../components/invite/invite-box";
import GiftList from "../../components/invite/gift-list";
import Gallery from "../../components/invite/gallery";
import Notes from "../../components/invite/notes";
import { Constants } from "../../constants";
import axios from "axios";
import { useState } from "react";

function Invite(props) {
  const [color, setColor] = useState("green");
  const [event, setEvent] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  React.useEffect(() => {
    getEvent();
  }, []);

  const getEvent = async () => {
    setIsLoading(true);
    axios
      .get(Constants.ApiUrl + "events/event/" + props.match.params.url)
      .then((response) => {
        console.log(response.data);
        setEvent(response.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err.message);
        setIsLoading(false);
      });
  };

  return (
    <div>
      <Header />
      <InviteBox event={event} />
      {event && event.products && event.products.length > 0 ? (
        <GiftList event={event} />
      ) : null}
      {event && event.gallery && event.gallery.length > 0 ? (
        <Gallery event={event} />
      ) : null}
      {event && event.notes && event.notes.length > 0 ? (
        <Notes event={event} />
      ) : null}
      <Footer />
    </div>
  );
}

export default Invite;
