import React from 'react';
import Header from './Header';
import Content from './Content';
import StateExample from './StateExample';

class App extends React.Component {
    render(){
        return(
            <div>
                <Header/>
                <Content/>
                <StateExample/>
            </div>
        );
    }
}

export default App;
