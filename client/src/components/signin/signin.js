import React, { Component } from 'react';
import './signin.css';
import axios from 'axios';


class SignIn extends Component{
    constructor(props){
        super(props);
        this.state = {
            status: '',
        }
    }




    //
    // Stores the Data Input in Fields in this.State
    //  
handleChange(e){
    e.preventDefault();

    const property = e.target.id;
    const value = e.target.value;

    this.setState({
        [property]: value
    });

    
}





// Sends this.State Data (Email and Password ) to the Server. If the Response Code is 200 Function ToggleLogin is called 
handleClick(){
    var body = {
        email: this.state.signinemail,
        password: this.state.signinpassword
    }

    axios({
        
        method: 'post',
        url: '/user/signin',
        data: body,
        header: { 'Content-Type': 'application/json' }


    })
    .then(response => {
        
        sessionStorage.setItem('userkey', response.data.token)
        sessionStorage.setItem('useremail', response.data.email)
        sessionStorage.setItem('username', response.data.userName)
        localStorage.setItem('userId', JSON.stringify(response.data.userId))
        
        this.setState({
            status: response.status,
        });
        
        
        this.props.toggleLoggedIn();

    })
    .catch(err => {
        console.log(err);
        this.setState({
            status: 'Invalid Password or Email!'
        })
    })
}










render(){
    return(
        <div className='signinwrapper col-md-12'>
            
            <div className='signinheading'>
            <p>Einloggen</p>
            </div>     
            
            <div className='signin'>
            <form >
                <input className='signinput' id='signinemail' placeholder='Email' onChange={this.handleChange.bind(this)} ></input>
                    <input className='signinput' id='signinpassword' type='password' placeholder='Passwort' onChange={this.handleChange.bind(this)}></input> 
                <div className='signplaceholder'><p>{this.state.status}</p></div>
                <button onClick={this.handleClick.bind(this)} className='signinputbtn' type='button' >Login</button>
            </form>
             
            </div>

         </div>

    )
}

}



export default SignIn;