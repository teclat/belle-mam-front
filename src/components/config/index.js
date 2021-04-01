import React, { Component, useState } from "react";
import { Row, Col, Radio, Input, DatePicker, TimePicker, Select } from "antd";
import locale from "antd/es/date-picker/locale/pt_BR";
import "./style.scss";

function Config(props) {
  const { Option } = Select;

  const [date, setDate] = useState(null);
  const [type, setType] = useState(null);
  const [hour, setHour] = useState(null);
  const [address, setAdress] = useState("");
  const [dontKnowName, setDontKnowName] = useState(false);
  const [babyName, setBabyName] = useState("");
  const [live, setLive] = useState("");
  const [babyBirth, setBabyBirth] = useState(null);

  React.useEffect(() => {
    let user = await JSON.parse(await localStorage.getItem("user"));
  }, []);

  const next = () => {
    if (
      date == null ||
      hour == null ||
      address == null ||
      (babyName == "" && dontKnowName == false) ||
      babyBirth == null
    ) {
      alert("Existem campos vazios. Preencha e tente novamente.");
      return;
    } else {
      props.setConfig({
        date: date,
        type: type,
        hour: hour,
        address: address,
        dontKnowName: dontKnowName,
        babyName: babyName,
        live: live,
        babyBirth: babyBirth,
      });
    }
  };

  return (
    <div id="config">
      <div className="d-flex flex-column justify-content-center align-items-center title-box">
        <div className="d-flex">
          <h2>Olá, Fulana</h2>
          <img src={require("../../assets/images/purple-heart.png")} />
        </div>
        <h4>Vamos personalizar a página do evento do seu bebê</h4>
      </div>
      <div className="form justify-content-center">
        <Row align="middle">
          <Col span={6}>
            <label>Data do Evento</label>
          </Col>
          <Col span={18}>
            <DatePicker
              onChange={(date, dateString) => {
                setDate(dateString);
              }}
              format="DD/MM/YYYY"
              locale={locale}
              placeholder={"--/--/--"}
            />
          </Col>
        </Row>
        <Row align="middle">
          <Col span={6}>
            <label>Horário do Evento</label>
          </Col>
          <Col span={18}>
            <TimePicker
              onChange={(date, dateString) => {
                setHour(dateString);
              }}
              locale={locale}
              placeholder={"hh:mm"}
            />
          </Col>
        </Row>
        <Row align="middle">
          <Col span={6}>
            <label>Tipo do Evento</label>
          </Col>
          <Col span={18}>
            <Select
              placeholder="Selecione"
              onChange={(value) => setType(value)}
            >
              <Option value="revelation">Chá Revelação</Option>
              <Option value="diaper">Chá de Fralda</Option>
              <Option value="baby">Chá de Bebê</Option>
              <Option value="baptize">Batizado</Option>
              <Option value="birth_day">Aniversário</Option>
            </Select>
          </Col>
        </Row>
        <Row align="middle">
          <Col span={6}>
            <label>Local do Evento</label>
          </Col>
          <Col span={18}>
            <Input
              onChange={(e) => {
                setAdress(e.target.value);
              }}
              placeholder={"Fortaleza"}
            />
          </Col>
        </Row>
        <Row align="middle">
          <Col span={6}>
            <label>URL da Live</label>
          </Col>
          <Col span={18}>
            <Input
              onChange={(e) => {
                setLive(e.target.value);
              }}
              placeholder={""}
            />
          </Col>
        </Row>
        <Row align="middle">
          <Col span={6}>
            <label>Já sabe o nome do seu bebê?</label>
          </Col>
          <Col style={{ textAlign: "center" }} span={18}>
            <Radio.Group
              onChange={(e) => {
                setDontKnowName(e.target.value);
              }}
            >
              <Radio value={true}>Não sei ainda</Radio>
            </Radio.Group>
          </Col>
        </Row>
        <Row align="middle">
          <Col span={6}>
            <label>Nome do Bebê</label>
          </Col>
          <Col span={18}>
            <Input
              onChange={(e) => {
                setBabyName(e.target.value);
              }}
              placeholder={""}
            />
          </Col>
        </Row>
        <Row align="middle">
          <Col span={6}>
            <label>Data de Nascimento do Bebê</label>
          </Col>
          <Col span={18}>
            <DatePicker
              onChange={(date, dateString) => {
                setBabyBirth(dateString);
              }}
              format="DD/MM/YYYY"
              locale={locale}
              placeholder={"--/--/--"}
            />
          </Col>
        </Row>

        <button onClick={() => next()} className="btn btn-secondary">
          AVANÇAR
        </button>
      </div>
    </div>
  );
}

export default Config;

