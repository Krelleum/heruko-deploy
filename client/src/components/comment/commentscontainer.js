import React, { Component} from 'react';

import CreateComment from './createcomment';
import ShowCommentContainer from './showcommentcontainer';
import './comment.css';


class CommentContainer extends Component {
    constructor(props){
        super(props)
        this.state = {
            show: false,
            postId: this.props.postId,
            data: '',
        }
    }


toggleComments(){

    if(this.state.show === false){
        this.setState({
            show: true
        })
    }else if(this.state.show === true){
        this.setState({
            show: false
        })
    }else {
        alert('error in toggleling CommentContainer State!')
    }
}

updateCommentsByChild(){
    this.setState({
        show:false
    })
    this.setState({
        show:true
    })
}

showComments(){
    if (this.state.show === true){
        return (
            <div>
                <CreateComment postId={this.props.postId} author={this.props.author} updateCommentByParent={this.updateCommentsByChild.bind(this)}/>
                <ShowCommentContainer postId={this.props.postId} />
            </div>
        )
    }else {
        return null
    }
}




render(){

    return(
        <div>
           <div className='commentcontainer'>
           <p id='commentcontainerbutton' onClick={this.toggleComments.bind(this)}>Comments</p> 
           <div className='commentcontainerextend'>
                {this.showComments()}
           </div>
           </div>
        </div>
    )
}

}

export default CommentContainer;
