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
      //this.setState({ image: filedata, fileList: [file] });
      setImage(filedata);
      setFilelist([file]);
    });
  };

  const get = async () => {
    let user = JSON.parse(await localStorage.getItem("user"));

    axios
      .get(Constants.ApiUrl + "users/" + user.id, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((response) => {
        let user = response.data;
        // this.setState({
        //   user: user,
        //   name: user.name,
        //   phone: user.phone,
        //   role: user.role,
        //   city: user.city,
        //   state: user.state,
        //   relationship: user.relationship,
        // });
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
    let user = JSON.parse(await localStorage.getItem("user"));

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
        />
        <Row align="middle">
          <Col span={5}>
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

// export default class PersonalClient extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       user: {},
//       name: "",
//       phone: "",
//       city: "",
//       state: "",
//       role: "",
//       loading: false,
//       image: null,
//       fileList: [],
//     };
//     this.get();
//   }

//   dummyRequest = ({ file, onSuccess }) => {
//     setTimeout(() => {
//       onSuccess("ok");
//     }, 0);
//   };

//   getBase64(file, cb) {
//     let reader = new FileReader();
//     reader.readAsDataURL(file);
//     reader.onload = function () {
//       cb(reader.result);
//     };
//     reader.onerror = function (error) {
//       console.log("Error: ", error);
//     };
//   }

//   beforeUpload = async (file) => {
//     console.log("file", file);

//     let filedata = "";
//     this.getBase64(file, (result) => {
//       filedata = result;
//       this.setState({ image: filedata, fileList: [file] });
//     });
//   };

//   get = async () => {
//     let user = JSON.parse(await localStorage.getItem("user"));

//     axios
//       .get(Constants.ApiUrl + "users/" + user.id, {
//         headers: {
//           Authorization: `Bearer ${user.token}`,
//         },
//       })
//       .then((response) => {
//         let user = response.data;
//         this.setState({
//           user: user,
//           name: user.name,
//           phone: user.phone,
//           role: user.role,
//           city: user.city,
//           state: user.state,
//           relationship: user.relationship,
//         });
//         console.log(response.data);
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   };

//   update = async () => {
//     let user = JSON.parse(await localStorage.getItem("user"));

//     if (
//       this.state.name === "" ||
//       this.state.phone === "" ||
//       this.state.city === "" ||
//       this.state.state === ""
//     ) {
//       Modal.error({
//         content: "Existem campos vazios. Preencha e tente novamente.",
//       });
//       return;
//     }

//     this.setState({ loading: true });

//     axios
//       .post(
//         Constants.ApiUrl + "users/update",
//         {
//           name: this.state.name,
//           email: this.state.user.email,
//           city: this.state.city,
//           state: this.state.state,
//           phone: this.state.phone,
//           image: this.state.image,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${user.token}`,
//           },
//         }
//       )
//       .then((response) => {
//         this.setState({ loading: false });
//         this.get();
//         Modal.success({ content: "Salvo com sucesso!" });
//       })
//       .catch((error) => {
//         this.setState({ loading: false });
//         Modal.error({ content: "Erro de executar cadastro." });
//         console.log(error);
//       });
//   };

//   render() {
//     return (
//       <div id="personal-client">
//         <div className="d-flex flex-column justify-content-center align-items-center title-box">
//           <h4>Dados Pessoais</h4>
//         </div>
//         <div className="d-flex flex-column form justify-content-center">
//           <img
//             style={{ alignSelf: "center" }}
//             className={"mb-3"}
//             src={this.state.user.image_url}
//           />
//           <Row align="middle">
//             <Col span={5}>
//               <label>Mudar Foto</label>
//             </Col>
//             <Col span={19}>
//               <Upload
//                 name="file"
//                 customRequest={this.dummyRequest}
//                 multiple={false}
//                 showUploadList={false}
//                 beforeUpload={this.beforeUpload}
//               >
//                 <Button>
//                   {this.state.fileList &&
//                   this.state.fileList[0] &&
//                   this.state.fileList[0].name
//                     ? this.state.fileList[0].name
//                     : "Escolher..."}
//                 </Button>
//               </Upload>
//             </Col>
//           </Row>
//           <Row align="middle">
//             <Col span={4}>
//               <label>Nome</label>
//             </Col>
//             <Col span={20}>
//               <Input
//                 value={this.state.name}
//                 onChange={(e) => this.setState({ name: e.target.value })}
//                 placeholder={"Ana Freitas"}
//               />
//             </Col>
//           </Row>
//           <Row>
//             <Col span={4}>
//               <label>Telefone</label>
//             </Col>
//             <Col span={20}>
//               <Input
//                 value={this.state.phone}
//                 onChange={(e) => this.setState({ phone: e.target.value })}
//                 placeholder={"(85) 99999 9999"}
//               />
//             </Col>
//           </Row>
//           <Row>
//             <Col span={4}>
//               <label>Cidade</label>
//             </Col>
//             <Col span={20}>
//               <Input
//                 value={this.state.city}
//                 onChange={(e) => this.setState({ city: e.target.value })}
//                 placeholder={"Fortaleza"}
//               />
//             </Col>
//           </Row>
//           <Row>
//             <Col span={4}>
//               <label>Estado</label>
//             </Col>
//             <Col span={20}>
//               <Input
//                 value={this.state.state}
//                 onChange={(e) => this.setState({ state: e.target.value })}
//                 placeholder={"Ceará"}
//               />
//             </Col>
//           </Row>

//           <Button
//             loading={this.state.loading}
//             onClick={() => this.update()}
//             className="btn btn-secondary"
//           >
//             SALVAR
//           </Button>
//         </div>
//       </div>
//     );
//   }
// }
