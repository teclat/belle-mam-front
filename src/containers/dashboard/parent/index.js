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
import { Link, Switch, Route } from 'react-router-dom';
import ConfigParent from '../../../components/parent-dashboard/config';
import CustomParent from '../../../components/parent-dashboard/custom';
import GalleryParent from '../../../components/parent-dashboard/gallery';
import GiftListParent from '../../../components/parent-dashboard/gift-list';
import PersonalParent from '../../../components/parent-dashboard/personal';
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
                            <Link to={'/parents/home'}>
                                <div className={"link " + (this.props.location.pathname == "/parents/home" ? "active" : "")}>
                                    <HomeOutlined className="mr-3" />
                                Início
                                </div>
                            </Link>
                            <Link to={'/parents/config'}>
                                <div className={"link " + (this.props.location.pathname == "/parents/config" ? "active" : "")}>
                                    <SettingFilled className="mr-3" />
                                    Configurações
                                </div>
                            </Link>
                            <Link to={'/parents/gallery'}>
                                <div className={"link " + (this.props.location.pathname == "/parents/gallery" ? "active" : "")}>
                                    <PictureOutlined className="mr-3" />
                                    Galeria
                                </div>
                            </Link>
                            <Link to={'/parents/gifts'}>
                                <div className={"link " + (this.props.location.pathname == "/parents/gifts" ? "active" : "")}>
                                    <GiftFilled className="mr-3" />
                                    Lista de Presentes
                                </div>
                            </Link>
                            <Link to={'/parents/personal'}>
                                <div className={"link " + (this.props.location.pathname == "/parents/personal" ? "active" : "")}>
                                    <UserOutlined className="mr-3" />
                                    Dados Pessoais
                                </div>
                            </Link>
                            <Link to={'/parents/custom'}>
                                <div className={"link " + (this.props.location.pathname == "/parents/custom" ? "active" : "")}>
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
                    <Switch>
                        <div>
                            <Route path={`${this.props.match.path}/home`} component={HomeParent} />
                            <Route path={`${this.props.match.path}/config`} component={ConfigParent} />
                            <Route path={`${this.props.match.path}/gallery`} component={GalleryParent} />
                            <Route path={`${this.props.match.path}/gifts`} component={GiftListParent} />
                            <Route path={`${this.props.match.path}/custom`} component={CustomParent} />
                            <Route path={`${this.props.match.path}/personal`} component={PersonalParent} />
                        </div>
                    </Switch>
                </Col>
            </Row>
        );
    }
}
