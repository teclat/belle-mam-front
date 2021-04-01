import React, { Component } from "react";
import { Modal, Button } from "antd";
import "./style.scss";
import { WhatsAppOutlined } from "@ant-design/icons";
import { Constants } from "../../../constants";
import axios from "axios";
export default class GiftList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      showGift: false,
      gift: {},
    };
  }

  gift = async () => {
    let user = await JSON.parse(await localStorage.getItem("user"));

    if (!user) {
      Modal.error({
        content:
          "Cadastre-se e entre na sua conta para poder enviar um recado.",
      });
      return;
    }

    this.setState({ loading: true });

    axios
      .post(
        Constants.ApiUrl + "events/give-gift",
        {
          user_id: user.id,
          event_id: this.props.event.id,
          product_id: this.state.gift.id,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        this.setState({ loading: false, showGift: false });
        Modal.success({
          content: "Presente dado!",
        });
      })
      .catch((error) => {
        this.setState({ loading: false, showGift: false });
        Modal.error({
          content: "Erro ao presentear.",
        });
        console.log(error);
      });
  };

  render() {
    return (
      <section
        id="present-list"
        class={
          this.props.event.theme == "green" ? "invite-green" : "invite-purple"
        }
      >
        <div class="d-flex justify-content-center align-items-center invite-title-box">
          <h2>Lista de Presentes</h2>
          <img src={require("../../../assets/images/white-heart.png")} />
        </div>
        <ul class="d-flex flex-row justify-content-around">
          {this.props.event && this.props.event.products
            ? this.props.event.products.map((product) => {
                return (
                  <li
                    key={product.id}
                    class="d-flex flex-column justify-content-around align-items-center"
                  >
                    <img src={product.image_url} />
                    <p class="text">{product.name}</p>
                    <p class="money">R$ {product.price}</p>
                    <button
                      onClick={() => {
                        this.setState({ showGift: true, gift: product });
                      }}
                      class={
                        "btn " +
                        (this.props.event.theme == "green"
                          ? "btn-secondary"
                          : "btn-primary")
                      }
                    >
                      DAR PRESENTE!
                    </button>
                  </li>
                );
              })
            : null}
        </ul>
        <div class="d-flex flex-row justify-content-center">
          {/* <button class="btn btn-outline">VER MAIS</button> */}
          <a
            target={"_blank"}
            href="https://api.whatsapp.com/send?phone='5585981768451'&text=%20Oi, tudo bem. Pode me ajudar?%20"
            className="btn btn-outline d-flex align-items-center justify-content-around"
          >
            <WhatsAppOutlined className="mr-3" />
            FALAR COM A LOJA
          </a>
        </div>
        <Modal
          onCancel={() => this.setState({ showGift: false })}
          title="Presentear"
          visible={this.state.showGift}
          footer={[
            <Button
              key="back"
              onClick={() =>
                this.setState({
                  showGift: false,
                })
              }
            >
              Cancelar
            </Button>,
            <Button
              key="submit"
              type="primary"
              loading={this.state.loading}
              onClick={this.gift}
            >
              Presentear
            </Button>,
          ]}
        >
          <p>Você quer presentear com tal produto?</p>
        </Modal>
      </section>
    );
  }
}
