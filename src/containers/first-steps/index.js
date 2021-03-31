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
    //this.setState({ config: state });
    setConfig(state);
    //this.next();
    next();
  };

  const handleSetCustom = (state) => {
    console.log(state);
    //this.setState({ custom: state });
    setCustom(state);
    //this.next();
    next();
  };

  const next = () => {
    //this.setState({ page: this.state.page + 1 });
    setPage(page + 1);
    console.log(page);
  };

  const save = async (selecteds) => {
    //let date = this.state.config.date.split("/");
    let date = config.date.split("/");
    //let babyBirth = this.state.config.babyBirth.split("/");
    let babyBirth = config.babyBirth.split("/");
    //let hour = this.state.config.hour.split(":");
    let hour = config.hour.split(":");
    //let user = await JSON.parse(await localStorage.getItem("user"));
    let user = await JSON.parse(await localStorage.getItem("user"));
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
    };

    //this.setState({ isLoading: true });
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
        <img src={require("../../assets/images/logo-white.png")} />
        <div className="d-flex flex-column justify-content-around align-items-center">
          <div></div>
          <div className={"step " + (page == 1 ? "active" : "")}>
            {" "}
            Tipo de Evento{" "}
          </div>
          <div className={"step " + (page == 2 ? "active" : "")}>
            {" "}
            Personalização{" "}
          </div>
          <div className={"step " + (page == 3 ? "active" : "")}>
            {" "}
            Escolher Lista{" "}
          </div>
          <div></div>
          <img src={require("../../assets/images/first-step-line.png")} />
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

// export default class FirstStep extends Component {
//   state = {
//     page: 1,
//     config: {},
//     custom: {},
//     isLoading: false,
//   };

//   setConfig = (state) => {
//     console.log(state);
//     this.setState({ config: state });
//     this.next();
//   };

//   setCustom = (state) => {
//     console.log(state);
//     this.setState({ custom: state });
//     this.next();
//   };

//   next = () => {
//     this.setState({ page: this.state.page + 1 });
//   };

//   save = async (selecteds) => {
//     let date = this.state.config.date.split("/");
//     let babyBirth = this.state.config.babyBirth.split("/");
//     let hour = this.state.config.hour.split(":");
//     let user = await JSON.parse(await localStorage.getItem("user"));
//     console.log("SAVE METHOD IN FIRST-STEPS.JS");
//     console.log(user);

//     let body = {
//       type: this.state.config.type,
//       date: date[2] + "-" + date[1] + "-" + date[0],
//       hour: hour[0] + ":" + hour[1],
//       address: this.state.config.address,
//       live: this.state.config.live,
//       baby_image: this.state.custom.baby_image,
//       mom_image: this.state.custom.mom_image,
//       dad_image: this.state.custom.dad_image,
//       mom_name: this.state.custom.mom_name,
//       dad_name: this.state.custom.dad_name,
//       background_image: this.state.custom.background_image,
//       phone: this.state.custom.phone,
//       baby_name: this.state.config.babyName,
//       baby_birthday: babyBirth[2] + "-" + babyBirth[1] + "-" + babyBirth[0],
//       theme: this.state.custom.theme,
//       history_text: this.state.custom.historyText,
//       invite_text: this.state.custom.inviteText,
//       url: this.state.custom.url,
//       products: selecteds,
//     };

//     this.setState({ isLoading: true });
//     axios
//       .post(Constants.ApiUrl + "events/" + user.id + "/create", body, {
//         headers: {
//           Authorization: `Bearer ${user.token}`,
//         },
//       })
//       .then((response) => {
//         this.setState({ isLoading: false });
//         console.log(response.data);
//         this.props.history.push("/parents/home");
//       })
//       .catch((error) => {
//         this.setState({ isLoading: false });
//         Modal.error({ content: "Erro ao cadastrar lista de presentes." });
//         console.log(error);
//       });
//   };

//   render() {
//     let content = null;
//     if (this.state.page == 1) {
//       content = (
//         <>
//           <Col span={3}></Col>
//           <Col span={12}>
//             <Config setConfig={this.setConfig} />
//           </Col>
//           <Col span={3}></Col>
//         </>
//       );
//     } else if (this.state.page == 2) {
//       content = (
//         <>
//           <Col span={3}></Col>
//           <Col span={12}>
//             <Custom setCustom={this.setCustom} />
//           </Col>
//           <Col span={3}></Col>
//         </>
//       );
//     } else {
//       content = (
//         <>
//           <Col span={1}></Col>
//           <Col span={17}>
//             <SelectGifts isLoading={this.state.isLoading} save={this.save} />
//           </Col>
//         </>
//       );
//     }

//     return (
//       <Row id="first-step">
//         <Col
//           span={5}
//           className="leftColumn d-flex flex-column align-items-center"
//         >
//           <img src={require("../../assets/images/logo-white.png")} />
//           <div className="d-flex flex-column justify-content-around align-items-center">
//             <div></div>
//             <div className={"step " + (this.state.page == 1 ? "active" : "")}>
//               {" "}
//               Tipo de Evento{" "}
//             </div>
//             <div className={"step " + (this.state.page == 2 ? "active" : "")}>
//               {" "}
//               Personalização{" "}
//             </div>
//             <div className={"step " + (this.state.page == 3 ? "active" : "")}>
//               {" "}
//               Escolher Lista{" "}
//             </div>
//             <div></div>
//             <img src={require("../../assets/images/first-step-line.png")} />
//           </div>
//         </Col>
//         {content}
//       </Row>
//     );
//   }
// }
