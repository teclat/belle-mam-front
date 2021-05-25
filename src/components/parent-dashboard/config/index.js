import React, { Component } from "react";
import moment from "moment";
import { Row, Col, Modal, Input, DatePicker, TimePicker, Button } from "antd";
import locale from "antd/es/date-picker/locale/pt_BR";
import { Constants } from "../../../constants";
import axios from "axios";

import "./style.scss";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteEventRequest } from "../../../redux/actions/eventsActions";
import { useHistory } from "react-router";
import Loading from "../../loading";

function ConfigParent(props) {
  const [date, setDate] = useState(moment(props.event.date));
  const [dateString, setDateString] = useState(
    moment(props.event.date).format("DD/MM/YYYY")
  );
  const [hour, setHour] = useState(
    moment("2020-10-01T" + props.event.hour + ".000Z")
  );
  const [hourString, setHourString] = useState(props.event.hour);
  const [address, setAddress] = useState(props.event.address);
  const [live, setLive] = useState(props.event.url);
  const [babyName, setBabyName] = useState(props.event.baby_name);
  const [babyBirthday, setBabyBirthday] = useState(
    moment(props.event.baby_birthday)
  );
  const [babyBirthdayString, setBabyBirthdayString] = useState(
    moment(props.event.baby_birthday).format("DD/MM/YYYY")
  );
  const [isLoading, setIsLoading] = useState(false);
  //const [shouldRedirect, setShouldRedirect] = useState(false);

  const dispatch = useDispatch();

  React.useEffect(() => {
    console.log("TEST PROPS", props);
    console.log("event", props.event);
    console.log("bay birthday", babyBirthdayString);
    console.log("date", dateString);
  }, []);

  const deleteEvent = async (user) => {
    await dispatch(deleteEventRequest(user, props.event));
    await setTimeout(() => {
      window.location.href = `/parents/home`;
    }, 2000);
  };

  const handleDelete = async () => {
    let user = await JSON.parse(localStorage.getItem("user"));
    Modal.confirm({
      title: "Atenção!",
      content:
        "Tem certeza de que quer excluir este evento? Esta ação não pode ser desfeita.",
      onOk() {
        deleteEvent(user);
      },
      onCancel() {
        return;
      },
    });
  };

  const save = async () => {
    const event = props.event;
    if (
      dateString === "" ||
      hourString === "" ||
      address === "" ||
      babyName === "" ||
      babyBirthdayString === ""
    ) {
      Modal.warning({
        content: "Campos vazios.",
      });
      return;
    }

    let user = await JSON.parse(localStorage.getItem("user"));

    setIsLoading(true);

    let date = dateString.split("/");
    let babyBirth = babyBirthdayString.split("/");

    axios
      .patch(
        Constants.ApiUrl + "events/" + event.id + "/edit",
        {
          date: date[2] + "-" + date[1] + "-" + date[0],
          type: event.type,
          hour: hourString,
          address: address,
          phone: event.phone,
          live: live,
          baby_name: babyName,
          baby_birthday: babyBirth[2] + "-" + babyBirth[1] + "-" + babyBirth[0],
          theme: event.theme,
          history_text: event.history_text,
          invite_text: event.invite_text,
          url: event.url,
          baby_image: event.baby_image,
          mom_image: event.mom_image,
          dad_image: event.dad_image,
          background_image: event.background_image,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        setIsLoading(false);

        Modal.success({
          content: "Configurações salvas!",
        });
      })
      .catch((error) => {
        setIsLoading(false);

        Modal.error({
          content: "Erro ao salvar.",
        });
        console.log(error);
      });
  };

  return (
    <>
      {isLoading === true ? (
        <Loading isLoading={isLoading} />
      ) : (
        <div id="config-parent">
          <div className="d-flex flex-column justify-content-center align-items-center title-box">
            <h4>Configurações</h4>
          </div>
          <div className="form justify-content-center">
            <Row align="middle">
              <Col span={6}>
                <label>Data do Evento</label>
              </Col>
              <Col span={18}>
                <DatePicker
                  onChange={(date, dateString) => {
                    setDate(date);
                    setDateString(dateString);
                  }}
                  value={date}
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
                    setHour(date);
                    setHourString(dateString);
                  }}
                  value={hour}
                  locale={locale}
                  placeholder={"hh:mm"}
                />
              </Col>
            </Row>
            <Row align="middle">
              <Col span={6}>
                <label>Local do Evento</label>
              </Col>
              <Col span={18}>
                <Input
                  onChange={(e) => setAddress(e.target.value)}
                  value={address}
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
                  onChange={(e) => setLive(e.target.value)}
                  value={live}
                  placeholder={"cha-bebe-belle-mam"}
                />
              </Col>
            </Row>
            <Row align="middle">
              <Col span={6}>
                <label>Nome do Bebê</label>
              </Col>
              <Col span={18}>
                <Input
                  onChange={(e) => setBabyName(e.target.value)}
                  value={babyName}
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
                    setBabyBirthday(date);
                    setBabyBirthdayString(dateString);
                  }}
                  value={babyBirthday}
                  format="DD/MM/YYYY"
                  locale={locale}
                  placeholder={"--/--/--"}
                />
              </Col>
            </Row>
            <div className="config-buttons-container">
              <Button
                loading={isLoading}
                onClick={() => save()}
                className="btn btn-secondary"
              >
                SALVAR
              </Button>

              <Button
                loading={isLoading}
                onClick={() => handleDelete()}
                className="btn btn-secondary"
              >
                DELETAR
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ConfigParent;
