import React, { Component } from "react";
import "./style.scss";
import { Upload, Modal } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Constants } from "../../../constants";
import axios from "axios";

export default class GalleryParent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      previewVisible: false,
      previewImage: "",
      previewTitle: "",
      fileList: [],
    };
    this.getImages();
  }

  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await this.getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
      previewTitle: "",
    });
  };

  handleChange = ({ fileList }) => this.setState({ fileList });

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

  remove = async (file) => {
    let user = await JSON.parse(await localStorage.getItem("user"));

    axios
      .post(
        Constants.ApiUrl + "gallery/remove",
        {
          event_id: this.props.event.id,
          id: file.uid,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        Modal.success({ content: "Imagem deletada" });
        this.getImages();
      })
      .catch((error) => {
        Modal.error({ content: "Erro ao deletar" });
        console.log(error);
      });
  };

  getImages = async () => {
    let user = await JSON.parse(await localStorage.getItem("user"));

    axios
      .post(
        Constants.ApiUrl + "gallery/event",
        {
          event_id: this.props.event.id,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        let images = response.data.map((img) => {
          return {
            uid: img.id,
            name: "",
            url: img.image_url,
            event_id: img.event_id,
            status: "done",
          };
        });
        this.setState({ fileList: images });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  addImage = async ({ file, onSuccess }) => {
    let user = await JSON.parse(await localStorage.getItem("user"));
    this.setState({ loading: true });

    let filedata = "";
    this.getBase64(file, (result) => {
      filedata = result;
      axios
        .post(
          Constants.ApiUrl + "gallery/create",
          {
            event_id: this.props.event.id,
            image: filedata,
          },
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        )
        .then((response) => {
          console.log(response.data);
          onSuccess("ok");
          Modal.success({
            content: "Imagem salva!",
          });
        })
        .catch((error) => {
          Modal.error({
            content: "Erro ao salvar.",
          });
          console.log(error);
        });
    });
  };

  render() {
    const { previewVisible, previewImage, fileList, previewTitle } = this.state;
    const uploadButton = (
      <div>
        <PlusOutlined />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <div
        id="gallery-parent"
        className="d-flex flex-column justify-content-center align-items-center"
      >
        <div className="title-box">
          <h4>Galeria</h4>
        </div>
        <div className="clearfix">
          <Upload
            customRequest={this.addImage}
            listType="picture-card"
            fileList={fileList}
            onPreview={this.handlePreview}
            onRemove={this.remove}
            onChange={this.handleChange}
          >
            {fileList.length >= 8 ? null : uploadButton}
          </Upload>
          <Modal
            visible={previewVisible}
            title={previewTitle}
            footer={null}
            onCancel={this.handleCancel}
          >
            <img alt="example" style={{ width: "100%" }} src={previewImage} />
          </Modal>
        </div>
      </div>
    );
  }
}
