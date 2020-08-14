import React, { Component } from 'react';
import "./style.scss";
import { Row, Col, Button } from 'antd';
import HomeParent from '../../../components/parent-dashboard/home';
import {
    HomeOutlined,
    SettingFilled,
    GiftFilled,
    PictureOutlined,
    UserOutlined,
    HighlightOutlined
} from '@ant-design/icons';
import { Constants } from '../../../constants';
import axios from "axios";
import { Link, Switch, Route } from 'react-router-dom';
import ConfigParent from '../../../components/parent-dashboard/config';
import CustomParent from '../../../components/parent-dashboard/custom';
import GalleryParent from '../../../components/parent-dashboard/gallery';
import GiftListParent from '../../../components/parent-dashboard/gift-list';
import PersonalParent from '../../../components/parent-dashboard/personal';
import NotesParent from '../../../components/parent-dashboard/notes';
import GiftedsParent from '../../../components/parent-dashboard/gifteds';
export default class ParentDashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            event: {}
        }
        this.get();
    }

    logout = async () => {
        await localStorage.removeItem("user");
        this.props.history.push('/');
    }

    get = async () => {
        let user = JSON.parse(await localStorage.getItem("user"));
        console.log("user", user)

        axios.get(Constants.ApiUrl + 'events/' + user.id, {
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })
            .then((response) => {
                console.log("event", response.data)
                let event = response.data.length > 0 ? response.data[0] : null;
                this.setState({
                    event: event
                })
            })
            .catch((error) => {
                console.log(error);
            })
    }

    render() {
        let url = "https://belle-mam.herokuapp.com/convite/" + this.state.event.url
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
                                <div className={"link d-flex align-items-center " + (this.props.location.pathname == "/parents/config" ? "active" : "")}>
                                    <img style={{ width: 20 }} className="mr-3" src={require("../../../assets/images/settings.png")} />
                                    Configurações
                                </div>
                            </Link>
                            <Link to={'/parents/gallery'}>
                                <div className={"link d-flex align-items-center " + (this.props.location.pathname == "/parents/gallery" ? "active" : "")}>
                                    <img style={{ width: 20 }} className="mr-3" src={require("../../../assets/images/gallery.png")} />
                                    Galeria
                                </div>
                            </Link>
                            <Link to={'/parents/gifts'}>
                                <div className={"link d-flex align-items-center " + (this.props.location.pathname == "/parents/gifts" ? "active" : "")}>
                                    <img style={{ width: 20 }} className="mr-3" src={require("../../../assets/images/gift-white.png")} />
                                    Lista de Presentes
                                </div>
                            </Link>
                            <Link to={'/parents/personal'}>
                                <div className={"link d-flex align-items-center " + (this.props.location.pathname == "/parents/personal" ? "active" : "")}>
                                    <img style={{ width: 20 }} className="mr-3" src={require("../../../assets/images/user-white.png")} />
                                    Dados Pessoais
                                </div>
                            </Link>
                            <Link to={'/parents/custom'}>
                                <div className={"link d-flex align-items-center " + (this.props.location.pathname == "/parents/custom" ? "active" : "")}>
                                    <img style={{ width: 20 }} className="mr-3" src={require("../../../assets/images/paint-brush-white.png")} />
                                    Personalizar
                                </div>
                            </Link>

                            <button className="btn btn-secondary d-flex align-items-center">
                                LOJA BELLE MAN <img src={require("../../../assets/images/enter.png")} />
                            </button>
                        </div>
                    </div>
                </Col>
                <Col span={19}>
                    <div className={"exit-row d-flex mt-3 justify-content-between align-items-center ml-3 mr-3"}>
                        <p>PAINEL PRINCIPAL</p>
                        {this.state.event && this.state.event.url ?
                            <a target="_blank" href={url}>
                                IR PARA O CONVITE
                            </a> : null
                        }
                        <div onClick={() => this.logout()} className={"d-flex align-items-center exit"}>
                            <p className={"mr-3"}>SAIR</p>
                            <img style={{ width: 20 }} src={require("../../../assets/images/enter-purple.png")} />
                        </div>
                    </div>
                    {
                        this.state.event ?
                            <Switch>
                                <div>
                                    <Route path={`${this.props.match.path}/home`} component={() => <HomeParent event={this.state.event} />} />
                                    <Route path={`${this.props.match.path}/config`} component={() => <ConfigParent event={this.state.event} />} />
                                    <Route path={`${this.props.match.path}/gallery`} component={() => <GalleryParent event={this.state.event} />} />
                                    <Route path={`${this.props.match.path}/gifts`} component={() => <GiftListParent event={this.state.event} />} />
                                    <Route path={`${this.props.match.path}/custom`} component={() => <CustomParent event={this.state.event} />} />
                                    <Route path={`${this.props.match.path}/personal`} component={() => <PersonalParent event={this.state.event} />} />
                                    <Route path={`${this.props.match.path}/notes`} component={() => <NotesParent event={this.state.event} />} />
                                    <Route path={`${this.props.match.path}/gifteds`} component={() => <GiftedsParent event={this.state.event} />} />
                                </div>
                            </Switch> : (
                                <div id="no-event" className={'d-flex flex-column align-items-center'}>
                                    <h3 className="mb-5 mt-5">Crie um evento para acessar tais funcionalidades.</h3>
                                    <Link to="/first-steps">
                                        <Button className="btn btn-secondary d-flex align-items-center">
                                            CRIAR EVENTO
                                        </Button>
                                    </Link>
                                </div>
                            )
                    }
                </Col>
            </Row>
        );
    }
}
