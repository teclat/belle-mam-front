import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import NotFound from './containers/404';
import Home from './containers/home';
import Invite from './containers/invite';
import Register from './containers/register';
import Login from './containers/login';
import FirstStep from './containers/first-steps';
import ParentDashboard from './containers/dashboard/parent';
import WhyBelleMam from './containers/why-belle-mam';
import Partners from './containers/partners';
import GuestDashboard from './containers/dashboard/guest';
import AdminDashboard from './containers/dashboard/admin';

export default () => {
    return (
        <BrowserRouter
            basename="/">
            <Switch>
                <Route path="/" exact={true} component={Home} />
                <Route path="/home" component={Home} />
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
                <Route path="/first-steps" component={FirstStep} />
                <Route path="/invite/:url" component={Invite} />
                <Route path="/why" component={WhyBelleMam} />
                <Route path="/partners" component={Partners} />
                <Route path="/parents" component={ParentDashboard} />
                <Route path="/guest" component={GuestDashboard} />
                <Route path="/admin" component={AdminDashboard} />
                <Route path="*" component={NotFound}></Route>
            </Switch>
        </BrowserRouter>
    );
};