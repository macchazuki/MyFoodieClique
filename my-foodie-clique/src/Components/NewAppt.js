import React, { Component } from 'react';
import DateTimeComponent from './DateTime Component';
import VenueComponent from './VenueComponent';


class NewAppt extends Component {

    render() {
        var user = this.props.user;
        var host = this.props.match.params.uid;
        var timeStamp = this.props.match.params.timeStamp;
        console.log(timeStamp);
    
        return (
            <div>
                <div className="form"><h2>Add a Date and Time:</h2> <DateTimeComponent user = {user} host = {host} timeStamp = {timeStamp}/></div>
                <div className="form"><h2>Add a Venue:</h2> <VenueComponent user = {user} host = {host} timeStamp = {timeStamp}/></div>

            </div>
        )
    }
}

export default NewAppt;