import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import NotFound from './containers/404';
import Home from './containers/home';
import Invite from './containers/invite';
import Register from './containers/register';
import Login from './containers/login';
import FirstStep from './containers/first-steps';
import ParentDashboard from './containers/dashboard/parent';
import HomeParent from './components/parent-dashboard/home';
import ConfigParent from './components/parent-dashboard/config';
import PersonalParent from './components/parent-dashboard/personal';
import GiftListParent from './components/parent-dashboard/gift-list';
import GalleryParent from './components/parent-dashboard/gallery';
import CustomParent from './components/parent-dashboard/custom';
import WhyBelleMam from './containers/why-belle-mam';
import Partners from './containers/partners';

export default () => {
    return (
        <BrowserRouter basename="/">
            <Switch>
                <Route path="/" exact={true} component={Home} />
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
                <Route path="/first-steps" component={FirstStep} />
                <Route path="/invite" component={Invite} />
                <Route path="/why" component={WhyBelleMam} />
                <Route path="/partners" component={Partners} />
                <ParentDashboard>
                    <Switch>
                        <Route path="/parent-home" component={HomeParent} />
                        <Route path="/parent-config" component={ConfigParent} />
                        <Route path="/parent-gallery" component={GalleryParent} />
                        <Route path="/parent-gifts" component={GiftListParent} />
                        <Route path="/parent-custom" component={CustomParent} />
                        <Route path="/parent-personal" component={PersonalParent} />
                    </Switch>
                </ParentDashboard>
                <Route path="*" component={NotFound}></Route>
            </Switch>
        </BrowserRouter>
    );
};