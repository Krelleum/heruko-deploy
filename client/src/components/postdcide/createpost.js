import React, { Component } from 'react';
import './createpost.css';
import axios from 'axios';
import ImageUploader from './imageuploader';
import FailedAuth from '../failedauth/failedauth';



class CreatePost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            post: false,
            image: 'noImage',
            file: '',
            unauthorized: false,
        }
    }



    // Set state Unauthorized to true in order to render Error Message (failedauth.js) for User
    setUnauthorized(){
        this.setState({unauthorized: true})
    }

    renderUnauthorized(){
        if(this.state.unauthorized === false){
            return null
        }else if(this.state.unauthorized === true){
            return <FailedAuth/>
        }
    }

    // recieves the Imagefile Form-Data Object from Child
    recieveFile(file) {
        this.setState({
            file: file
        })
    }

    //************************************************************************************
    // Handle Submit *most Complicated Function*
    //
    // Const file : Loads the imagefile itself as a Form-Data-Object from state.
    // (the Imagefile was received by the ImageUploader with Method recieveFile())
    //
    // Case 1 -If file exists (User clicked on Add Image and did choose an Image to upload)
    //         Post Image via axios to Multer-Single-Upload Endpoint. Image is posted as data:file
    //         After File is send the nested Axios call will send the actual Post Text from this.state.Post
    //         Important - the ImagePath is recieved as a promise in first .then call (result.data.result.image)
    //         and send as the var Body imagePath property(string).
    //
    //          Afterwards updateUser() is called with PostId as an Argument. UpdateUser() will
    //          patch the User in DB according to Userid in localStorage and add the received PostId to
    //          createdPosts Array
    //
    // Case 2 - File does not exist.(User only Typed Text in Textfield without Image upload)
    //          The if statements first Block will be ignored and the Else block triggers wich skips
    //          uploading via Multer Endpoint and storing the ImagePath in Post Object in DB.
    //
    // *********************************************************************************************************

    handleSubmit() {

        // sends Image to Server if there is a Image loaded

        const file = this.state.file;
// ***********************************************IF BLOCK************************************************************
        if (file !== '') {

            axios({
                method: 'post',
                url: '/image',
                headers:
                {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': sessionStorage.getItem('userkey'),
                },
                data: file,
            })


                .then(result => {
                        console.log(result);
                        const email = sessionStorage.getItem('useremail')
                        //  SENDS ACTUAL POST TO THE DATABASE
                        var body = {
                            post: this.state.post,
                            author: email,
                            imagePath: result.data.result.image,
                            imageId: result.data.result._id,
                        }

                        axios({

                            method: 'post',
                            url: '/createpost',
                            data: body,
                            headers:
                                {
                                    'Content-Type': 'application/json',
                                    'Authorization': sessionStorage.getItem('userkey'),
                                }

                        })
                            .then(response => {

                                updateUser(response.data.createdProduct._id);
                                // RECIEVES A SET STATE METHOD OF PARENT TO FORCE RERENDER
                                this.props.updateParent();

                            })

                            .catch(function (error) {

                                console.log(error);
                            });

                })
                .catch(err => {
                    this.setUnauthorized()
                    console.log(err);
                })

        }
// ***********************************************ELSE BLOCK************************************************************
        else {

            const email = sessionStorage.getItem('useremail')
            //  SENDS ACTUAL POST TO THE DATABASE
            var body = {
                post: this.state.post,
                author: email,
                imagePath: '',
            }



            axios({

                method: 'post',
                url: '/createpost',
                data: body,
                headers:
                    {
                        'Content-Type': 'application/json',
                        'Authorization': sessionStorage.getItem('userkey'),
                }

            })
                .then(response => {

                    updateUser(response.data.createdProduct._id);
                    // RECIEVES A SET STATE METHOD OF PARENT TO FORCE RERENDER
                    this.props.updateParent();

                })
                .catch(error => {


                    this.setUnauthorized()
                    console.log(error);
                });

        }

        // ADDS POST ID TO THE USER WHO CREATED THE POST


        function updateUser(postId) {

            let updateBody = {
                createdPost: postId
            }

            let userId = JSON.parse(localStorage.getItem('userId'))

            axios({
                method: 'patch',
                url: '/user/patchusercreated/' + userId,
                data: updateBody,
                headers:
                    {
                        'Content-Type': 'application/json',
                        'Authorization': sessionStorage.getItem('userkey'),
                    }
            })
                .then(function (response) {
                    console.log('UPDATED POST ID');
                })
                .catch(function (error) {
                    console.log(error)
                })
        };

    }







    // Handlet die Eingabe und setzt den State mit der Eingabe mit jedem Buchstaben gleich.

    handleChange(e) {
        e.preventDefault();
        this.setState({
            post: e.target.value
        });
    }




    render() {
        return (
            <div className='container'>
                <div className='row'>
                    <div className='col-md-12 createpost'>
                        <form>
                            <h4>Get Feedback!</h4>
                            <p>Post your Question and let the Crowd decide!</p>

                            <textarea placeholder='Should I go to the Party tonight?' maxLength="150"  id='createposttextfield' onChange={this.handleChange.bind(this)}></textarea><br></br>

                            {this.renderUnauthorized()}
                            <ImageUploader sendFileToParent={this.recieveFile.bind(this)} />
                            <button id='createbutton' className="btn btn-primary" type="button" onClick={this.handleSubmit.bind(this)}>Posten</button>
                        </form>
                    </div>

                </div>
            </div>
        );
    }
}

export default CreatePost;
