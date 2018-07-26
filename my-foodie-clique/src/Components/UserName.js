import React, { Component } from 'react';
import fire from '../fire'

class UserName extends Component {

    constructor(props) {
        super(props);
        this.state = {value: '', nameExists : false};
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }

      componentWillMount(){
          let userRef = fire.database().ref('users/');
          userRef.once('value', snapshot => {
              console.log(snapshot.child(this.props.user + '/Name').val());
            if(snapshot.child(this.props.user + '/Name').exists()) {
                this.setState({value: snapshot.child(this.props.user + '/Name').val()})
                this.setState({nameExists: true})
            }
          }
        )
      }
    
      handleChange(event) {
        this.setState({value: event.target.value});
      }
    
      handleSubmit(event) {
        event.preventDefault();
        let name = this.state.value;
        if(name) {
            fire.database().ref('users/' + this.props.user).set({Name : name});
            this.setState({nameExists: true})
        }
      }

      handleClick = () => {
          this.setState({nameExists : false})
      }
    
      render() {
  
          if(!this.state.nameExists) {
        return (
          <form className="user" onSubmit={this.handleSubmit}>
            <label>
              Name:
              <input type="text" value={this.state.value} onChange={this.handleChange} />
            </label>
            <input type="submit" value="Submit" />
          </form>
        );
    } else {
        return (
            <div className="user">
                
            Welcome {this.state.value}
            <button onClick={this.handleClick}>
        Update name
      </button>
      </div>
        );
    }
      }
    }

    export default UserName;