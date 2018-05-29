import React, { Component } from 'react';
import SignUp from '../signup/signup';
import SignIn from '../signin/signin';
// import SignGuest from '../signguest/signguest';
import './loggedout.css'

class LoggedOut extends Component{
    constructor(props){
        super(props);
        this.state = {
            show: 'signIn'
        }
    }


changeSignUp(){
    this.setState({
        show: 'signUp'
    })
}

changeSignIn(){
    this.setState({
        show:'signIn'
    })
}



toRender(){
    let show = this.state.show;

    if(show === 'signIn'){
        return(
            <SignIn toggleLoggedIn={this.props.toggleLoggedIn.bind(this)} />
        )
    }else if(show === 'signUp'){
        return(
            <SignUp />
        )
    }else{
        return null
    }
}


render(){
    return(
        <div>
            <div className='container loggedoutcontainer'>
            <div className='col-md-10 loggedoutwrapper'>
            <div className='col-md-7 loggedoutheading'>
                <h3>Feedbck</h3>
                <p>Crowd-Based-Decisionmaking</p>
                <p>Got a Decision to make? - The Crowd will help you to decide. Create an Account today and enjoy Crowd-Based-Decisionmaking on FEEDBCK</p>  
            </div>


        <div className='col-md-5 loggedoutlogin'>




            <div className='loggedout'>
                <div className='loggedoutbuttons'>
                    <div className='loggoutbuttonsignup' onClick={this.changeSignUp.bind(this)}>
                        <p>Sign Up</p>
                    </div>
                        <div className='loggoutbuttonsignin' onClick={this.changeSignIn.bind(this)}>
                        <p>Login</p>
                    </div>
                </div>
                {this.toRender()}




            </div>
                </div>
                </div>
        </div>
        </div>
    )
}




}

export default LoggedOut;
