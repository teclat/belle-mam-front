import React from "react";
import "./style.scss";
import {
  Card,
  Row,
  Col,
  Upload,
  Input,
  Radio,
  Button,
  Select,
  Modal,
} from "antd";
import axios from "axios";
import { Constants } from "../../constants";
import { useState } from "react";

function Register(props) {
  const { Option } = Select;

  const [role, setRole] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [phone, setPhone] = useState("");
  const [events, setEvents] = useState("");
  const [password, setPassword] = useState("");
  const [relationship, setRelationship] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState(null);

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
    });
  };

  const register = async () => {
    console.log(
      "Role: ",
      role,
      "Email: ",
      email,
      "Password: ",
      password,
      "Name: ",
      name,
      "Phone: ",
      phone,
      "City: ",
      city,
      "State: ",
      state,
      "Relationship: ",
      relationship,
      "Image: ",
      image,
      "Events: ",
      events
    );
    if (role === "parent") {
      if (
        email === "" ||
        password === "" ||
        name === "" ||
        phone === "" ||
        city === "" ||
        state === "" ||
        relationship === null ||
        image === null ||
        events.length === 0
      ) {
        Modal.error({
          content: "Existem campos vazios. Preencha e tente novamente.",
        });
        return;
      }
    } else {
      if (
        email === "" ||
        password === "" ||
        name === "" ||
        phone === "" ||
        city === "" ||
        image === null ||
        state === "" ||
        events.length === 0
      ) {
        Modal.error({
          content: "Existem campos vazios. Preencha e tente novamente.",
        });
        return;
      }
    }

    setIsLoading(true);

    axios
      .post(Constants.ApiUrl + "users/create", {
        role: role,
        name: name,
        email: email,
        city: city,
        state: state,
        phone: phone,
        events: events,
        password: password,
        image: image,
        relationship: relationship,
      })
      .then((response) => {
        setIsLoading(false);
        console.log(response.data);
        // let user = response.data;
        // localStorage.setItem("user", JSON.stringify(user));

        props.history.push("/");
        Modal.success({ content: "Cadastro realizado." });
        // if (user.role === "parent") {
        // } else if (user.role === "admin") {
        //     this.props.history.push('/admin/products');
        // } else if (user.role === "guest") {
        //     this.props.history.push('/guest/personal');
        // } else {
        //     Modal.error({ content: "Erro de executar cadastro." });
        // }
      })
      .catch((err) => {
        setIsLoading(false);
        Modal.error({ content: "Erro de executar cadastro." });
        console.error(err.message);
      });
  };
  return (
    <div
      id="register"
      className="d-flex flex-column align-items-center justify-content-center"
    >
      <img src={require("../../assets/images/logo-white.png")} alt="" />
      <Card className="card">
        <Row>
          <Col className="register-img" span={12}></Col>
          <Col className="register-form" span={12}>
            <div className="d-flex justify-content-center align-items-center title-box">
              <h2>Faça Seu Cadastro</h2>
              <img
                src={require("../../assets/images/purple-heart.png")}
                alt=""
              />
            </div>
            {role == null ? (
              <div className="roles justify-content-center">
                <h5>Qual seu tipo de usuário?</h5>

                <div
                  onClick={() => {
                    setRole("guest");
                  }}
                  className="btn btn-secondary"
                >
                  CONVIDADO
                </div>
                <div
                  onClick={() => {
                    setRole("parent");
                  }}
                  className="btn btn-secondary"
                >
                  PAI/MÃE
                </div>
              </div>
            ) : (
              <div className="form justify-content-center">
                <Row align="middle">
                  <Col span={4}>
                    <label>Nome</label>
                  </Col>
                  <Col span={20}>
                    <Input
                      onChange={(e) => {
                        setName(e.target.value);
                      }}
                      placeholder={"Ana Freitas"}
                    />
                  </Col>
                </Row>
                <Row align="middle">
                  <Col span={4}>
                    <label>Email</label>
                  </Col>
                  <Col span={20}>
                    <Input
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                      placeholder={"anafreitas1@gmail.com"}
                    />
                  </Col>
                </Row>
                <Row align="middle">
                  <Col span={4}>
                    <label>Senha</label>
                  </Col>
                  <Col span={20}>
                    <Input
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                      type="password"
                      placeholder={"*******"}
                    />
                  </Col>
                </Row>
                <Row align="middle">
                  <Col span={4}>
                    <label>Telefone</label>
                  </Col>
                  <Col span={20}>
                    <Input
                      onChange={(e) => {
                        setPhone(e.target.value);
                      }}
                      placeholder={"(85) 99999 9999"}
                    />
                  </Col>
                </Row>
                <Row align="middle">
                  <Col span={4}>
                    <label>Cidade</label>
                  </Col>
                  <Col span={20}>
                    <Input
                      onChange={(e) => {
                        setCity(e.target.value);
                      }}
                      placeholder={"Fortaleza"}
                    />
                  </Col>
                </Row>
                <Row align="middle">
                  <Col span={4}>
                    <label>Estado</label>
                  </Col>
                  <Col span={20}>
                    <Input
                      onChange={(e) => {
                        setState(e.target.value);
                      }}
                      placeholder={"Ceará"}
                    />
                  </Col>
                </Row>
                <Row align="middle">
                  <Col span={5}>
                    <label>Foto</label>
                  </Col>
                  <Col span={19}>
                    <Upload
                      name="file"
                      customRequest={dummyRequest}
                      beforeUpload={beforeUpload}
                    >
                      <Button>Escolher...</Button>
                    </Upload>
                  </Col>
                </Row>
                <Row>
                  <Col span={4}>
                    <label>Tipo de Evento</label>
                  </Col>
                  <Col span={20}>
                    <Select
                      mode="multiple"
                      placeholder="Selecione"
                      onChange={(values) => setEvents(values)}
                    >
                      <Option value="revelation">Chá Revelação</Option>
                      <Option value="diaper">Chá de Fralda</Option>
                      <Option value="baby">Chá de Bebê</Option>
                      <Option value="baptize">Batizado</Option>
                      <Option value="birth_day">Aniversário</Option>
                    </Select>
                  </Col>
                </Row>

                {role === "parent" ? (
                  <Row>
                    <Col span={4}>
                      <label>Parentesco</label>
                    </Col>
                    <Col style={{ textAlign: "center" }} span={20}>
                      <Radio.Group
                        onChange={(e) => {
                          setRelationship(e.target.value);
                        }}
                      >
                        <Radio value="dad">Papai</Radio>
                        <Radio value="mom">Mamãe</Radio>
                      </Radio.Group>
                    </Col>
                  </Row>
                ) : null}

                <Button
                  loading={isLoading}
                  onClick={() => {
                    register();
                  }}
                  className="btn btn-secondary"
                >
                  CADASTRAR!
                </Button>
              </div>
            )}
          </Col>
        </Row>
      </Card>
    </div>
  );
}

export default Register;
