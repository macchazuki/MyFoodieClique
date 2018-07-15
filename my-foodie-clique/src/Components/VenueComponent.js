import React, { Component } from 'react'
import VoteButton from './VoteButton'
import fire from '../fire'

class VenueComponent extends Component {
     constructor(props) {
        super(props);
        this.state = { venues: []}; // <- set up react state

    }
   componentWillMount() {
        // Create reference to venues in Firebase Database 
        let venuesRef = fire.database().ref('appointments/' + this.props.host + "/" + this.props.timeStamp + '/venues').orderByKey().limitToLast(100);
        let venuesUpdated = [];
        venuesRef.on('child_added', snapshot => {
            // Update React state when venue is added at Firebase Database 
            let venue = [{ text: snapshot.val(), id: snapshot.key }];
            venuesUpdated = venuesUpdated.concat(venue);
            this.setState({ venues: venuesUpdated });
        })
        venuesRef.on('child_removed', snapshot => {
        for (var i =0; i < venuesUpdated.length; i++) {
             console.log(venuesUpdated[i].text);
             console.log(snapshot.val());
            if (venuesUpdated[i].id === snapshot.key) {
             venuesUpdated.splice(i, 1);
             this.setState({ venues: venuesUpdated });
              }
            }
        })
       
    }
    addVenue(e) {
        e.preventDefault(); // <- prevent form submit from reloading the page
        // Send the dateTime to Firebase 
        let Venue = this.inputEl.value;
        //check if input is valid
        if(Venue){
        fire.database().ref('appointments/' + this.props.host + "/" + this.props.timeStamp + '/venues/' + Venue + '/' + this.props.user).set({Vote : true});
        this.inputEl.value = ''; // <- clear the input
        }
    } 
    
    render() {
        var user = this.props.user;
        console.log(this.state.venues);
        return (
            <div className="form">
                <form onSubmit={this.addVenue.bind(this)}>
                    <input type="text" ref={el => this.inputEl = el} />
                    <input type="submit" />
                    <h2>
                        <ol>
                            { /* Render the list of venues */
                                this.state.venues.map(venue => <li key={venue.id}>{venue.id} <VoteButton category = 'venues' Venue = {venue.id} user = {user} dateTime = '' host = {this.props.host} timeStamp = {this.props.timeStamp}/> </li>)
                            }
                        </ol>
                    </h2>
                </form>
            </div>
        );

    }
}

export default VenueComponent;