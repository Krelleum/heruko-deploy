import React, { Component } from 'react';
import axios from 'axios';
import ShowComment from './showcomment';


class ShowCommentContainer extends Component{
    constructor(props){
        super(props);
        this.state = {
            
        }
    }




 componentDidMount(){
    axios({
        method: 'get',
        url:'/comment/getcomment/' + this.props.postId,

    })
    .then(response => {
        
        this.setState({data: response.data});
    })
    .catch(err => {
        console.log(err);
    })
}




    render(){
        let data = this.state.data;
        
        return(
             <div className='showcommentwrapper'>
               {data && data.map((obj, index) => 
                    <ShowComment
                    key= {index}
                    comment= {obj.comment}
                    commentAuthor= {obj.commentAuthor}
                    
                    
                    />
                )}  
             </div>
        )
    }
}

export default ShowCommentContainer;