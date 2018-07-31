import React, { Component } from 'react'
import VoteButton from './VoteButton'
import fire from '../fire'

class DateTimeComponent extends Component {
    constructor(props) {
        super(props);
        this.state = { dateTimes: [], user : this.props.user }; // <- set up react state
    }
    
    componentDidMount() {

        /* Create reference to dateTimes in Firebase Database */
        let dateTimesRef = fire.database().ref('appointments/' + this.props.host + "/" + this.props.timeStamp + '/dateTimes').orderByChild('Votes/votes');
        let dateTimeUpdated = [];
        dateTimesRef.on('child_added', snapshot => {
            /* Update React state when dateTime is added at Firebase Database */
            let dateTime = [{text: snapshot.val(), id: snapshot.key}];
            dateTimeUpdated = dateTimeUpdated.concat(dateTime);
            this.setState({ dateTimes: dateTimeUpdated });
        })    
        dateTimesRef.on('child_removed', snapshot => {
            for (var i =0; i < dateTimeUpdated.length; i++) {
                if (dateTimeUpdated[i].id === snapshot.key) {
                 dateTimeUpdated.splice(i, 1);
                 this.setState({ dateTimes: dateTimeUpdated });
                  }
                }
            })  
    }

    addDateTime(e) {
        e.preventDefault(); // <- prevent form submit from reloading the page
        /* Send the dateTime to Firebase */
        var DateTime = this.inputEl.value;
        //check if input is valid
        if(DateTime){
        DateTime = new Date(DateTime);
        fire.database().ref( 'appointments/' + this.props.host + "/" + this.props.timeStamp + '/dateTimes/' + DateTime.toString() + '/Votes').set({votes : 1});
        fire.database().ref( 'appointments/' + this.props.host + "/" + this.props.timeStamp + '/dateTimes/' + DateTime.toString() + '/' + this.props.user).set({Vote : true});
      // this.inputEl.value = Date(); // <- clear the input

       
        }
    }
    render() {
        var user = this.props.user
      
        return (
            <div className="form">  
                <form onSubmit={this.addDateTime.bind(this)}>
                    <input type="datetime-local" ref={el => this.inputEl = el} />
                    <input type="submit" />
                    <h2>
                        <ol>
                            { /* Render the list of dateTimes */
                                this.state.dateTimes.reverse().map(dateTime => <li key={dateTime.id}>{dateTime.id} <VoteButton category = 'dateTimes'  user = {user} venue_dateTime = {dateTime.id} host = {this.props.host} timeStamp = {this.props.timeStamp}/></li>)
                            }
                        </ol>
                    </h2>
                </form>
            </div>
        );

    }
}

export default DateTimeComponent;