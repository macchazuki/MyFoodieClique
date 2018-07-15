import React, {Component} from 'react'
import fire from '../fire'

class VoteButton extends Component {
    constructor() {
      super();
      this.state = {
        count: 0,

      };
    }

    componentDidMount() {
      if(this.props.category === 'venues'){
      let venueRef = fire.database().ref('appointments/' + this.props.host + "/" + this.props.timeStamp + '/venues/' + this.props.Venue);
      venueRef.on('value', snapshot => {
          // Update React state when venue is added at Firebase Database 
          let count = snapshot.numChildren();
          this.setState({ count : count });
      })
     } else {
       let dateTimeRef = fire.database().ref( 'appointments/' + this.props.host + "/" + this.props.timeStamp + '/dateTimes/' + this.props.dateTime);
        dateTimeRef.on('value', snapshot => {
          // Update React state when venue is added at Firebase Database 
          let count = snapshot.numChildren();
          this.setState({ count : count });
          console.log(this.state.count);
      })
      }
    
  }
  
    vote() {
        if(this.props.category === 'venues') {
          fire.database().ref('appointments/' + this.props.host + "/" + this.props.timeStamp + '/venues/' + this.props.Venue + '/' + this.props.user).once('value', snapshot => {
            if(snapshot.val()){
              fire.database().ref('appointments/' + this.props.host + "/" + this.props.timeStamp + '/venues/' + this.props.Venue + '/' + this.props.user).remove()
            } else {
        fire.database().ref('appointments/' + this.props.host + "/" + this.props.timeStamp + '/venues/' + this.props.Venue + '/' + this.props.user).set({Vote : true});
            }
          })
          
      } else {
        fire.database().ref('appointments/' + this.props.host + "/" + this.props.timeStamp + '/dateTimes/' + this.props.dateTime + '/' + this.props.user).once('value', snapshot => {
            if(snapshot.val()){
              fire.database().ref('appointments/' + this.props.host + "/" + this.props.timeStamp + '/dateTimes/' + this.props.dateTime + '/' + this.props.user).remove()
            } else {
        fire.database().ref('appointments/' + this.props.host + "/" + this.props.timeStamp + '/dateTimes/' + this.props.dateTime + '/' + this.props.user).set({Vote : true});
            }
          })
      }
    }
  
    render() {
      var count = this.state.count;
      return (<button
                onClick={() => this.vote()}
              >
                Voted {count} times
              </button>);
    }
  }

  export default VoteButton