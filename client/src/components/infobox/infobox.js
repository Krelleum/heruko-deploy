import React, { Component } from 'react';
import './infobox.css';

class InfoBox extends Component{
    constructor(props){
        super(props);
        this.state = {

        }
    }



renderBox(){
    const userName = sessionStorage.getItem('useremail');

    if(userName){
        return (
         <div className='infoboxloggedin'>
            <div className='infoboxpoint'>

            </div>

            <div className='infoboxname'>
                <p>Eingeloggt als {userName} </p>
            </div>
         </div>
        )
    }else{
        return(
            <div className='infoboxloggedout'>
                <p><span>You are not Logged In!</span> Youre Votes and your Posts will only be counted if you register an Account and Sign In!</p>

            </div>
        )
    }
}




    render(){

        return(
            <div className='infobox col-md-12'>
                {this.renderBox()}

            </div>
        )
    }
}

export default InfoBox;
