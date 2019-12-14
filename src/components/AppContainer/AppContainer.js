import React from 'react';
import { Switch, Route } from 'react-router-dom';

const AppContainer = () => {
    return (
        <div>
            <Switch>
                <Route exact path='/' component={ Home } />
            </Switch>
        </div>
    )
}

