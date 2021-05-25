import React, { Component } from "react";
import "./style.scss";
import Product from "../../product";
import { Constants } from "../../../constants";
import axios from "axios";
import { useState } from "react";
import Loading from "../../loading";

function GiftedsParent(props) {
  const [gifts, setGifts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  React.useEffect(() => {
    getGifts();
  }, []);

  const getGifts = async () => {
    let user = await JSON.parse(localStorage.getItem("user"));
    setIsLoading(true);
    axios
      .get(Constants.ApiUrl + "events/" + props.event.id + "/gifteds", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        setGifts(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    setIsLoading(false);
  };

  return (
    <div id="gifts-parent">
      <div className="d-flex flex-column justify-content-center align-items-center title-box">
        <h4>Presentes Recebidos</h4>
      </div>
      {isLoading === true ? (
        <Loading isLoading={isLoading} />
      ) : (
        <div className="gifts justify-content-center">
          <ul class="d-flex flex-row justify-content-around">
            {gifts.map((gift) => {
              return <Product gifted={true} product={gift.product} />;
            })}
          </ul>
        </div>
      )}
    </div>
  );
}

export default GiftedsParent;
