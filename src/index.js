import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import AppMap from './components/AppMap';

const rootElement = document.getElementById('root');
ReactDOM.render(
    <div>
        <App headerTitle="Welcome!" contentTitle="Stranger" contentBody="Wecome to example app!"/>
        <AppMap/>
    </div>,
     rootElement);
//ReactDOM.render(<App/>, rootElement);
