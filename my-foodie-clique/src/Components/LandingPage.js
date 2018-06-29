import React, { Component } from 'react'
import {Link } from 'react-router-dom'
import AnonLogIn from './AnonLogIn'

class LandingPage extends Component {

    render () { 
    var user = this.props.user;
        return (
            <div>
                {user ?  
                <div>              
            <Link className="addIcon" to="/NewAppt"> </Link>
            <ul>
                <li>
                        <a id="btnLogout" href="#">Logout</a>
                    </li>
                    </ul>  
                    </div>              
    :
    <div id="wrapper">
     <button onClick={AnonLogIn}>Log In</button> 
    </div>             
  }
    </div>
    );
    }
}

export default LandingPage 