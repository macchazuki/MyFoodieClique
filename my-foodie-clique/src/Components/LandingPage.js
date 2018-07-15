import React, { Component } from 'react'
import {Link } from 'react-router-dom'

class LandingPage extends Component {

    render () { 
        var timeStamp = Date.now();
        var appointment = "/" + this.props.user + "/" + timeStamp;
        return (
            <div>
                <div>              
            <Link className="addIcon" to={appointment}> </Link>
                    </div>               
  
    </div>
    );
    }
}

export default LandingPage 