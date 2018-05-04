import React, { Component } from 'react';
import ShowCommentContainer from '../comment/showcommentcontainer';
import './userposts.css';
class ActualUserPosts extends Component {
    constructor(props){
        super(props);
        this.state = {
            showComments: false,
        }
    }



getPosPercent(){
    
    const posRes = this.props.data.posResponses;
    const allRes = this.props.data.allResponses;
    if(posRes !== 0){
        return (posRes / allRes * 100).toFixed() + '%';
    }else {
        return '0%'
    }

}

getNegPercent(){
    
    const negRes = this.props.data.negResponses;
    const allRes = this.props.data.allResponses;
    if(negRes !== 0){
        return (negRes / allRes * 100).toFixed() + '%';
    }else {
        return '0%'
    }

}

renderResult(){
    
    const negRes = this.props.data.negResponses;
    const posRes = this.props.data.posResponses;
    const allRes = this.props.data.allResponses;

    if(posRes > negRes){
        if(allRes > 1){
        return (
            <div className='userresultyes userresultshow'>
                <p className='userresultheading'>{allRes} Nutzer haben abgestimmt:</p>
                <p>Yes</p>
            </div>
        )
    }else{
        return (
            <div className='userresultyes userresultshow'>
                <p className='userresultheading'>{allRes} Nutzer hat abgestimmt:</p>
                <p>Yes</p>
            </div>
        )

    }
    }else if (negRes > posRes){
        return(
            <div className='userresultno userresultshow'>
            <p className='userresultheading'>{allRes} Nutzer haben abgestimmt:</p>
                <p>No</p>
            </div>
        )
    }else {
        return(
            <div className='userresulttie userresultshow'>
            <p className='userresultheading'>{allRes} Nutzer haben abgestimmt:</p>
                <p>Tie</p>
            </div>    
        )
    }
}

toggleComments(){
    if(this.state.showComments){
        this.setState({
            showComments: false
        })
    }else{
        this.setState({
            showComments: true
        })
    }
}

showComments(){
    if(this.state.showComments){
        return(
            <div className='userpostcomment'>
                <ShowCommentContainer postId={this.props.data._id} />
            </div>
        )
    }else{
        return null
    }
}



render(){
    return(
       
        <div className='col-md-4 userpostwrapper' >
            <div className='col-md-11 userpost'>
            <div className='col-md-12 userpostresult'>
                {this.renderResult()}
            </div>
            <div className='col-md-12 userpostleft'>
                
                <p>{this.props.data.post}</p>
            </div>

            <div className='col-md-12 userpostcenter'>
                
                <div className='userpostposres'>
                    <p>{this.getPosPercent()} </p>
                </div>
                
                <div className='userpostnegres'>
                    <p>{this.getNegPercent()}</p>
                </div>
                
                <div className='userpostallres'>

                </div>
                
            </div>

            <div className='col-md-4 userpostright'>
                <button onClick={() => {this.props.deletePost(this.props.data._id, this.props.data.imagePath, this.props.data.imageId)}}>Löschen</button>
            </div>
            <div className='col-md-12 userpostcommentwrapper' onClick={this.toggleComments.bind(this)}>
                <p id='userpostcommentbtn'>Mehr</p>
                {this.showComments()}
            </div>
           </div>
        </div>
    )
}









}


export default ActualUserPosts;