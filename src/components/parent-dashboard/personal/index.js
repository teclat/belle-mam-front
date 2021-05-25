import React, { Component } from "react";
import "./style.scss";
import { Card, Row, Col, Modal, Input, Radio, Button, Upload } from "antd";
import { Constants } from "../../../constants";
import axios from "axios";
import { useState } from "react";
import Loading from "../../loading";

function PersonalParent(props) {
  const [user, setUser] = useState({});
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [relationship, setRelationship] = useState("");
  const [role, setRole] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [image, setImage] = useState(null);
  const [fileList, setFileList] = useState([]);

  React.useEffect(() => {
    getUserData();
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
      //this.setState({ image: filedata, fileList: [file] });
      setImage(filedata);
      setFileList([file]);
    });
  };

  const getUserData = async () => {
    setIsLoading(true);
    let user = await JSON.parse(localStorage.getItem("user"));

    axios
      .get(Constants.ApiUrl + "users/" + user.id, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((response) => {
        let user = response.data;
        this.setState({
          user: user,
          name: user.name,
          phone: user.phone,
          role: user.role,
          city: user.city,
          state: user.state,
          relationship: user.relationship,
        });
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
    setIsLoading(false);
  };

  const updateUserData = async () => {
    let user = await JSON.parse(localStorage.getItem("user"));

    if (
      name === "" ||
      phone === "" ||
      city === "" ||
      state === "" ||
      relationship === null
    ) {
      Modal.error({
        content: "Existem campos vazios. Preencha e tente novamente.",
      });

      return;
    }

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
          relationship: relationship,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      )
      .then((response) => {
        getUserData();
        Modal.success({ content: "Salvo com sucesso!" });
      })
      .catch((error) => {
        Modal.error({ content: "Erro de executar cadastro." });
        console.log(error);
      });
    setIsLoading(false);
  };

  return (
    <div id="personal-parent">
      <div className="d-flex flex-column justify-content-center align-items-center title-box">
        <h4>Dados Pessoais</h4>
      </div>
      {isLoading === true ? (
        <Loading isLoading={isLoading} />
      ) : (
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
                  {fileList && fileList[0] && fileList[0].name
                    ? fileList[0].name
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

          {role === "parent" ? (
            <Row>
              <Col span={4}>
                <label>Parentesco</label>
              </Col>
              <Col style={{ textAlign: "center" }} span={20}>
                <Radio.Group
                  value={relationship}
                  onChange={(e) => setRelationship(e.target.value)}
                >
                  <Radio value="dad">Papai</Radio>
                  <Radio value="mom">Mamãe</Radio>
                </Radio.Group>
              </Col>
            </Row>
          ) : null}

          <Button
            loading={isLoading}
            onClick={() => updateUserData()}
            className="btn btn-secondary"
          >
            SALVAR
          </Button>
        </div>
      )}
    </div>
  );
}

export default PersonalParent;
