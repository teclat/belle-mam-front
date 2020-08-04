import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import NotFound from './containers/404';
import Home from './containers/home';
import Invite from './containers/invite';
import Register from './containers/register';
import Login from './containers/login';

export default () => {
    return (
        <BrowserRouter basename="/">
            <Switch>
                <Route path="/" exact={true} component={Home} />
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
                <Route path="/invite" component={Invite} />
                <Route path="*" component={NotFound}></Route>
            </Switch>
        </BrowserRouter>
    );
};