import React, { Component } from 'react';
import axios from 'axios';
import ActualUserPosts from './actualuserposts';
import './userposts.css';   


class UserPosts extends Component{

    constructor(props){
        super(props);
        this.state = {
            postIds : [],
            data:[],
        }
    }



componentDidMount(){
  
   this.getData();
}

// FILLS THE STATE WITH AN ARRAY OF CREATED POSTS(POST ID's)
getData(){
    const userId = JSON.parse(localStorage.getItem('userId'));
    const userKey = sessionStorage.getItem('userkey');

    axios({
        method: 'get',
        url:'/user/' + userId,
        headers:{'Authorization': userKey}

    })
    .then(response => {
        this.setState({
            postIds: response.data.createdPosts
        })
        
        this.getPosts();
       
    })
    .catch(err => {
        console.log(err);
    })
    
}


// GETS POSTS WITCH A MATCHING  POST ID'S AND SAVES THEM IN STATE.DATA

getPosts(){
    
    let postIds = this.state.postIds;

    postIds.map(i => 
        axios({
            method: 'get',
            url: '/createpost/' + i,
        })
        .then(response => {
            
            this.setState({data: [...this.state.data, response.data]});
           
        })
    )

    
}




deletePost(postToDelete, imagePath, imageId){
    
    const userId = JSON.parse(localStorage.getItem('userId'));
    const body = {
        postToDelete: postToDelete
    }

    console.log(imageId);




// DELETES THE POSTID FROM CREATED POSTS ARRAY IN USERACCOUNT  
    axios({
        method: 'patch',
        url: '/user/deletepostid/' + userId ,
        data: body,
        headers: { 'Authorization': sessionStorage.getItem('userkey')}
    })
    .then(response => {
        this.setState({data: []});
        this.getData();
        
    })
    .catch(err => {
        console.log(err);
    });


    // DELETES IMAGE OF POST - IN FS and in MONGODB
    // ********************IMPORTANT***************************************************
    // This is an axios DELETE Request with a Body. If there are any Problems with
    // deleting an Image change Data to be send in the header. 
    // ********************************************************************************
    if(imagePath){
    let deletebody = {
        imageId: imageId,
        imagePath: imagePath,
    }


    axios({
        method: 'delete',
        url: '/image/delete',
        data: deletebody,
        headers:{
            'Content-Type':'application/json',
            'Authorization': sessionStorage.getItem('userkey')            
        }
    })
    .then(response => {
        console.log(response);
    })
    .catch(err => {
        console.log(err);
    })
    }else{
        console.log('no image to delete')
    }




    // DELETES ALL COMMENTS SUBMITTED TO THE POST
    axios({
        method: 'delete',
        url: '/comment/deletecomment/' + postToDelete,
        headers:
            {
               
                'Authorization': sessionStorage.getItem('userkey'),
            }
    })
        .then(response => {
            console.log(response);

        })
        .catch(err => {
            console.log(err);
        });


// DELETES THE POST ITSELF
    axios({
        method:'delete',
        url: '/createpost/deletepost/' + postToDelete,
        headers:
            {
                
                'Authorization': sessionStorage.getItem('userkey'),
            }

    })
    .then(response => {
        console.log(response);

    })
    .catch(err => {
        console.log(err);
    });

}
    







    render(){

        const data = this.state.data;
        const newdata = data.reverse();

        return(
            
            <div className='container userpostcontainer'>
                
                {newdata.map((obj, index) => 
                    <ActualUserPosts key={index} data={obj.post} deletePost={this.deletePost.bind(this)}/>
                )}
                
                
                

            </div>
            
        )
    }
}


export default UserPosts;