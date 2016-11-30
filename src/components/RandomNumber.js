import React from 'react';

class RandomNumber extends React.Component {
    constructor(props){
        super(props);
        this.updateNumber = this.updateNumber.bind(this);
    }

    updateNumber(){
        let number = Math.round(Math.random()*100);
        this.props.onUpdate(number);
    }

    render(){
        return (
            <div>
                <h2>Number: {this.props.number}</h2>
                <button onClick={this.updateNumber}>Randomize</button>
            </div>
        );
    }
}

export default RandomNumber;
