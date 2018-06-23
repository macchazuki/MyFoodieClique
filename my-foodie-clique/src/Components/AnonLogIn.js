import React, { Component } from 'react';

class AnonLogIn extends Component {
    render() {
        return (
            <div>
                <h2>Anonymous Login</h2>
                <ul id="noliststyle">
                    <li>
                        <a id="btnLogin" href="#">Login Anonymously</a>
                    </li>
                    <li>
                        <a id="btnLogout" href="#" className="hide">Logout</a>
                    </li>
                </ul>
            </div>
        )
    }
}

export default AnonLogIn;