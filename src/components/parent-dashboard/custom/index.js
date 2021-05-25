import React, { Component } from "react";
import { Row, Col, Radio, Input, Upload, Button, Modal } from "antd";
import "./style.scss";
import { Constants } from "../../../constants";
import axios from "axios";
import { useState } from "react";

function CustomParent(props) {
  const [theme, setTheme] = useState(props.event.theme);
  const [historyText, setHistoryText] = useState(props.event.history_text);
  const [phone, setPhone] = useState(props.event.phone);
  const [inviteText, setInviteText] = useState(props.event.invite_text);
  const [url, setUrl] = useState(props.event.url);
  const [validUrl, setValidUrl] = useState(false);
  const [babyImage, setBabyImage] = useState(null);
  const [fileBaby, setFileBaby] = useState([]);
  const [momName, setMomName] = useState(props.event.mom_name);
  const [momImage, setMomImage] = useState(null);
  const [fileMom, setFileMom] = useState([]);
  const [dadName, setDadName] = useState(props.event.dad_name);
  const [dadImage, setDadImage] = useState(null);
  const [fileDad, setFileDad] = useState([]);
  const [backgroundImage, setBackgroundImage] = useState(null);
  const [fileBack, setFileBack] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const dummyRequest = ({ file, onSuccess }) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  };

  const getBase64 = (file, cb) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      cb(reader.result);
    };
    reader.onerror = function (error) {
      console.log("Error: ", error);
    };
  };

  const save = async () => {
    const event = props.event;
    if (
      theme === "" ||
      historyText === "" ||
      url === "" ||
      momName === "" ||
      dadName === "" ||
      phone === "" ||
      inviteText === ""
    ) {
      Modal.error({
        content: "Campos vazios.",
      });
      return;
    }

    let user = await JSON.parse(localStorage.getItem("user"));
    //this.setState({ loading: true });
    setIsLoading(true);
    axios
      .patch(
        Constants.ApiUrl + "events/" + event.id + "/edit",
        {
          date: event.date,
          type: event.type,
          hour: event.hour,
          address: event.address,
          phone: phone,
          baby_name: event.baby_name,
          baby_birthday: event.baby_birthday,
          theme: theme,
          history_text: historyText,
          invite_text: inviteText,
          url: event.url,
          baby_image: event.baby_image_url,
          mom_image: event.mom_image_url,
          dad_image: event.dad_image_url,
          background_image: event.background_image_url,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      )
      .then((response) => {
        Modal.success({
          content: "Personalização salva!",
        });
      })
      .catch((error) => {
        Modal.error({
          content: "Erro ao salvar.",
        });
        console.log(error);
      });
    setIsLoading(false);
  };

  return (
    <div id="custom-parent">
      <div className="d-flex flex-column justify-content-center align-items-center title-box">
        <h4>Personalizar</h4>
      </div>
      <div className="form justify-content-center">
        <Row align="middle">
          <Col span={6}>
            <label>Tema</label>
          </Col>
          <Col span={18}>
            <Col style={{ textAlign: "center" }} span={18}>
              <Radio.Group
                onChange={(e) => setTheme(e.target.value)}
                value={theme}
                className="d-flex"
              >
                <Radio value="green" className="d-flex align-items-center">
                  <div className="green-ball"></div>
                </Radio>
                <Radio value="purple" className="d-flex align-items-center">
                  <div className="purple-ball"></div>
                </Radio>
              </Radio.Group>
            </Col>
          </Col>
        </Row>
        <Row align="middle">
          <Col span={24}>
            <label>Conta para a gente uma história sua e do bebê</label>
            <Input.TextArea
              onChange={(e) => setHistoryText(e.target.value)}
              value={historyText}
              style={{ marginTop: 10 }}
              placeholder={"Escrever..."}
            />
          </Col>
        </Row>
        <Row align="middle">
          <Col span={6}>
            <label>Tel. de Contato</label>
          </Col>
          <Col span={18}>
            <Input
              onChange={(e) => setPhone(e.target.value)}
              value={phone}
              placeholder={"(85) 99999-9999"}
            />
          </Col>
        </Row>
        <Row align="middle">
          <Col span={24}>
            <label>Escreva um textinho para chamar os convidados</label>
            <Input.TextArea
              onChange={(e) => setInviteText(e.target.value)}
              value={inviteText}
              style={{ marginTop: 10 }}
              placeholder={"Escrever..."}
            />
          </Col>
        </Row>

        <Button
          loading={isLoading}
          onClick={() => save()}
          className="btn btn-secondary"
        >
          SALVAR
        </Button>
      </div>
    </div>
  );
}

export default CustomParent;
