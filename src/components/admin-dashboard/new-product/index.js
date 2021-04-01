import React, { Component, useState } from "react";
import "./style.scss";
import { Card, Row, Col, Modal, Input, Upload, Button } from "antd";
import { Constants } from "../../../constants";
import axios from "axios";

function NewProduct(props) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
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
    console.log("file", file);

    let filedata = "";
    getBase64(file, (result) => {
      filedata = result;
      //this.setState({ image: filedata, fileList: [file] })
      setImage(filedata);
      setFilelist([file]);
    });
  };

  const send = async (e) => {
    if (name == "" || price == 0 || image == null || description == "") {
      Modal.error({
        content: "Campos vazios.",
      });
      return;
    }

    let user = await JSON.parse(await localStorage.getItem("user"));
    //this.setState({ loading: true });
    setIsLoading(true);

    axios
      .post(
        Constants.ApiUrl + "products/create/",
        {
          description: description,
          available: true,
          image: image,
          name: name,
          price: price,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        // this.setState({
        //   name: "",
        //   description: "",
        //   price: 0,
        //   image: null,
        //   loading: false,
        //   fileList: [],
        // });
        setName("");
        setDescription("");
        setPrice(0);
        setImage(null);
        setIsLoading(false);
        setFilelist([]);
        Modal.success({
          content: "Produto salvo!",
        });
      })
      .catch((error) => {
        //this.setState({ loading: false });
        setIsLoading(false);
        Modal.error({
          content: "Erro ao salvar.",
        });
        console.log(error);
      });
  };

  return (
    <div id="new-product">
      <div className="d-flex flex-column justify-content-center align-items-center title-box">
        <h4>Novo Produto</h4>
      </div>
      <div className="form justify-content-center">
        <Row align="middle">
          <Col span={4}>
            <label>Nome</label>
          </Col>
          <Col span={20}>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={""}
            />
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <label>Descrição</label>
            <Input.TextArea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-3"
              placeholder={"Escrever..."}
            />
          </Col>
        </Row>
        <Row align="middle">
          <Col span={6}>
            <label>Foto do Produto</label>
          </Col>
          <Col span={18}>
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
            <label>Preço</label>
          </Col>
          <Col span={20}>
            <Input
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              type="number"
              placeholder={"R$ 0,00"}
            />
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

export default NewProduct;

// export default class NewProduct extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       name: "",
//       description: "",
//       price: 0,
//       image: null,
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
//     console.log("file", file);

//     let filedata = "";
//     this.getBase64(file, (result) => {
//       filedata = result;
//       this.setState({ image: filedata, fileList: [file] });
//     });
//   };

//   send = async (e) => {
//     if (
//       this.state.name == "" ||
//       this.state.price == 0 ||
//       this.state.image == null ||
//       this.state.description == ""
//     ) {
//       Modal.error({
//         content: "Campos vazios.",
//       });
//       return;
//     }

//     let user = JSON.parse(await localStorage.getItem("user"));
//     this.setState({ loading: true });

//     axios
//       .post(
//         Constants.ApiUrl + "products/create/",
//         {
//           description: this.state.description,
//           available: true,
//           image: this.state.image,
//           name: this.state.name,
//           price: this.state.price,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${user.token}`,
//           },
//         }
//       )
//       .then((response) => {
//         console.log(response.data);
//         this.setState({
//           name: "",
//           description: "",
//           price: 0,
//           image: null,
//           loading: false,
//           fileList: [],
//         });
//         Modal.success({
//           content: "Produto salvo!",
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
//           <h4>Novo Produto</h4>
//         </div>
//         <div className="form justify-content-center">
//           <Row align="middle">
//             <Col span={4}>
//               <label>Nome</label>
//             </Col>
//             <Col span={20}>
//               <Input
//                 value={this.state.name}
//                 onChange={(e) => this.setState({ name: e.target.value })}
//                 placeholder={""}
//               />
//             </Col>
//           </Row>
//           <Row>
//             <Col span={24}>
//               <label>Descrição</label>
//               <Input.TextArea
//                 value={this.state.description}
//                 onChange={(e) => this.setState({ description: e.target.value })}
//                 className="mt-3"
//                 placeholder={"Escrever..."}
//               />
//             </Col>
//           </Row>
//           <Row align="middle">
//             <Col span={6}>
//               <label>Foto do Produto</label>
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
//           <Row align="middle">
//             <Col span={4}>
//               <label>Preço</label>
//             </Col>
//             <Col span={20}>
//               <Input
//                 value={this.state.price}
//                 onChange={(e) => this.setState({ price: e.target.value })}
//                 type="number"
//                 placeholder={"R$ 0,00"}
//               />
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
