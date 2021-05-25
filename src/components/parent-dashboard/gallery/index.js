import React, { Component } from "react";
import "./style.scss";
import { Upload, Modal } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Constants } from "../../../constants";
import axios from "axios";
import { useState } from "react";
import Loading from "../../loading";

function GalleryParent(props) {
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState(false);
  const [previewTitle, setPreviewTitle] = useState(false);
  const [fileList, setFileList] = useState(false);
  const [isLoading, setIsloading] = useState(false);

  //const { previewVisible, previewImage, fileList, previewTitle } = this.state;
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div className="ant-upload-text">Upload</div>
    </div>
  );

  React.useEffect(() => {
    getImages();
  }, []);

  const getImages = async () => {
    let user = await JSON.parse(localStorage.getItem("user"));

    axios
      .post(
        Constants.ApiUrl + "gallery/event",
        {
          event_id: props.event.id,
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
        //this.setState({ fileList: images });
        setFileList(images);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleCancel = () => setPreviewVisible(false);

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    // this.setState({
    //   previewImage: file.url || file.preview,
    //   previewVisible: true,
    //   previewTitle: "",
    // });
    setPreviewImage(file.url || file.preview);
    setPreviewVisible(true);
    setPreviewTitle("");
  };

  // this.setState({ fileList })
  const handleChange = (fileList) => setFileList(fileList);

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

  const remove = async (file) => {
    let user = await JSON.parse(localStorage.getItem("user"));

    axios
      .post(
        Constants.ApiUrl + "gallery/remove",
        {
          event_id: props.event.id,
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
        getImages();
      })
      .catch((error) => {
        Modal.error({ content: "Erro ao deletar" });
        console.log(error);
      });
  };

  const addImage = async ({ file, onSuccess }) => {
    let user = await JSON.parse(localStorage.getItem("user"));
    //this.setState({ loading: true });
    setIsloading(true);
    let filedata = "";
    getBase64(file, (result) => {
      filedata = result;
      axios
        .post(
          Constants.ApiUrl + "gallery/create",
          {
            event_id: props.event.id,
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
            onOk: setIsloading(false),
          });
        })
        .catch((error) => {
          Modal.error({
            content: "Erro ao salvar.",
            onOk: setIsloading(false),
          });
          console.log(error);
        });
    });
  };

  return (
    <>
      {isLoading === true ? (
        <Loading isLoading={isLoading} />
      ) : (
        <div
          id="gallery-parent"
          className="d-flex flex-column justify-content-center align-items-center"
        >
          <div className="title-box">
            <h4>Galeria</h4>
          </div>
          <div className="clearfix">
            <Upload
              customRequest={addImage}
              listType="picture-card"
              fileList={fileList}
              onPreview={handlePreview}
              onRemove={remove}
              onChange={handleChange}
            >
              {fileList.length >= 8 ? null : uploadButton}
            </Upload>
            <Modal
              visible={previewVisible}
              title={previewTitle}
              footer={null}
              onCancel={handleCancel}
            >
              <img alt="example" style={{ width: "100%" }} src={previewImage} />
            </Modal>
          </div>
        </div>
      )}
    </>
  );
}

export default GalleryParent;
