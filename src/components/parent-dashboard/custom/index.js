import React, { Component } from "react";
import { Row, Col, Radio, Input, Upload, Button, Modal } from "antd";
import "./style.scss";
import { Constants } from "../../../constants";
import axios from "axios";

export default class CustomParent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      theme: props.event.theme,
      historyText: props.event.history_text,
      phone: props.event.phone,
      inviteText: props.event.invite_text,
      url: props.event.url,
      validUrl: false,
      baby_image: null,
      fileBaby: [],
      mom_name: props.event.mom_name,
      mom_image: null,
      fileMom: [],
      dad_name: props.event.dad_name,
      dad_image: null,
      fileDad: [],
      background_image: null,
      fileBack: [],
      loading: false,
    };
    console.log("event", props.event);
  }

  dummyRequest = ({ file, onSuccess }) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  };

  getBase64(file, cb) {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      cb(reader.result);
    };
    reader.onerror = function (error) {
      console.log("Error: ", error);
    };
  }

  save = async () => {
    const event = this.props.event;
    if (
      this.state.theme == "" ||
      this.state.historyText == "" ||
      this.state.url == "" ||
      this.state.mom_name == "" ||
      this.state.dad_name == "" ||
      this.state.phone == "" ||
      this.state.inviteText == ""
    ) {
      Modal.error({
        content: "Campos vazios.",
      });
      return;
    }

    let user = await JSON.parse(localStorage.getItem("user"));
    this.setState({ loading: true });

    axios
      .patch(
        Constants.ApiUrl + "events/" + event.id + "/edit",
        {
          date: event.date,
          type: event.type,
          hour: event.hour,
          address: event.address,
          phone: this.state.phone,
          baby_name: event.baby_name,
          baby_birthday: event.baby_birthday,
          theme: this.state.theme,
          history_text: this.state.historyText,
          invite_text: this.state.inviteText,
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
        this.setState({ loading: false });
        Modal.success({
          content: "Personalização salva!",
        });
      })
      .catch((error) => {
        this.setState({ loading: false });
        Modal.error({
          content: "Erro ao salvar.",
        });
        console.log(error);
      });
  };

  render() {
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
                  onChange={(e) => this.setState({ theme: e.target.value })}
                  value={this.state.theme}
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
                onChange={(e) => this.setState({ historyText: e.target.value })}
                value={this.state.historyText}
                style={{ marginTop: 10 }}
                placeholder={"Escrever..."}
              />
            </Col>
          </Row>
          {/* <img
                        className={'mb-3'}
                        src={this.props.event.baby_image_url} />
                    <Row align="middle">
                        <Col span={6}>
                            <label>Foto do Bebê</label>
                        </Col>
                        <Col span={18}>
                            <Upload name="file" customRequest={this.dummyRequest}
                                multiple={false} showUploadList={false}
                                beforeUpload={(file) => {
                                    let filedata = '';
                                    this.getBase64(file, (result) => {
                                        filedata = result;
                                        this.setState({ baby_image: filedata, fileBaby: [file] })
                                    });
                                }}>
                                <Button>
                                    {this.state.fileBaby && this.state.fileBaby[0] && this.state.fileBaby[0].name ? this.state.fileBaby[0].name : 'Escolher...'}
                                </Button>
                            </Upload>
                        </Col>
                    </Row>
                    <img
                        className={'mb-3'}
                        src={this.props.event.mom_image_url} />
                    <Row align="middle">
                        <Col span={6}>
                            <label>Foto da Mamãe</label>
                        </Col>
                        <Col span={18} className="d-flex">
                            <Upload name="file" customRequest={this.dummyRequest}
                                multiple={false} showUploadList={false}
                                beforeUpload={(file) => {
                                    let filedata = '';
                                    this.getBase64(file, (result) => {
                                        filedata = result;
                                        this.setState({ mom_image: filedata, fileMom: [file] })
                                    });
                                }}>
                                <Button>
                                    {this.state.fileMom && this.state.fileMom[0] && this.state.fileMom[0].name ? this.state.fileMom[0].name : 'Escolher...'}
                                </Button>
                            </Upload>
                        </Col>
                    </Row>
                    <Row align="middle">
                        <Col span={6}>
                            <label>Nome da Mamãe</label>
                        </Col>
                        <Col span={18}>
                            <Input value={this.state.mom_name}
                                onChange={(e) => { this.setState({ mom_name: e.target.value }) }}
                                placeholder={""} />
                        </Col>
                    </Row>
                    <img
                        className={'mb-3'}
                        src={this.props.event.dad_image_url} />
                    <Row align="middle">
                        <Col span={6}>
                            <label>Foto do Papai</label>
                        </Col>
                        <Col span={18} className="d-flex">
                            <Upload name="file" customRequest={this.dummyRequest}
                                multiple={false} showUploadList={false}
                                beforeUpload={(file) => {
                                    let filedata = '';
                                    this.getBase64(file, (result) => {
                                        filedata = result;
                                        this.setState({ dad_image: filedata, fileDad: [file] })
                                    });
                                }}>
                                <Button>
                                    {this.state.fileDad && this.state.fileDad[0] && this.state.fileDad[0].name ? this.state.fileDad[0].name : 'Escolher...'}
                                </Button>
                            </Upload>
                        </Col>
                    </Row>
                    <Row align="middle">
                        <Col span={6}>
                            <label>Nome do Papai</label>
                        </Col>
                        <Col span={18}>
                            <Input value={this.state.dad_name}
                                onChange={(e) => { this.setState({ dad_name: e.target.value }) }}
                                placeholder={""} />
                        </Col>
                    </Row>
                    <img
                        className={'mb-3'}
                        src={this.props.event.background_image_url} />
                    <Row align="middle">
                        <Col span={6}>
                            <label>Foto do Fundo</label>
                        </Col>
                        <Col span={18}>
                            <Upload name="file" customRequest={this.dummyRequest}
                                multiple={false} showUploadList={false}
                                beforeUpload={(file) => {
                                    let filedata = '';
                                    this.getBase64(file, (result) => {
                                        filedata = result;
                                        this.setState({ background_image: filedata, fileBack: [file] })
                                    });
                                }}>
                                <Button>
                                    {this.state.fileBack && this.state.fileBack[0] && this.state.fileBack[0].name ? this.state.fileBack[0].name : 'Escolher...'}
                                </Button>
                            </Upload>
                        </Col>
                    </Row> */}
          <Row align="middle">
            <Col span={6}>
              <label>Tel. de Contato</label>
            </Col>
            <Col span={18}>
              <Input
                onChange={(e) => this.setState({ phone: e.target.value })}
                value={this.state.phone}
                placeholder={"(85) 99999-9999"}
              />
            </Col>
          </Row>
          <Row align="middle">
            <Col span={24}>
              <label>Escreva um textinho para chamar os convidados</label>
              <Input.TextArea
                onChange={(e) => this.setState({ inviteText: e.target.value })}
                value={this.state.inviteText}
                style={{ marginTop: 10 }}
                placeholder={"Escrever..."}
              />
            </Col>
          </Row>

          <Button
            loading={this.state.loading}
            onClick={() => this.save()}
            className="btn btn-secondary"
          >
            SALVAR
          </Button>
        </div>
      </div>
    );
  }
}
