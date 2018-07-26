import React, { Component } from 'react'
import VoteButton from './VoteButton'
import fire from '../fire'
import Datetime from 'react-datetime';
class DateTimeComponent extends Component {
    constructor(props) {
        super(props);
        this.state = { dateTimes: [], user : this.props.user, date : new Date() }; // <- set up react state
    }
    
    componentDidMount() {

        /* Create reference to dateTimes in Firebase Database */
        let dateTimesRef = fire.database().ref('appointments/' + this.props.host + "/" + this.props.timeStamp + '/dateTimes').orderByKey().limitToLast(100);
        let dateTimeUpdated = [];
        dateTimesRef.on('child_added', snapshot => {
            /* Update React state when dateTime is added at Firebase Database */
            let dateTime = [{text: snapshot.val(), id: snapshot.key}];
            dateTimeUpdated = dateTimeUpdated.concat(dateTime);
            this.setState({ dateTimes: dateTimeUpdated });
        })    
        dateTimesRef.on('child_removed', snapshot => {
            for (var i =0; i < dateTimeUpdated.length; i++) {
                 console.log(dateTimeUpdated[i].text);
                 console.log(snapshot.val());
                if (dateTimeUpdated[i].id === snapshot.key) {
                 dateTimeUpdated.splice(i, 1);
                 this.setState({ dateTimes: dateTimeUpdated });
                  }
                }
            })  
    }

    onChange = date => {
        this.setState({ date });
        console.log(date.format("dddd, MMMM Do YYYY, h:mm:ss a"));
        this.inputEl.value = date.format("dddd, MMMM Do YYYY, h:mm:ss a");
    }
    

    addDateTime(e) {
        e.preventDefault(); // <- prevent form submit from reloading the page
        /* Send the dateTime to Firebase */
        let DateTime = this.inputEl.value;
        //check if input is valid
        if(DateTime){
        this.setState({date : new Date()});
        fire.database().ref( 'appointments/' + this.props.host + "/" + this.props.timeStamp + '/dateTimes/' + DateTime + '/' + this.props.user).set({Vote : true});
        this.inputEl.value = ''; // <- clear the input
        }
    }
    render() {
        var user = this.props.user
        console.log(this.state.dateTimes)
      
        return (
            <div className="form">  
            <Datetime onChange = {this.onChange} input = {false} timeConstraints = {{minutes:{step:10}}}
            />
                <form onSubmit={this.addDateTime.bind(this)}>
                    <input type="text" ref={el => this.inputEl = el} />
                    <input type="submit" />
                    <h2>
                        <ol>
                            { /* Render the list of dateTimes */
                                this.state.dateTimes.map(dateTime => <li key={dateTime.id}>{dateTime.id} <VoteButton category = 'dateTimes'  user = {user} venue_dateTime = {dateTime.id} host = {this.props.host} timeStamp = {this.props.timeStamp}/></li>)
                            }
                        </ol>
                    </h2>
                </form>
            </div>
        );

    }
}

export default DateTimeComponent;