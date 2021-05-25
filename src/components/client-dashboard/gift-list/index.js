import React from "react";
import "./style.scss";
import { Card } from "antd";
import { Link } from "react-router-dom";

import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import {
  getEventsRequest,
  selectEventAction,
} from "../../../redux/actions/eventsActions";
import Product from "../../product";

import json from "../../../testProducts.json";
import { useState } from "react";
import axios from "axios";
import { Constants } from "../../../constants";
import Loading from "../../loading";

function GuestGiftList(props) {
  const { isLoading, events, err, selectedEventId } = useSelector((state) => ({
    isLoading: state.event.isLoading,
    events: state.event.events,
    err: state.event.err,
    selectedEventId: state.event.selectedEventId,
  }));
  const dispatch = useDispatch();

  const [products, setProducts] = useState([]);

  React.useEffect(() => {
    getGiftList();
  }, []);

  // const getGiftList = () => {
  //   setProducts(json);
  // };
  const getGiftList = async () => {
    let user = await JSON.parse(localStorage.getItem("user"));
    if (selectedEventId === undefined || selectedEventId === null) {
      console.log("Event not set.");
    } else {
      axios
        .get(Constants.ApiUrl + "events/gifts/" + selectedEventId, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        })
        .then((response) => {
          console.log("test response", response.data);
          if (
            response.data[0].products === undefined ||
            response.data[0].products === null
          ) {
            return;
          }
          let products = response.data[0].products.map((r) => {
            r.selected = true;
            return r;
          });
          setProducts(products);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const perPage = 8;

  return (
    <div id="gifts-list">
      <div className="d-flex flex-column justify-content-center align-items-center title-box">
        <h4>Lista de Presentes</h4>
      </div>
      {isLoading === true ? (
        <Loading isLoading={isLoading} />
      ) : (
        <div>
          {selectedEventId === null ? (
            <h3>Não há evento selecionado.</h3>
          ) : (
            <div className="gifts justify-content-center">
              <ul className="d-flex flex-row justify-content-around">
                {products.slice(0, perPage).map((product) => {
                  return (
                    <Product
                      key={product.id}
                      product={product}
                      //change={change}
                      change={() => {}}
                      //selected={product.selected}
                      selected={false}
                      qtd={product.selected_quantity}
                      event_product={product.id}
                      gifted={false}
                      type="gift-list"
                    />
                  );
                })}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default GuestGiftList;
