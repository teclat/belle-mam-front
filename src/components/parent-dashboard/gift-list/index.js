import React, { Component, useState } from "react";
import "./style.scss";
import Product from "../../product";
import { Constants } from "../../../constants";
import axios from "axios";
import { Modal } from "antd";

function GiftListParent(props) {
  const [products, setProducts] = useState([]);

  React.useEffect(() => {
    get();
    console.log("products", products);
  }, []);

  const get = async () => {
    let user = await JSON.parse(localStorage.getItem("user"));
    if (props.event.id === undefined) {
      console.log("Event not set.");
    } else {
      axios
        .get(Constants.ApiUrl + "events/gifts/" + props.event.id, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        })
        .then((response) => {
          let products = response.data.map((r) => {
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

  const save = async () => {
    let events_products = products.map((product) => {
      return {
        id: product.id,
        selected: product.selected,
        quantity: product.quantity,
      };
    });
    let user = await JSON.parse(localStorage.getItem("user"));

    axios
      .patch(
        Constants.ApiUrl + "events/event-products",
        {
          events_products: events_products,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      )
      .then((response) => {
        Modal.success({ content: "Salvo com sucesso!" });
        get();
      })
      .catch((error) => {
        Modal.error({ content: "Erro ao salvar!" });
        console.log(error);
      });
  };

  const change = (id, values) => {
    let newProducts = products;
    let product = newProducts.filter((p) => p.id == id)[0];
    product.selected = values.selected;
    product.quantity = values.qtd;
    console.log(values);
    console.log("pppp", newProducts);
    setProducts(newProducts);
  };

  return (
    <div id="gifts-parent">
      <div className="d-flex flex-column justify-content-center align-items-center title-box">
        <h4>Lista de Presentes</h4>
      </div>
      <div className="gifts justify-content-center">
        <ul className="d-flex flex-row justify-content-around">
          {products.map((p) => {
            return (
              <Product
                product={p.product}
                change={change()}
                selected={p.selected}
                qtd={p.quantity}
                event_product={p.id}
                gifted={false}
              />
            );
          })}
        </ul>
      </div>
      <div className="d-flex btns justify-content-center">
        <div onClick={() => save()} className="btn btn-secondary">
          SALVAR
        </div>
      </div>
    </div>
  );
}

export default GiftListParent;
