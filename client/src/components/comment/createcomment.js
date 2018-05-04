import React, { Component } from  'react';
import axios from 'axios';

class CreateComment extends Component{
    constructor(props){
        super(props);
            this.state = {
                inputData: '',
            }
    }


handleChange(e){
    
    let textFieldData = e.target.value;

    this.setState({
        inputData: textFieldData,
    })
    console.log(this.state.inputData);
}



onSend(){

    const storedUserId = JSON.parse(localStorage.getItem('userId'));
    const storedComment = this.state.inputData;
    const storedAuthor = sessionStorage.getItem('useremail');
    
    let body = {
        comment: storedComment,
        commentAuthor: storedAuthor,
        userId: storedUserId,
        postId: this.props.postId,
        postAuthor: this.props.author,
    }

    axios({
        method: 'post',
        url: 'http://localhost:5000/comment/createcomment/' + this.props.postId,
        data: body,
        headers: { 'Authorization': sessionStorage.getItem('userkey')}
    })
    .then(response => {
        if(response.status === 201){
        this.props.updateCommentByParent();
        
        }
    })
    .catch(err => {
        alert('You must be Signed In to Submit a Comment !')
        console.log(err)
    });

    this.inputField.value = '';
   
}




    render(){
        return(
            <div>
                <div className='createcommentheading'>
                    <p>Erstelle Kommentar</p>
                </div>
                <div className='createcommentinput'>
                    
                    <input type='text'
                     ref={element => this.inputField = element}
                     id='createcommentfield' 
                     onChange={this.handleChange.bind(this)}>
                     </input>

                </div>
                <div className='createcommentbutton'>
                    <button onClick={this.onSend.bind(this)}>Send</button>
                </div>
            </div>
        )
    }
}

export default CreateComment;
