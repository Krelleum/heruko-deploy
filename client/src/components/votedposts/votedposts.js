import React, { Component } from 'react';
import './votedposts.css';    



class VotedPosts extends Component{
   


    render(){
        return(
            <div className='col-md-3 votedposts'>
                
                
                <p>{this.props.data.post}</p>
            
            
            
            </div>
        )
    }


}
















export default VotedPosts;