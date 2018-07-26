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