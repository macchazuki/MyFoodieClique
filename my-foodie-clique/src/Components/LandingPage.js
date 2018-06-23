import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'
import AnonLogIn from './AnonLogIn'

function LandingPage() {
    return <div>
        <Link className="addIcon" to="/NewAppt"> </Link>
        <div id="wrapper">
            <AnonLogIn/>
        </div>
    </div>
}

export default LandingPage 