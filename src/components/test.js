import React from 'react';
import i18n from '../i18n';
import { withNamespaces } from 'react-i18next';

class Test extends React.Component {
    constructor(props) {
        super(props);
        console.log(props);
    }

    render () {
        const { t } = this.props
        return (
            <h1>{t('movies.movies')}</h1>
        )
    }
}   

export default withNamespaces()(Test);