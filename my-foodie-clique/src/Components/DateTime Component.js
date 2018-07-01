import React, { Component } from 'react'
import VoteButton from './VoteButton'
import fire from '../fire'

class DateTimeComponent extends Component {
    constructor(props) {
        super(props);
        this.state = { dateTimes: [], user : this.props.user }; // <- set up react state
    }
    componentWillMount() {

        /* Create reference to dateTimes in Firebase Database */
        let dateTimesRef = fire.database().ref('dateTimes').orderByKey().limitToLast(100);
        dateTimesRef.on('child_added', snapshot => {
            /* Update React state when dateTime is added at Firebase Database */
            let dateTime = { text: snapshot.val(), id: snapshot.key };
            this.setState({ dateTimes: [dateTime].concat(this.state.dateTimes) });
            console.log(snapshot.numChildren());
     
        })
        
    }
    addDateTime(e) {
        e.preventDefault(); // <- prevent form submit from reloading the page
        /* Send the dateTime to Firebase */
        let DateTime = this.inputEl.value;
        //check if input is valid
        if(DateTime){
        fire.database().ref('dateTimes/' + DateTime + '/' + this.props.user).set({Vote : true});
        this.inputEl.value = ''; // <- clear the input
        }
    }
    render() {
        var user = this.props.user
        console.log(this.state.dateTimes)
        return (
            <div className="form">
                <form onSubmit={this.addDateTime.bind(this)}>
                    <input type="text" ref={el => this.inputEl = el} />
                    <input type="submit" />
                    <h2>
                        <ol>
                            { /* Render the list of dateTimes */
                                this.state.dateTimes.map(dateTime => <li key={dateTime.id}>{dateTime.id} <VoteButton category = 'dateTimes' Venue = '' user = {user} dateTime = {dateTime.id}/></li>)
                            }
                        </ol>
                    </h2>
                </form>
            </div>
        );

    }
}

export default DateTimeComponent;