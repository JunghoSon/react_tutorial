import React from 'react';

class AppMap extends React.Component {
    render(){
        return (
            <Contacts/>
        );
    }
}

class Contacts extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            contactData: [
                {name: "Abet", phone: "000-0000-0000"},
                {name: "Betty", phone: "111-1111-1111"},
                {name: "Chalie", phone: "222-2222-2222"},
                {name: "David", phone: "333-3333-3333"}
            ]
        };
    }

    render(){
        return (
            <div>
                <h1>Contacts</h1>
                <ul>
                    {this.state.contactData.map((contact, i) => {
                        return (
                            <ContactInfo name={contact.name} phone={contact.phone} key={i}/>    //key 필수!!
                        );
                    })}
                </ul>
            </div>
        );
    }
}

class ContactInfo extends React.Component {
    render(){
        return (
            <li>{this.props.name} {this.props.phone}</li>
        );
    }
}

export default AppMap;
