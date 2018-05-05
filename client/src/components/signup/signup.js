import React, { Component } from 'react';
import './signup.css';
import axios from 'axios';


class SignUp extends Component{
    constructor(props){
        super(props);
        this.state = {
            status:''
        }
    }


handleChange(e){
    e.preventDefault();

    const property = e.target.id;
    const value = e.target.value

    this.setState({
        [property]: value
    })

    console.log(this.state);
}


handleSubmit(){
    var body = {
        email: this.state.signupemail,
        password: this.state.signuppassword
    }

    axios({
        method: 'post',
        url:'/user/signup',
        data: body,
        header: {'Content-Type': 'application/json'}
    })
    .then(response =>{
        console.log(response.status);

        this.setState({ status: 'Konto Erstellt!'});


        })
    .catch(error =>{
        console.log(error);
        this.setState({ status:'Email existiert bereits!' })
    })
}




render(){
    return(
        <div className='signupwrapper col-md-12'>

            <div className='signupheading'>
            <p>Sign Up</p>
            </div>

            <div className='signup'>
            <form>
                    
                <input className='signinput' id='signupemail' placeholder='Email' onChange={this.handleChange.bind(this)} ></input>
                    <input className='signinput' id='signuppassword' type='password' placeholder='Passwort' onChange={this.handleChange.bind(this)}></input>
                    <div className='signplaceholder'><p>{this.state.status}</p></div>
                    <button onClick={this.handleSubmit.bind(this)} className='signinputbtn'  type='button'>Sign Up</button>
            </form>
            </div>

         </div>

    )
}

}



export default SignUp;
