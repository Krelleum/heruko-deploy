import React, { Component } from 'react';
import axios from 'axios';
import './showpost.css';


class ButtonYes extends Component {
    constructor(props){
        super(props);
        this.state = {
            unauthorized: false,
        }
    }







    
handleClick(){
 

    var body = { userId: localStorage.getItem('userId') };
// First Axios Call patches Positive Responses, All Responses and VotedBy Array in PostObj Model in DB 
    axios({

        method: 'patch',
        url: "/createpost/" + this.props.id +"/yes",
        data: body,
        headers:
            {
                'Authorization': sessionStorage.getItem('userkey'),
            }

    })
        .then(response => {        
           console.log(response.status);
    })
        .catch(error => {

           console.log(error) 
            alert('In order to Submit a Vote you must be signed In') 
        });
// CHANGES THE VIEW STATE OF BUTTONS IN PARENTS COMPONENT
    this.props.handleStateByChild()
    

// SECOND AXIOS CALL PATCHES VOTEDPOSTS ARRAY IN USER MODEL IN DB



        let updateBody = {
            votedPost: this.props.id
        }

        let userId = JSON.parse(localStorage.getItem('userId'))

        axios({
            method: 'patch',
            url: 'http://localhost:5000/user/patchuservoted/' + userId,
            data: updateBody,
            headers:
                {
                    'Content-Type': 'application/json',
                    'Authorization': sessionStorage.getItem('userkey'),
                }
        })
            .then(function (response) {
                console.log('UPDATED VOTED BY');
            })
            .catch(function (error) {
                console.log(error, 'Unable to Update VOTEDPOSTS IN USER MODEL IN DB')
            })
      







}



    render() {
        return (
            <div className="buttonyes showbutton">
                <button onClick={this.handleClick.bind(this)}>YES</button>
            </div>
        );
    }
}

export default ButtonYes;
