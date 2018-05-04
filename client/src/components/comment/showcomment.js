import React, { Component } from 'react';
import './comment.css';

class ShowComment extends Component {
    constructor(props){
        super(props);
        this.state = {

        }
    }

    render(){
        return(
            <div className='showcomment'>
                <div className='showcommentauthor'>
                    <p>@{this.props.commentAuthor}</p>
                </div>
                <div className='showcommenttext'>
                    <p>{this.props.comment}</p>
                </div>
            </div>    
        )
    }
}

export default ShowComment;