// const { Option } = Select;
// export default class Config extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       date: null,
//       type: null,
//       hour: null,
//       address: "",
//       dontKnowName: false,
//       babyName: "",
//       live: "",
//       babyBirth: null,
//     };
//   }

//   componentDidMount = async () => {
//     let user = await JSON.parse(await localStorage.getItem("user"));
//     console.log(user);
//   };

//   next = () => {
//     if (
//       this.state.date == null ||
//       this.state.hour == null ||
//       this.state.address == null ||
//       (this.state.babyName == "" && this.state.dontKnowName == false) ||
//       this.state.babyBirth == null
//     ) {
//       alert("Existem campos vazios. Preencha e tente novamente.");
//       return;
//     } else {
//       this.props.setConfig(this.state);
//     }
//   };

//   render() {
//     return (
//       <div id="config">
//         <div className="d-flex flex-column justify-content-center align-items-center title-box">
//           <div className="d-flex">
//             <h2>Olá, Fulana</h2>
//             <img src={require("../../assets/images/purple-heart.png")} />
//           </div>
//           <h4>Vamos personalizar a página do evento do seu bebê</h4>
//         </div>
//         <div className="form justify-content-center">
//           <Row align="middle">
//             <Col span={6}>
//               <label>Data do Evento</label>
//             </Col>
//             <Col span={18}>
//               <DatePicker
//                 onChange={(date, dateString) => {
//                   this.setState({ date: dateString });
//                 }}
//                 format="DD/MM/YYYY"
//                 locale={locale}
//                 placeholder={"--/--/--"}
//               />
//             </Col>
//           </Row>
//           <Row align="middle">
//             <Col span={6}>
//               <label>Horário do Evento</label>
//             </Col>
//             <Col span={18}>
//               <TimePicker
//                 onChange={(date, dateString) => {
//                   this.setState({ hour: dateString });
//                 }}
//                 locale={locale}
//                 placeholder={"hh:mm"}
//               />
//             </Col>
//           </Row>
//           <Row align="middle">
//             <Col span={6}>
//               <label>Tipo do Evento</label>
//             </Col>
//             <Col span={18}>
//               <Select
//                 placeholder="Selecione"
//                 onChange={(value) => this.setState({ type: value })}
//               >
//                 <Option value="revelation">Chá Revelação</Option>
//                 <Option value="diaper">Chá de Fralda</Option>
//                 <Option value="baby">Chá de Bebê</Option>
//                 <Option value="baptize">Batizado</Option>
//                 <Option value="birth_day">Aniversário</Option>
//               </Select>
//             </Col>
//           </Row>
//           <Row align="middle">
//             <Col span={6}>
//               <label>Local do Evento</label>
//             </Col>
//             <Col span={18}>
//               <Input
//                 onChange={(e) => {
//                   this.setState({ address: e.target.value });
//                 }}
//                 placeholder={"Fortaleza"}
//               />
//             </Col>
//           </Row>
//           <Row align="middle">
//             <Col span={6}>
//               <label>URL da Live</label>
//             </Col>
//             <Col span={18}>
//               <Input
//                 onChange={(e) => {
//                   this.setState({ live: e.target.value });
//                 }}
//                 placeholder={""}
//               />
//             </Col>
//           </Row>
//           <Row align="middle">
//             <Col span={6}>
//               <label>Já sabe o nome do seu bebê?</label>
//             </Col>
//             <Col style={{ textAlign: "center" }} span={18}>
//               <Radio.Group
//                 onChange={(e) => {
//                   this.setState({ dontKnowName: e.target.value });
//                 }}
//               >
//                 <Radio value={true}>Não sei ainda</Radio>
//               </Radio.Group>
//             </Col>
//           </Row>
//           <Row align="middle">
//             <Col span={6}>
//               <label>Nome do Bebê</label>
//             </Col>
//             <Col span={18}>
//               <Input
//                 onChange={(e) => {
//                   this.setState({ babyName: e.target.value });
//                 }}
//                 placeholder={""}
//               />
//             </Col>
//           </Row>
//           <Row align="middle">
//             <Col span={6}>
//               <label>Data de Nascimento do Bebê</label>
//             </Col>
//             <Col span={18}>
//               <DatePicker
//                 onChange={(date, dateString) => {
//                   this.setState({ babyBirth: dateString });
//                 }}
//                 format="DD/MM/YYYY"
//                 locale={locale}
//                 placeholder={"--/--/--"}
//               />
//             </Col>
//           </Row>

//           <button onClick={() => this.next()} className="btn btn-secondary">
//             AVANÇAR
//           </button>
//         </div>
//       </div>
//     );
//   }
// }
