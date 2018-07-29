import React, {Component} from 'react'
import fire from '../fire'

class VoteButton extends Component {
    constructor() {
      super();
      this.state = {
        count: 0,
        users : [],
        username : []

      };
    }

    componentDidMount() {
      let venueRef = fire.database().ref('appointments/' + this.props.host + "/" + this.props.timeStamp + '/' + this.props.category + '/' + this.props.venue_dateTime);
      venueRef.on('value', snapshot => {
          // Update React state when venue is added at Firebase Database 
          let count = snapshot.numChildren();
          this.setState({ count : count });
      }) 
  }
  
    vote() {
          fire.database().ref('appointments/' + this.props.host + "/" + this.props.timeStamp + '/' + this.props.category + '/' + this.props.venue_dateTime + '/' + this.props.user).once('value', snapshot => {
            if(snapshot.val()){
              fire.database().ref('appointments/' + this.props.host + "/" + this.props.timeStamp + '/' + this.props.category + '/' + this.props.venue_dateTime + '/' + this.props.user).remove()
            } else {
        fire.database().ref('appointments/' + this.props.host + "/" + this.props.timeStamp + '/' + this.props.category + '/' + this.props.venue_dateTime + '/' + this.props.user).set({Vote : true});
            }
          })
        }

    usersVoted() {
      let users = [];
      let username = [];
      fire.database().ref('appointments/' + this.props.host + "/" + this.props.timeStamp + '/' + this.props.category + '/' + this.props.venue_dateTime).on('child_added', snapshot => {
        users = users.concat(snapshot.key);
        this.setState({users : users})
        })

        for(var i = 0; i < this.state.users.length; i++){
            fire.database().ref('users/' + this.state.users[i] + '/Name').once('value', snapshot => {
                if(snapshot.val()) {
                username = username.concat(snapshot.val());
                } else {
                  username = username.concat('Anon');
                }
                this.setState({username : username})
                
        })
    } 
    console.log(this.state.username);
}
  
    render() {

      var count = this.state.count;
      
      return (
              <div>
              <button
                onClick={() => this.vote()}
                onMouseEnter={() => this.usersVoted()}
                  title = { this.state.username.join('\u000A') }

             >   
                Voted {count} times
              </button>
              </div>
              );
    }
  }

  export default VoteButton