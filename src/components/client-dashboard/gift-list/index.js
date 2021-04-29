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

function GuestGiftList(props) {
  const { isLoading, events, err, selectedEventId } = useSelector((state) => ({
    isLoading: state.event.isLoading,
    events: state.event.events,
    err: state.event.err,
    selectedEventId: state.event.selectedEventId,
  }));
  const dispatch = useDispatch();

  const [products, setProducts] = useState([]);
  //const products = events.filter((product) => product.id === selectedEventId);

  React.useEffect(() => {
    getGiftList();
  }, []);

  const getGiftList = () => {
    setProducts(json);
  };

  const perPage = 8;

  return (
    <div id="gifts-list">
      <div className="d-flex flex-column justify-content-center align-items-center title-box">
        <h4>Lista de Presentes</h4>
      </div>
      <div>
        {/* {isLoading !== false ? <LoadingComponent></LoadingComponent> : null} */}
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
    </div>
  );
}

export default GuestGiftList;
