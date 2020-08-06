import React, { Component } from 'react';
import "./style.scss";
import { Row, Col } from 'antd';
import HomeParent from '../../../components/parent-dashboard/home';
import {
    HomeOutlined,
    SettingFilled,
    GiftFilled,
    PictureOutlined,
    UserOutlined,
    HighlightOutlined
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
export default class ParentDashboard extends Component {

    render() {
        console.log(this.props);
        return (
            <Row id="parent-dashboard">
                <Col span={5} className="leftColumn d-flex flex-column align-items-center">
                    <img src={require("../../../assets/images/logo-white.png")} />
                    <div className="d-flex flex-column justify-content-center align-items-center">
                        <div>
                            <p className="menu-title">MEU EVENTO &lt;3</p>
                            <Link to={'/parent-home'}>
                                <div className={"link " + (this.props.location.pathname == "/parent-home" ? "active" : "")}>
                                    <HomeOutlined className="mr-3" />
                                Início
                                </div>
                            </Link>
                            <Link to={'/parent-config'}>
                                <div className={"link " + (this.props.location.pathname == "/parent-config" ? "active" : "")}>
                                    <SettingFilled className="mr-3" />
                                    Configurações
                                </div>
                            </Link>
                            <Link to={'/parent-gallery'}>
                                <div className={"link " + (this.props.location.pathname == "/parent-gallery" ? "active" : "")}>
                                    <PictureOutlined className="mr-3" />
                                    Galeria
                                </div>
                            </Link>
                            <Link to={'/parent-gifts'}>
                                <div className={"link " + (this.props.location.pathname == "/parent-gifts" ? "active" : "")}>
                                    <GiftFilled className="mr-3" />
                                    Lista de Presentes
                                </div>
                            </Link>
                            <Link to={'/parent-personal'}>
                                <div className={"link " + (this.props.location.pathname == "/parent-personal" ? "active" : "")}>
                                    <UserOutlined className="mr-3" />
                                    Dados Pessoais
                                </div>
                            </Link>
                            <Link to={'/parent-custom'}>
                                <div className={"link " + (this.props.location.pathname == "/parent-custom" ? "active" : "")}>
                                    <HighlightOutlined className="mr-3" />
                                    Personalizar
                                </div>
                            </Link>

                            <button class="btn btn-secondary d-flex align-items-center">
                                LOJA BELLE MAN <img src={require("../../../assets/images/enter.png")} />
                            </button>
                        </div>
                    </div>
                </Col>
                <Col span={19}>
                    {this.props.children}
                </Col>
            </Row>
        );
    }
}
