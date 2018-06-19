import React, { Component } from 'react'
import VoteButton from './VoteButton'
import fire from '../fire'

class DateTimeComponent extends Component {
    constructor(props) {
        super(props);
        this.state = { dateTimes: [] }; // <- set up react state
    }
    componentWillMount() {
        /* Create reference to dateTimes in Firebase Database */
        let dateTimesRef = fire.database().ref('dateTimes').orderByKey().limitToLast(100);
        dateTimesRef.on('child_added', snapshot => {
            /* Update React state when dateTime is added at Firebase Database */
            let dateTime = { text: snapshot.val(), id: snapshot.key };
            this.setState({ dateTimes: [dateTime].concat(this.state.dateTimes) });
        })
    }
    addDateTime(e) {
        e.preventDefault(); // <- prevent form submit from reloading the page
        /* Send the dateTime to Firebase */
        fire.database().ref('dateTimes').push(this.inputEl.value);
        this.inputEl.value = ''; // <- clear the input
    }
    render() {
        return (
            <div className="form">
                <form onSubmit={this.addDateTime.bind(this)}>
                    <input type="text" ref={el => this.inputEl = el} />
                    <input type="submit" />
                    <ol>
                        { /* Render the list of dateTimes */
                            this.state.dateTimes.map(dateTime => <li key={dateTime.id}>{dateTime.text}</li>)
                        }
                    </ol>
                </form>
            </div>
        );

    }
}

export default DateTimeComponent;