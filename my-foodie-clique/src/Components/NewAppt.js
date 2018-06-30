import React, { Component } from 'react';
import DateTimeComponent from './DateTime Component';
import VenueComponent from './VenueComponent';

class NewAppt extends Component {
   
    render() {
        var user = this.props.user;
        console.log(user);
        return (
            <div>
                <div className="form"><h2>Add a Date and Time:</h2> <DateTimeComponent user = {user}/></div>
                <div className="form"><h2>Add a Venue:</h2> <VenueComponent user = {user}/></div>

            </div>
        )
    }
}

export default NewAppt;