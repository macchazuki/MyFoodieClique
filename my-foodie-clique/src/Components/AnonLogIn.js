import React from 'react';
import fire from '../fire.js';

function AnonLogIn() {
  
        fire.auth().signInAnonymously();  
        
        fire.auth().onAuthStateChanged(function(user) {
            if (user) {
              // User is signed in.
              var isAnonymous = user.isAnonymous;
              var uid = user.uid;      
             console.log('gg' + uid)
              // ...
            } else {
              // User is signed out.
              // ...
            }
            // ...
          })
        
          
          
        return (
          
            <div>
                
                
                                
                  
            </div>
        )
    
    
}

export default AnonLogIn