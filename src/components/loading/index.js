import React, { useState } from "react";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import "./style.scss";

function Loading(props) {
  const antIcon = <LoadingOutlined className="loading-svg" spin />;
  return (
    <div
      className="loaging-container"
      style={{ display: props.isLoading ? "" : "none" }}
    >
      <Spin indicator={antIcon} />
    </div>
  );
}

export default Loading;
