import React, { Component } from "react";
import "./style.scss";
import Product from "../product";
import { Constants } from "../../constants";
import axios from "axios";
import { Button } from "antd";
import { useState } from "react";
import FirstRender from "../../hooks/FirstRender";

function SelectGifts(props) {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(8);
  const [products, setProducts] = useState([]);
  const [lastAddedLength, setLastAddedLength] = useState(0);
  const [selecteds, setSelecteds] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMorePages, setHasMorePages] = useState(true);
  const [pageLimit, setPageLimit] = useState(page + 1);

  const isFirstRender = FirstRender();

  React.useEffect(() => {
    getProducts();
  }, []);

  React.useEffect(() => {
    if (!isFirstRender) {
      console.log("PRODUCTS: ", products);
      console.log("Page Limit: ", pageLimit, "Page", page);
    }
  }, [products]);

  const parseProducts = (data) => {
    let parsedProducts = [];

    for (let i = 0; i < data.length; i++) {
      let forEachProduct = {
        id: "",
        name: "",
        stock_quantity: "",
        slug: "",
        permalink: "",
        purchased: "",
        type: "",
        description: "",
        short_description: "",
        sku: "",
        price: "",
        regular_price: "",
        weight: "",
        dimensions: { length: "", width: "", height: "" },
        categories: [],
        images: [],
      };
      forEachProduct.id = data[i].id;
      forEachProduct.name = data[i].name;
      forEachProduct.stock_quantity = data[i].stock_quantity;
      forEachProduct.slug = data[i].slug;
      forEachProduct.permalink = data[i].permalink;
      forEachProduct.purchased = data[i].purchased;
      forEachProduct.type = data[i].type;
      forEachProduct.description = data[i].description;
      forEachProduct.short_description = data[i].short_description;
      forEachProduct.sku = data[i].sku;
      forEachProduct.price = data[i].price;
      forEachProduct.regular_price = data[i].regular_price;
      forEachProduct.weight = data[i].weight;
      forEachProduct.dimensions.length = data[i].dimensions.length;
      forEachProduct.dimensions.width = data[i].dimensions.width;
      forEachProduct.dimensions.height = data[i].dimensions.height;
      forEachProduct.categories = data[i].categories;
      forEachProduct.images = data[i].images;
      parsedProducts.push(forEachProduct);
    }
    return parsedProducts;
  };

  const getProducts = async () => {
    setIsLoading(true);

    let user = await JSON.parse(localStorage.getItem("user"));
    console.log("user", user);

    axios
      .get(Constants.ApiUrl + "products", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },

        params: {
          page: page,
          per_page: perPage,
        },
      })

      .then((response) => {
        setPageLimit(response.headers["x-wp-totalpages"]);

        let data = response.data;

        console.log(response.data);

        let parsedProducts = parseProducts(data);

        setProducts([...products, ...parsedProducts]);

        setLastAddedLength(parseProducts.length);

        if (page >= pageLimit) {
          setHasMorePages(false);
          console.log("End of products list.");
        } else {
          setPage(page + 1);
        }

        setIsLoading(false);
      })

      .catch((err) => {
        console.error(err.message);
        setIsLoading(false);
      });
  };

  const removeProducts = () => {
    setIsLoading(true);

    let productsTemp = products;
    productsTemp.splice(-1, lastAddedLength);
    setProducts(productsTemp);

    setIsLoading(false);
  };

  const changeSelecteds = (id, values) => {
    console.log(values);
    let selectedsTemp = selecteds;
    let exist = false;
    if (selectedsTemp.length > 0) {
      let product = selectedsTemp.filter((p) => p.product_id === id)[0];
      if (product) {
        exist = true;
        if (values.selected === true) {
          product.quantity = values.qtd;
        } else {
          var index = selectedsTemp
            .map((p) => {
              return p.product_id;
            })
            .indexOf(id);
          selectedsTemp.splice(index, 1);
        }
      }
    }

    if (!exist) {
      if (values.selected === true) {
        selecteds.push({
          product_id: id,
          quantity: values.qtd,
        });
      }
    }
    console.log("pppp", selectedsTemp);
    setSelecteds(selectedsTemp);
  };

  const sendSelecteds = async () => {
    setIsLoading(true);
  };

  return (
    <div id="select-gifts">
      <div className="d-flex flex-column justify-content-center align-items-center title-box">
        <div className="d-flex">
          <h2>Falta pouco!</h2>
          <img src={require("../../assets/images/purple-heart.png")} alt="" />
        </div>
        <h4>Vamos escolher os produtos do seu evento</h4>
      </div>
      <div className="gifts">
        {/* <ul class="d-flex flex-row justify-content-around"> */}
        <ul>
          {products.map((product) => {
            return (
              <Product
                key={product.id}
                event_product={product.id}
                change={changeSelecteds}
                gifted={false}
                product={product}
              />
            );
          })}
        </ul>
      </div>
      {/* <div className="d-flex btns justify-content-around"> */}
      <div className="btnsContainer">
        {hasMorePages === true ? (
          <Button
            loading={isLoading}
            onClick={() => {
              getProducts();
            }}
            className="btn btn-secondary"
          >
            MAIS PRODUTOS
          </Button>
        ) : null}
        {page !== 1 ? (
          <Button
            loading={isLoading}
            onClick={() => {
              removeProducts();
            }}
            className="btn btn-secondary"
          >
            MENOS PRODUTOS
          </Button>
        ) : null}
        <Button
          loading={props.isLoading}
          onClick={() => {
            props.save(selecteds);
          }}
          className="btn btn-secondary"
        >
          FINALIZAR
        </Button>
      </div>
    </div>
  );
}

export default SelectGifts;
