import React from 'react';
import movieServices from './AppContainer/services/movieServices'
import AppContainer from './AppContainer/AppContainer'

const App = () => {
    movieServices.getToken().then(data => console.log(data))

    return <AppContainer></AppContainer>
};

export default App;

