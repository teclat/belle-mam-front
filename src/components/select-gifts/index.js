import React, { Component } from "react";
import "./style.scss";
import Product from "../product";
import { Constants } from "../../constants";
import axios from "axios";
import { Button } from "antd";
import { useState } from "react";
import FirstRender from "../../hooks/FirstRender";

function SelectGifts(props) {
  const [nextPage, setNextPage] = useState(1);
  const [perPage, setPerPage] = useState(8);
  const [products, setProducts] = useState([]);
  const [lastAddedLength, setLastAddedLength] = useState(0);
  const [selecteds, setSelecteds] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMorePages, setHasMorePages] = useState(true);
  const [pageLimit, setPageLimit] = useState(nextPage + 1);

  const isFirstRender = FirstRender();

  React.useEffect(() => {
    getProducts();
  }, []);

  React.useEffect(() => {
    if (!isFirstRender) {
      console.log("PRODUCTS: ", products);
      console.log("Page Limit: ", pageLimit, "Page", nextPage);
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
        dimensions_length: "",
        dimensions_width: "",
        dimensions_height: "",
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
      forEachProduct.dimensions_length = data[i].dimensions.length;
      forEachProduct.dimensions_width = data[i].dimensions.width;
      forEachProduct.dimensions_height = data[i].dimensions.height;
      for (let j = 0; j < data[i].categories.length; j++) {
        forEachProduct.categories.push(data[i].categories[j].name);
      }
      for (let k = 0; k < data[i].images.length; k++) {
        forEachProduct.images.push(data[i].images[k].src);
      }
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
          page: nextPage,
          per_page: perPage,
        },
      })

      .then((response) => {
        setPageLimit(response.headers["x-wp-totalpages"]);

        let data = response.data;

        console.log(response.data);

        let parsedProducts = parseProducts(data);

        setProducts([...products, ...parsedProducts]);

        setLastAddedLength(parsedProducts.length);
        if (nextPage >= pageLimit) {
          setHasMorePages(false);
          console.log("End of products list.");
        } else {
          setNextPage(nextPage + 1);
        }

        setIsLoading(false);
      })

      .catch((err) => {
        console.error(err.message);
        setIsLoading(false);
      });
  };

  const removeProducts = () => {
    console.log(lastAddedLength);
    setIsLoading(true);
    setProducts(products.slice(0, products.length - lastAddedLength));
    setNextPage(nextPage - 1);
    setIsLoading(false);
  };

  const changeSelecteds = (giftId, values) => {
    console.log("present selecteds: ", selecteds);
    let selectedsTemp = selecteds;
    let exist = false;
    if (selectedsTemp.length > 0) {
      let product = selectedsTemp.filter((p) => p.id === giftId)[0];
      if (product) {
        exist = true;
        if (values.selected === true) {
          product.selected_quantity = values.qtd;
        } else {
          var index = selectedsTemp
            .map((p) => {
              return p.id;
            })
            .indexOf(giftId);
          selectedsTemp.splice(index, 1);
        }
      }
    }

    if (!exist) {
      if (values.selected === true) {
        let product = products.filter((p) => p.id === giftId)[0];
        product.selected_quantity = values.qtd;
        selectedsTemp.push(...selectedsTemp, product);
      }
    }
    console.log("Change Selecteds: ", selectedsTemp);
    setSelecteds(selectedsTemp);
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
        <ul>
          {products.map((product) => {
            return (
              <Product
                key={product.id}
                giftId={product.id}
                change={changeSelecteds}
                gifted={false}
                product={product}
              />
            );
          })}
        </ul>
      </div>
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
        {nextPage > 2 ? (
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
