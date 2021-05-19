import React, { Component, useState } from "react";
import "./style.scss";
import Product from "../../product";
import { Constants } from "../../../constants";
import axios from "axios";
import { Modal } from "antd";

function GiftListParent(props) {
  const [products, setProducts] = useState([]);
  const [productsArrayLenght, setProductsArrayLength] = useState(0);
  const [perPage, setPerPage] = useState(8);

  React.useEffect(() => {
    getGiftList();
  }, []);

  const getGiftList = async () => {
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
        getGiftList();
      })
      .catch((error) => {
        Modal.error({ content: "Erro ao salvar!" });
        console.log(error);
      });
  };

  const change = (id, values) => {
    let newProducts = products;
    let product = newProducts.filter((p) => p.id === id)[0];
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
          {products.slice(0, perPage).map((product) => {
            console.log("test-map", product);
            return (
              <Product
                key={product.id}
                product={product}
                change={change}
                //selected={product.selected}
                selected={true}
                qtd={product.quantity}
                event_product={product.id}
                gifted={false}
              />
            );
          })}
        </ul>
      </div>
      <div className="d-flex btns justify-content-center">
        {productsArrayLenght >= perPage ? (
          <div
            onClick={() => setPerPage(perPage * 2)}
            className="btn btn-secondary"
          >
            VER MAIS
          </div>
        ) : null}

        {perPage > 8 ? (
          <div
            onClick={() => setPerPage(perPage / 2)}
            className="btn btn-secondary"
          >
            VER MENOS
          </div>
        ) : null}

        <div onClick={() => save()} className="btn btn-secondary">
          SALVAR
        </div>
      </div>
    </div>
  );
}

export default GiftListParent;
