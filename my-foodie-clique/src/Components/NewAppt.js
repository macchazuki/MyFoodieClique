import React, { Component } from 'react';
import DateTimeComponent from './DateTime Component';
import VenueComponent from './VenueComponent';

class NewAppt extends Component {
    render() {
        return (
            <div>
                <div className="form"><h2>Add a Date and Time:</h2> <DateTimeComponent/></div>
                <div className="form"><h2>Add a Venue:</h2> <VenueComponent/></div>

            </div>
        )
    }
}

export default NewAppt;