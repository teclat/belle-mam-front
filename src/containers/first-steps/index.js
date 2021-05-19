import React, { Component } from "react";
import { Row, Col } from "antd";
import Config from "../../components/config";
import Custom from "../../components/custom";
import "./style.scss";
import SelectGifts from "../../components/select-gifts";
import axios from "axios";
import { Constants } from "../../constants";
import { Modal } from "antd";
import { useState } from "react";

function FirstStep(props) {
  const [page, setPage] = useState(1);
  const [config, setConfig] = useState({});
  const [custom, setCustom] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const [content, setContent] = useState(null);

  const handleSetConfig = (state) => {
    console.log(state);
    setConfig(state);
    next();
  };

  const handleSetCustom = (state) => {
    console.log(state);
    setCustom(state);
    next();
  };

  const next = () => {
    setPage(page + 1);
    console.log(page);
  };

  const save = async (selecteds) => {
    let date = config.date.split("/");
    let babyBirth = config.babyBirth.split("/");
    let hour = config.hour.split(":");
    let user = await JSON.parse(localStorage.getItem("user"));
    console.log("SAVE METHOD IN FIRST-STEPS.JS");
    console.log(user);

    let body = {
      type: config.type,
      date: date[2] + "-" + date[1] + "-" + date[0],
      hour: hour[0] + ":" + hour[1],
      address: config.address,
      live: config.live,
      baby_image: custom.baby_image,
      mom_image: custom.mom_image,
      dad_image: custom.dad_image,
      mom_name: custom.mom_name,
      dad_name: custom.dad_name,
      background_image: custom.background_image,
      phone: custom.phone,
      baby_name: config.babyName,
      baby_birthday: babyBirth[2] + "-" + babyBirth[1] + "-" + babyBirth[0],
      theme: custom.theme,
      history_text: custom.historyText,
      invite_text: custom.inviteText,
      url: custom.url,
      products: selecteds,
      product_list_name: custom.url + " - product_list",
    };

    setIsLoading(true);

    axios
      .post(Constants.ApiUrl + "events/" + user.id + "/create", body, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((response) => {
        setIsLoading(false);
        console.log(response.data);
        props.history.push("/parents/home");
      })
      .catch((error) => {
        setIsLoading(false);
        Modal.error({ content: "Erro ao cadastrar lista de presentes." });
        console.log(error);
      });
  };

  return (
    <Row id="first-step">
      <Col
        span={5}
        className="leftColumn d-flex flex-column align-items-center"
      >
        <img src={require("../../assets/images/logo-white.png")} alt="" />
        <div className="d-flex flex-column justify-content-around align-items-center">
          <div></div>
          <div className={"step " + (page === 1 ? "active" : "")}>
            {" "}
            Tipo de Evento{" "}
          </div>
          <div className={"step " + (page === 2 ? "active" : "")}>
            {" "}
            Personalização{" "}
          </div>
          <div className={"step " + (page === 3 ? "active" : "")}>
            {" "}
            Escolher Lista{" "}
          </div>
          <div></div>
          <img
            src={require("../../assets/images/first-step-line.png")}
            alt=""
          />
        </div>
      </Col>
      {page === 1 ? (
        <>
          <Col span={3}></Col>
          <Col span={12}>
            <Config setConfig={handleSetConfig} />
          </Col>
          <Col span={3}></Col>
        </>
      ) : page === 2 ? (
        <>
          <Col span={3}></Col>
          <Col span={12}>
            <Custom setCustom={handleSetCustom} />
          </Col>
          <Col span={3}></Col>
        </>
      ) : (
        <>
          <Col span={1}></Col>
          <Col span={17}>
            <SelectGifts isLoading={isLoading} save={save} />
          </Col>
        </>
      )}
    </Row>
  );
}

export default FirstStep;
