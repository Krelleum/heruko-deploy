import React, { Component } from 'react';
import axios from 'axios';
import './deleteuser.css';



class DeleteUser extends Component{
 



    deleteUser() {
        const userId = JSON.parse(localStorage.getItem('userId'));

        axios({
            method: 'delete',
            url: '/user/delete/' + userId,
            headers: { 'Authorization': sessionStorage.getItem('userkey') },
        })
            .then(response => {
                console.log(response);
            })
            .catch(err => {
                console.log(err)
            })
    }






    render(){
        return(
            <div className='col-md-9 deleteuseraccount'>
                <div className='col-md-12 deleteuseraccountheading'>
                    <p>Account wirklich löschen? Dies kann nicht rückgängig gemacht werden</p>
                    <button id='deleteuserclosebutton' onClick={this.props.setShowCloseParent.bind(this)}>Schließen</button>
                </div>
                
                <div className='col-md-6 deleteuseraccountbuttons'>
                    <button  id='deleteaccountyes' onClick={this.deleteUser.bind(this)}>Yes</button>
                    <button id='deleteaccountno' onClick={this.props.setShowCloseParent.bind(this)}>No</button>
                </div>
            </div>
        )
    }
}

export default DeleteUser;