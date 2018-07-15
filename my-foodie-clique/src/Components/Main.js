import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'
import LandingPage from './LandingPage'
import NewAppt from './NewAppt'
import fire from '../fire.js'

class Main extends Component {
    constructor(props) {
        super(props)
        this.state = {
           user : null
           
        }    
    }


    componentDidMount() {
        fire.auth().onAuthStateChanged((user) => {
          if (user) {
            this.setState({ user });
          } else {
            fire.auth().signInAnonymously()
            this.setState({user});
          }
        })
    }       

    render() {
        if(fire.auth().currentUser){
        var user = fire.auth().currentUser.uid;
        console.log(user);
        }

        return (

            <div>
               
                <h1>
                    <Link to="/"> MyFoodieClique </Link>
                </h1>
                <Route exact path="/" render={() => (
                    <div>
                        <LandingPage user={user}/>
                    </div>
                )} />
                <Route path="/:uid/:timeStamp" render={(props) => <NewAppt {...props} user ={user} />}/>
                
                
            </div>
        )
    }
}
export default Main