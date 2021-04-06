import React, { Component } from "react";
import { Row, Col } from "antd";
import "./style.scss";
import { Constants } from "../../../constants";
import axios from "axios";

export default class NotesParent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [],
    };
    this.get();
  }

  get = async () => {
    let user = await JSON.parse(localStorage.getItem("user"));

    axios
      .post(
        Constants.ApiUrl + "notes/event",
        { event_id: this.props.event.id },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        this.setState({
          notes: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    return (
      <div id="notes" className="d-flex flex-column align-items-center">
        <div className="d-flex justify-content-center align-items-center title-box">
          <h4 className="text-center">Todos Recados</h4>
        </div>

        {this.state.notes.map((note) => {
          return (
            <div key={note.id} className="note d-flex align-items-center">
              <Col span={6} class="note-img mr-5">
                <img className="note-img" src={note.user.image_url} />
              </Col>
              <Col span={18}>
                <h3 className={"mb-3"}>{note.user.name}</h3>
                <p>{note.text}</p>
              </Col>
            </div>
          );
        })}
      </div>
    );
  }
}
