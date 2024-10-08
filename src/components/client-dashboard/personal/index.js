import React, { Component, useState } from "react";
import "./style.scss";
import { Card, Row, Col, Form, Input, Upload, Button, Modal } from "antd";
import { Constants } from "../../../constants";
import axios from "axios";

function PersonalClient(props) {
  const [user, setUser] = useState({});
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [role, setRole] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [filelist, setFilelist] = useState([]);
  const [relationship, setRelationship] = useState(null);

  React.useEffect(() => {
    get();
  }, []);

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

  const beforeUpload = async (file) => {
    console.log("file", file);

    let filedata = "";
    getBase64(file, (result) => {
      filedata = result;
      setImage(filedata);
      setFilelist([file]);
    });
  };

  const get = async () => {
    let user = await JSON.parse(localStorage.getItem("user"));

    axios
      .get(Constants.ApiUrl + "users/" + user.id, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((response) => {
        let user = response.data;
        setUser(user);
        setName(user.name);
        setPhone(user.phone);
        setRole(user.role);
        setCity(user.city);
        setState(user.state);
        setRelationship(user.relationship);

        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const update = async () => {
    let user = await JSON.parse(localStorage.getItem("user"));

    if (name === "" || phone === "" || city === "" || state === "") {
      Modal.error({
        content: "Existem campos vazios. Preencha e tente novamente.",
      });
      return;
    }

    //this.setState({ loading: true });
    setIsLoading(true);

    axios
      .post(
        Constants.ApiUrl + "users/update",
        {
          name: name,
          email: user.email,
          city: city,
          state: state,
          phone: phone,
          image: image,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      )
      .then((response) => {
        //this.setState({ loading: false });
        setIsLoading(false);
        get();
        Modal.success({ content: "Salvo com sucesso!" });
      })
      .catch((error) => {
        //this.setState({ loading: false });
        setIsLoading(false);
        Modal.error({ content: "Erro de executar cadastro." });
        console.log(error);
      });
  };

  return (
    <div id="personal-client">
      <div className="d-flex flex-column justify-content-center align-items-center title-box">
        <h4>Dados Pessoais</h4>
      </div>
      <div className="d-flex flex-column form justify-content-center">
        <img
          style={{ alignSelf: "center" }}
          className={"mb-3"}
          src={user.image_url}
          alt=""
        />
        <Row align="middle">
          <Col span={4}>
            <label>Mudar Foto</label>
          </Col>
          <Col span={19}>
            <Upload
              name="file"
              customRequest={dummyRequest}
              multiple={false}
              showUploadList={false}
              beforeUpload={beforeUpload}
            >
              <Button>
                {filelist && filelist[0] && filelist[0].name
                  ? filelist[0].name
                  : "Escolher..."}
              </Button>
            </Upload>
          </Col>
        </Row>
        <Row align="middle">
          <Col span={4}>
            <label>Nome</label>
          </Col>
          <Col span={20}>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={"Ana Freitas"}
            />
          </Col>
        </Row>
        <Row>
          <Col span={4}>
            <label>Telefone</label>
          </Col>
          <Col span={20}>
            <Input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder={"(85) 99999 9999"}
            />
          </Col>
        </Row>
        <Row>
          <Col span={4}>
            <label>Cidade</label>
          </Col>
          <Col span={20}>
            <Input
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder={"Fortaleza"}
            />
          </Col>
        </Row>
        <Row>
          <Col span={4}>
            <label>Estado</label>
          </Col>
          <Col span={20}>
            <Input
              value={state}
              onChange={(e) => setState(e.target.value)}
              placeholder={"Ceará"}
            />
          </Col>
        </Row>

        <Button
          loading={isLoading}
          onClick={() => update()}
          className="btn btn-secondary"
        >
          SALVAR
        </Button>
      </div>
    </div>
  );
}

export default PersonalClient;
