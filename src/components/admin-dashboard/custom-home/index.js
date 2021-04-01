import React, { Component, useState } from "react";
import "./style.scss";
import { Modal, Row, Col, Input, Upload, Button, message } from "antd";
import { Constants } from "../../../constants";
import axios from "axios";

function CustomHome(props) {
  const [image, setImage] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [text, setText] = useState("");
  const [obs, setObs] = useState("");
  const [loading, setLoading] = useState(false);
  const [fileList, setFilelist] = useState([]);

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
    let filedata = "";
    getBase64(file, (result) => {
      filedata = result;
      //this.setState({ image: filedata, fileList: [file] })
      setImage(filedata);
      setFilelist([file]);
    });
  };

  const get = () => {
    axios
      .get(Constants.ApiUrl + "custom/testimonial")
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const send = async (e) => {
    if (text == "" || image == "" || obs == "") {
      Modal.warning({
        content: "Campos vazios.",
      });
      return;
    }

    let user = await JSON.parse(await localStorage.getItem("user"));
    setLoading(true);

    axios
      .post(
        Constants.ApiUrl + "custom/",
        {
          text: text,
          image: image,
          field: "testimonial",
          obs: obs,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        //this.setState({ loading: false });
        setLoading(false);
        Modal.success({
          content: "Testemunho salvo!",
        });
      })
      .catch((error) => {
        //this.setState({ loading: false });
        setLoading(false);
        Modal.error({
          content: "Erro ao salvar.",
        });
        console.log(error);
      });
  };
  return (
    <div id="new-product">
      <div className="d-flex flex-column justify-content-center align-items-center title-box">
        <h4>Atualizar Testemunho</h4>
      </div>
      <div className="form justify-content-center">
        <Row>
          <Col span={24}>
            <label>Texto de Testemunho</label>
            <Input.TextArea
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="mt-3"
              placeholder={"Escrever..."}
            />
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <label>Nome de quem deu testemunho</label>
            <Input
              value={obs}
              onChange={(e) => setObs(e.target.value)}
              className="mt-3"
              placeholder={"Escrever..."}
            />
          </Col>
        </Row>
        <Row align="middle">
          <Col span={6}>
            <label>Foto do Testemunho</label>
          </Col>
          <Col span={18}>
            <Upload
              name="file"
              customRequest={dummyRequest()}
              multiple={false}
              showUploadList={false}
              beforeUpload={beforeUpload()}
            >
              <Button>
                {fileList && fileList[0] && fileList[0].name
                  ? fileList[0].name
                  : "Escolher..."}
              </Button>
            </Upload>
          </Col>
        </Row>

        <Button
          loading={loading}
          onClick={() => send()}
          className="btn btn-secondary"
        >
          SALVAR
        </Button>
      </div>
    </div>
  );
}

export default CustomHome;

// export default class CustomHome extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       image: "",
//       imagePreview: "",
//       text: "",
//       obs: "",
//       loading: false,
//       fileList: [],
//     };
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
//     let filedata = "";
//     this.getBase64(file, (result) => {
//       filedata = result;
//       this.setState({ image: filedata, fileList: [file] });
//     });
//   };

//   get = () => {
//     axios
//       .get(Constants.ApiUrl + "custom/testimonial")
//       .then((response) => {
//         console.log(response.data);
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   };

//   send = async (e) => {
//     if (
//       this.state.text == "" ||
//       this.state.image == "" ||
//       this.state.obs == ""
//     ) {
//       Modal.warning({
//         content: "Campos vazios.",
//       });
//       return;
//     }

//     let user = JSON.parse(await localStorage.getItem("user"));
//     this.setState({ loading: true });

//     axios
//       .post(
//         Constants.ApiUrl + "custom/",
//         {
//           text: this.state.text,
//           image: this.state.image,
//           field: "testimonial",
//           obs: this.state.obs,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${user.token}`,
//           },
//         }
//       )
//       .then((response) => {
//         console.log(response.data);
//         this.setState({ loading: false });
//         Modal.success({
//           content: "Testemunho salvo!",
//         });
//       })
//       .catch((error) => {
//         this.setState({ loading: false });
//         Modal.error({
//           content: "Erro ao salvar.",
//         });
//         console.log(error);
//       });
//   };

//   render() {
//     return (
//       <div id="new-product">
//         <div className="d-flex flex-column justify-content-center align-items-center title-box">
//           <h4>Atualizar Testemunho</h4>
//         </div>
//         <div className="form justify-content-center">
//           <Row>
//             <Col span={24}>
//               <label>Texto de Testemunho</label>
//               <Input.TextArea
//                 value={this.state.text}
//                 onChange={(e) => this.setState({ text: e.target.value })}
//                 className="mt-3"
//                 placeholder={"Escrever..."}
//               />
//             </Col>
//           </Row>
//           <Row>
//             <Col span={24}>
//               <label>Nome de quem deu testemunho</label>
//               <Input
//                 value={this.state.obs}
//                 onChange={(e) => this.setState({ obs: e.target.value })}
//                 className="mt-3"
//                 placeholder={"Escrever..."}
//               />
//             </Col>
//           </Row>
//           <Row align="middle">
//             <Col span={6}>
//               <label>Foto do Testemunho</label>
//             </Col>
//             <Col span={18}>
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

//           <Button
//             loading={this.state.loading}
//             onClick={() => this.send()}
//             className="btn btn-secondary"
//           >
//             SALVAR
//           </Button>
//         </div>
//       </div>
//     );
//   }
// }
