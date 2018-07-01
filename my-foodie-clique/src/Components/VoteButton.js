import React, {Component} from 'react'
import fire from '../fire'

class VoteButton extends Component {
    constructor() {
      super();
      this.state = {
        count: 0,

      };
    }

    componentWillMount() {
      if(this.props.category === 'venues'){
      fire.database().ref('venues/' + this.props.Venue).on('value', snapshot => {
          // Update React state when venue is added at Firebase Database 
          let count = snapshot.numChildren();
          console.log(count);
          this.setState({ count : count });
      })
     } else {
        fire.database().ref('dateTimes/' + this.props.dateTime).on('value', snapshot => {
          // Update React state when venue is added at Firebase Database 
          let count = snapshot.numChildren();
          this.setState({ count : count });
      })
      }
    
  }
  
    vote() {
        if(this.props.category === 'venues') {
      fire.database().ref('venues/' + this.props.Venue + '/' + this.props.user).set({Vote : true});
      } else {
      fire.database().ref('dateTimes/' + this.props.dateTime + '/' + this.props.user).set({Vote : true});
      }
    }
  
    render() {
      return (<button
                onClick={() => this.vote()}
              >
                Voted {this.state.count} times
              </button>);
    }
  }

  export default VoteButton