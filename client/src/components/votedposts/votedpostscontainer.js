import React, { Component } from 'react';
import axios from 'axios';
import VotedPosts from './votedposts';


class VotedPostsContainer extends Component{
    
    constructor(props){
        super(props);
        this.state = {
            postIds: [],
            data: [],
        }
    }


componentDidMount(){
    // Axios GET Request to load Array of PostId's  into state
    this.getData();

  

}

getData(){

    var userId = JSON.parse(localStorage.getItem('userId'));
    var userKey = sessionStorage.getItem('userkey')

    axios({
        method: 'get',
        url: '/user/' + userId,
        headers: {
            'Authorization': userKey,
        }
    })
        .then(response => {
            this.setState({
                postIds: response.data.votedPosts,
            })
            this.getPosts();
        })
        .catch(err => {
            console.log(err)
        })
    



}



// Loads Data from Database and Server according to this.state.postIds
getPosts(){
   
   
    var postIds = this.state.postIds;

    postIds.map(i => 
        axios({
            method: 'get',
            url: '/createpost/' + i,
        })
        .then(response => {
            this.setState({ data: [...this.state.data, response.data]})
            
        })
        
    )
}





    render(){
      
        var data = this.state.data;
        // Filters the Data from Server/DB and returns only valid Posts that are still existing!
        var newdata = data.filter(i => i.post !== null).reverse();
            
        
       
        return (
            <div className='container votedpostcontainer'> 
            
            {newdata.map((obj, index)=>
               
                <VotedPosts 
                key={index}
                data={obj.post}
                />
            )}
            
            
            
            
            </div>
        )
    }
}


export default VotedPostsContainer;