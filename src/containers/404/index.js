// Page not Found

import React, { Component } from 'react';
import { useLocation } from 'react-router-dom';
import { Result } from 'antd';

export default class notFound extends Component {
    state = {};
    render() {
        function NoMatch() {
            let location = useLocation();
            return (
                <div>
                    <h3>
                        Nenhum resultado para <code>{location.pathname}</code>
                    </h3>
                </div>
            );
        }
        return (
            <div className="App">
                <Result
                    status="404"
                    title="Ops 404!"
                    extra={<NoMatch></NoMatch>}
                />
            </div>
        );
    }
}
