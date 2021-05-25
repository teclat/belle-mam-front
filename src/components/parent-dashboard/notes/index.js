import React, { Component } from "react";
import { Row, Col } from "antd";
import "./style.scss";
import { Constants } from "../../../constants";
import axios from "axios";
import { useState } from "react";
import Loading from "../../loading";

function NotesParent(props) {
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsloading] = useState(true);

  React.useEffect(() => {
    getNotes();
  }, []);

  const getNotes = async () => {
    let user = await JSON.parse(localStorage.getItem("user"));
    setIsloading(true);
    axios
      .post(
        Constants.ApiUrl + "notes/event",
        { event_id: props.event.id },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        setNotes(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    setIsloading(false);
  };
  return (
    <div id="notes" className="d-flex flex-column align-items-center">
      <div className="d-flex justify-content-center align-items-center title-box">
        <h4 className="text-center">Todos Recados</h4>
      </div>
      {isLoading === true ? (
        <Loading isLoading={isLoading} />
      ) : (
        <div>
          {notes
            .slice(0)
            .reverse()
            .map((note) => {
              return (
                <div key={note.id} className="note d-flex align-items-center">
                  <Col span={6} class="note-img mr-5">
                    <img
                      className="note-img"
                      src={note.user.image_url}
                      alt=""
                    />
                  </Col>
                  <Col span={18}>
                    <h3 className={"mb-3"}>{note.user.name}</h3>
                    <p>{note.text}</p>
                  </Col>
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
}

export default NotesParent;
