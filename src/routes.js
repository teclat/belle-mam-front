import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import NotFound from './containers/404';
import Home from './containers/home';
import Invite from './containers/invite';

export default () => {
    return (
        <BrowserRouter basename="/">
            <Switch>
                <Route path="/" exact={true} component={Home} />
                <Route path="/invite" component={Invite} />
                <Route path="*" component={NotFound}></Route>
            </Switch>
        </BrowserRouter>
    );
};