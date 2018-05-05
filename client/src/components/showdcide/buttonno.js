import React, { Component } from 'react';
import axios from 'axios';
import './showpost.css';


class ButtonNo extends Component {

// SENDS PATCH REQUEST TO UPDATE THE VALUE OF negResponses in DB
    handleClick() {

        var body = { userId: localStorage.getItem('userId') };

        axios({

            method: 'patch',
            url: "/createpost/" + this.props.id + "/no",
            data: body,
            headers:
                {
                    'Authorization': sessionStorage.getItem('userkey'),
                },


        })
            .then(response => {
                if (response.status === 200) {

                }
            })
            .catch(error => {
                console.log(error);
                alert('In order to Submit a Vote you must be signed In')
            });

// CHANGES THE VIEW STATE OF BUTTONS IN PARENTS COMPONENT
        this.props.handleStateByChild()

// SECOND AXIOS CALL IN ORDER TO PATCH VOTEDPOSTS ARRAY IN USER OBJECT IN DB

        let updateBody = {
                    votedPost: this.props.id
                }

                let userId = JSON.parse(localStorage.getItem('userId'))

                axios({
                    method: 'patch',
                    url: '/user/patchuservoted/' + userId,
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
            <div className="buttonno showbutton">
                <button onClick={this.handleClick.bind(this)}>NO</button>
            </div>
        );
    }
}

export default ButtonNo;
