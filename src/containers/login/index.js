import React, { Component, useContext, useState } from "react";
import "./style.scss";
import { Card, Row, Col, Form, Input, Modal, Button } from "antd";
import axios from "axios";
import { Constants } from "../../constants";
import { Link } from "react-router-dom";
import AuthContext from "../../hooks/AuthContext";

function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isAuth, signIn, isLoading, setIsLoading } = useContext(AuthContext);

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async () => {
    setIsLoading(true);
    await signIn(email, password);
    setIsLoading(false);
    const response = await JSON.parse(localStorage.getItem("user"));
    if (response.role === "parent") {
      props.history.push("/parents/home");
    } else if (response.role === "admin") {
      props.history.push("/admin/products");
    } else if (response.role === "guest") {
      props.history.push("/guest/personal");
    } else {
      alert("Erro de efetuar login.");
    }
  };

  return (
    <div
      id="login"
      className="d-flex flex-column align-items-center justify-content-center"
    >
      <img src={require("../../assets/images/logo-white.png")} />
      <Card className="card">
        <Row>
          <Col className="login-img" span={12}></Col>
          <Col
            className="login-form d-flex flex-column justify-content-center"
            span={12}
          >
            <div className="d-flex justify-content-center align-items-center title-box">
              <h2>Entrar</h2>
              <img src={require("../../assets/images/purple-heart.png")} />
            </div>
            <div className="form justify-content-center">
              <Row>
                <Col span={4}>
                  <label>Email</label>
                </Col>
                <Col span={20}>
                  <Input
                    type="text"
                    value={email}
                    onChange={handleEmail}
                    placeholder={"anafreitas1@gmail.com"}
                  />
                </Col>
              </Row>
              <Row>
                <Col span={4}>
                  <label>Senha</label>
                </Col>
                <Col span={20}>
                  <Input
                    type="password"
                    onChange={handlePassword}
                    placeholder={"*********"}
                  />
                </Col>
              </Row>

              <Button
                loading={isLoading}
                onClick={handleLogin}
                className="btn btn-secondary"
              >
                ENTRAR
              </Button>

              <div className="link text-center mt-5">
                <Link to="/register">Ainda não é Cadastrado? Cadastre-se</Link>
              </div>
            </div>
          </Col>
        </Row>
      </Card>
    </div>
  );
}

export default Login;
// export default class Login extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       email: "",
//       password: "",
//       loading: false,
//     };
//   }

//   login = () => {
//     console.log(this.state);

//     if (this.state.email === "" || this.state.password === "") {
//       Modal.error({
//         content: "Existem campos vazios. Preencha e tente novamente.",
//       });
//       return;
//     }

//     this.setState({ loading: true });

//     axios
//       .post(Constants.ApiUrl + "users/login", {
//         email: this.state.email,
//         password: this.state.password,
//       })
//       .then((response) => {
//         this.setState({ loading: false });
//         let user = response.data;
//         localStorage.setItem("user", JSON.stringify(user));

//         if (user.role === "parent") {
//           this.props.history.push("/parents/home");
//         } else if (user.role === "admin") {
//           this.props.history.push("/admin/products");
//         } else if (user.role === "guest") {
//           this.props.history.push("/guest/personal");
//         } else {
//           alert("Erro de efetuar login.");
//           //   console.log("error");
//         }
//       })
//       .catch((error) => {
//         this.setState({ loading: false });
//         Modal.error({ content: "Erro de efetuar login." });
//         console.log(error);
//       });
//   };

//   handleLogin = () => {
//     this.setState({ loading: true });
//     signIn();
//     this.setState({ loading: false });
//   };

//   render() {
//     return (
//       <div
//         id="login"
//         className="d-flex flex-column align-items-center justify-content-center"
//       >
//         <img src={require("../../assets/images/logo-white.png")} />
//         <Card className="card">
//           <Row>
//             <Col className="login-img" span={12}></Col>
//             <Col
//               className="login-form d-flex flex-column justify-content-center"
//               span={12}
//             >
//               <div className="d-flex justify-content-center align-items-center title-box">
//                 <h2>Entrar</h2>
//                 <img src={require("../../assets/images/purple-heart.png")} />
//               </div>
//               <div className="form justify-content-center">
//                 <Row>
//                   <Col span={4}>
//                     <label>Email</label>
//                   </Col>
//                   <Col span={20}>
//                     <Input
//                       onChange={(e) => {
//                         this.setState({ email: e.target.value });
//                       }}
//                       placeholder={"anafreitas1@gmail.com"}
//                     />
//                   </Col>
//                 </Row>
//                 <Row>
//                   <Col span={4}>
//                     <label>Senha</label>
//                   </Col>
//                   <Col span={20}>
//                     <Input
//                       type="password"
//                       onChange={(e) => {
//                         this.setState({ password: e.target.value });
//                       }}
//                       placeholder={"*********"}
//                     />
//                   </Col>
//                 </Row>

//                 <Button
//                   loading={this.state.loading}
//                   onClick={() => {
//                     //this.login();
//                     this.handleLogin();
//                   }}
//                   className="btn btn-secondary"
//                 >
//                   ENTRAR
//                 </Button>

//                 <div className="link text-center mt-5">
//                   <Link to="/register">
//                     Ainda não é Cadastrado? Cadastre-se
//                   </Link>
//                 </div>
//               </div>
//             </Col>
//           </Row>
//         </Card>
//       </div>
//     );
//   }
// }
