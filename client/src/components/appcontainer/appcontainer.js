import React, { Component } from 'react';
import LoggedIn from '../loggedin/loggedin';
import LoggedOut from '../loggedout/loggedout';
import axios from 'axios';
import './appcontainer.css'


class AppContainer extends Component{
    constructor(props){
        super(props);
        this.state = {
            show: 'loggedin'
        }
    }



    


    toRender(){
    if(this.state.show === 'loggedin'){
        return <LoggedIn toggleLoggedOut= {this.toggleLoggedOut.bind(this)} />
    } else if ( this.state.show === 'loggedout'){
        return <LoggedOut toggleLoggedIn= {this.toggleLoggedIn.bind(this)} />
    } else {
        return <div><p>AN ERROR OCCURED - TRY AGAIN LATER!!!</p></div>
    }
}





componentWillMount(){
    var token = {
        
        token: sessionStorage.getItem('userkey')
    
    }
    
    axios({
        
        method: 'post',
        url: 'http://localhost:5000/user/verify',
        data: token,
        header: { 'Content-Type': 'application/json' }
        
    })
    .then(response => {
        
      if(response.status === 200){
          this.toggleLoggedIn();
      }
            
       
    })
    .catch(function(error){
        console.log(error)
    })
}



toggleLoggedIn(){
    this.setState({show: 'loggedin'})
}



 toggleLoggedOut() {
    this.setState({ show: 'loggedout' })
}





render(){
    return(
        <div>
            {this.toRender()}
        </div>
    )
    }
}





export default AppContainer