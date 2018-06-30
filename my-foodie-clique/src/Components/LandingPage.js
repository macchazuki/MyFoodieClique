import React, { Component } from 'react'
import {Link } from 'react-router-dom'

class LandingPage extends Component {

    render () { 
    var user = this.props.user;
        return (
            <div>
                <div>              
            <Link className="addIcon" to="/NewAppt"> </Link>
                    </div>               
  }
    </div>
    );
    }
}

export default LandingPage 