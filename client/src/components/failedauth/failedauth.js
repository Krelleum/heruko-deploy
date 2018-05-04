import React, { Component } from 'react';
import './failedauth.css';

class FailedAuth extends Component{

    render(){
        return(
            <div className='col-md-12 failedauth'>
            
                <p>You are not logged in. Please log in to Post or Vote!</p>
            
            </div>
        )
    }
}

export default FailedAuth;