import React from 'react';
import update from 'react-addons-update';

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
            ],

            selectedKey: -1,

            selected: {
                name: '',
                phone:''
            }
        };

        this._InsertContact = this._InsertContact.bind(this);
        this._onSelect = this._onSelect.bind(this);
        this._isSelected = this._isSelected.bind(this);
        this._removeContact = this._removeContact.bind(this);
        this._editContact = this._editContact.bind(this);
    }

    _InsertContact(name, phone){
        let newState = update(this.state, {
            contactData : {
                $push : [{name: name, phone: phone}]
            }
        });

        this.setState(newState);
    }

    _onSelect(key){
        if(key == this.state.selectedKey){
            console.log('key select cancelled');

            this.setState({
                selectedKey: -1,
                selected: {
                    name: '',
                    phone: ''
                }
            });
            return;
        }

        this.setState({
            selectedKey: key,
            selected: this.state.contactData[key]
        });

        console.log(key + ' is selected');
    }

    _isSelected(key){
        if(this.state.selectedKey == key){
            return true;
        }else{
            return false;
        }
    }

    _removeContact(){
        if(this.state.selectedKey == -1){
            console.log('contact not selected');
            return;
        }

        this.setState({
            contactData: update(this.state.contactData,{
                $splice:[[this.state.selectedKey, 1]]
            }),

            selectedKey: -1,

            selected: {
                name: '',
                phone: ''
            }
        });
    }

    _editContact(name, phone){
        this.setState({
            contactData: update(this.state.contactData,{
                [this.state.selectedKey]: {
                    name: {$set: name},
                    phone: {$set: phone}
                }
            }),

            selected: {
                name: name,
                phone: phone
            }
        });
    }

    render(){
        return (
            <div>
                <h1>Contacts</h1>
                <ul>
                    {this.state.contactData.map((contact, i) => {
                        return (
                            <ContactInfo name={contact.name} phone={contact.phone} contactKey={i} isSelected={this._isSelected(i)} onSelect={this._onSelect} key={i}/>    //key 필수!!
                        );
                    })}
                </ul>
                <ContactCreator onInsert={this._InsertContact}/>
                <ContactRemover onRemove={this._removeContact}/>
                <ContactEditor isSelected={(this.state.selectedKey!=-1)} onEdit={this._editContact} contact={this.state.selected}/>
            </div>
        );
    }
}

class ContactInfo extends React.Component {
    constructor(props){
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(){
        this.props.onSelect(this.props.contactKey);
    }

    shouldComponentUpdate(nextProps, nextState){
        return (JSON.stringify(nextProps) != JSON.stringify(this.props));
    }

    render(){
        console.log('rendered : ', this.props.name);
        
        let getStyle = isSelect => {
            if(!isSelect) return;
            let style = {
                fontWeight: 'bold',
                backgroundColor: '#42fcd8'
            };

            return style;
        };

        return (
            <li style={getStyle(this.props.isSelected)} onClick={this.handleClick}>{this.props.name} {this.props.phone}</li>
        );
    }
}

class ContactCreator extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            name: '',
            phone: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleChange(e){
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }

    handleClick(){
        this.props.onInsert(this.state.name, this.state.phone);
        this.setState({
            name: '',
            phone: ''
        });
    }

    render(){
        return (
            <div>
                <p>
                    <input type="text" name="name" value={this.state.name} onChange={this.handleChange} placeholder="name"/>
                    <input type="text" name="phone" value={this.state.phone} onChange={this.handleChange} placeholder="phone"/>
                    <button onClick={this.handleClick}>Insert</button>
                </p>
            </div>
        );
    }
}

class ContactRemover extends React.Component {
    constructor(props){
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(){
        this.props.onRemove();
    }

    render(){
        return(
            <button onClick={this.handleClick}>Remove</button>
        );
    }
}

class ContactEditor extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            name: '',
            phone: ''
        }

        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleClick(){
        if(!this.props.isSelected){
            console.log('contact not selected');
            return;
        }
        console.log(this.props.isSelected,this.state.name,this.state.phone);
        this.props.onEdit(this.state.name, this.state.phone);
    }

    handleChange(e){
        let newState = {};
        newState[e.target.name] = e.target.value;

        this.setState(newState);
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            name: nextProps.contact.name,
            phone: nextProps.contact.phone
        });
    }

    render(){
        return(
            <p>
                <input type="text" name="name" value={this.state.name} onChange={this.handleChange} placeholder="name"/>
                <input type="text" name="phone" value={this.state.phone} onChange={this.handleChange} placeholder="phone"/>
                <button onClick={this.handleClick}>Edit</button>
            </p>
        );
    }
}

export default AppMap;
