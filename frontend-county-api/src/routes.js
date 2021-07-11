import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Main from './pages/Main';
import About from './pages/About';

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Main} />
                <Route path="/about" component={About} />
            </Switch>
        </BrowserRouter>
    );
}