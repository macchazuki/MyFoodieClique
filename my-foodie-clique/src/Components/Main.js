import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'
import LandingPage from './LandingPage'
import NewAppt from './NewAppt'
import fire from '../fire.js';

class Main extends Component {
    constructor(props) {
        super(props)
        this.state = {
           user : null
           
        }    
    }
    
    

    render() {
        
        var user = fire.auth().currentUser;
        console.log(user);

        return (

            <div>
               
                <h1>
                    <Link to="/"> MyFoodieClique </Link>
                </h1>
                <Route exact path="/" render={() => (
                    <div>
                        <LandingPage currentUser={this.props.currentUser}/>
                    </div>
                )} />
                <Route path="/NewAppt" venues = {this.props.venues} render={({ history }) => (
                    <NewAppt onHistory={history} />
                )} />
                
            </div>
        )
    }
}
export default Main