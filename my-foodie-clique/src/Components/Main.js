import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'
import LandingPage from './LandingPage'
import NewAppt from './NewAppt'
import MapContainer from './MapContainer'

class Main extends Component {
    constructor() {
        super()
    }
    render() {
        return (

            <div>
                <h1>
                    <Link to="/"> MyFoodieClique </Link>
                </h1>
                <Route exact path="/" render={() => (
                    <div>
                        <LandingPage />
                    </div>
                )} />
                <Route path="/NewAppt" render={({ history }) => (
                    <NewAppt onHistory={history} />
                )} />
                <Route path="/MapContainer" render={({ history }) => (
                    <div>
                        <p> Google Maps API + React </p>
                        <MapContainer google={this.props.google} onHistory={history} />
                    </div>
                )} />
            </div>
        )
    }
}
export default Main