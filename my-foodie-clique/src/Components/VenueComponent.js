import React, { Component } from 'react'
import VoteButton from './VoteButton'
import fire, {auth} from '../fire'

class VenueComponent extends Component {
    constructor(props) {
        super(props);
        this.state = { venues: [] }; // <- set up react state
    }
    componentWillMount() {
        /* Create reference to venues in Firebase Database */
        let venuesRef = fire.database().ref('venues').orderByKey().limitToLast(100);
        venuesRef.on('child_added', snapshot => {
            /* Update React state when venue is added at Firebase Database */
            let venue = { text: snapshot.val(), id: snapshot.key };
            this.setState({ venues: [venue].concat(this.state.venues) });
        })
    }
    addVenue(e) {
        e.preventDefault(); // <- prevent form submit from reloading the page
        /* Send the dateTime to Firebase */
        fire.database().ref('venues').push(this.inputEl.value);
        this.inputEl.value = ''; // <- clear the input
    }
    render() {
        return (
            <div className="form">
                <form onSubmit={this.addVenue.bind(this)}>
                    <input type="text" ref={el => this.inputEl = el} />
                    <input type="submit" />
                    <h2>
                        <ol>
                            { /* Render the list of venues */
                                this.state.venues.map(venue => <li key={venue.id}>{venue.text}</li>)
                            }
                        </ol>
                    </h2>
                </form>
            </div>
        );

    }
}

export default VenueComponent;