import React from 'react';
import { withNamespaces } from 'react-i18next';

class Home extends React.Component {
    constructor() {
        super();
    }

    render() {
        const { t } = this.props;
        return (
            <div>
                <h1>{ t('home.welcome') }</h1>
            </div>
        )
    }
}

export default withNamespaces()(Home)