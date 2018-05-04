import React, { Component } from 'react';
import NavBar from '../navigation/navigation';
import CreatePost from '../postdcide/createpost';
import ShowPostContainer from '../showdcide/showpostcontainer';
import Profile from '../profile/profile';
import UserPosts from '../userposts/userposts';
import SearchField from '../search/searchfield';
import ShowPost from '../showdcide/showpost';
import VotedPostsContainer from '../votedposts/votedpostscontainer';
import axios from 'axios';

class LoggedIn extends Component{
    constructor(props){
        super(props);
        this.state = {
            show: 'feed',
            
            data:[],
            
        }
    }



searchForPost(input){
    let search = input;

    
        axios({
            method: 'get',
            url: '/createpost/search/' + search,
        })
        .then(response => {
            this.setState({data: response.data});
            
        })
        .catch(error => {
            console.log(error);
        })
    
   
}






toRender(){

    const data = this.state.data;
    

    if(this.state.show === 'feed'){
        return (
           <div>
                <SearchField toggleSearch={this.handleStateSearch.bind(this)} inputToParent={this.handleSearchInput.bind(this)}/>
                <CreatePost updateParent={this.toggleUpdater.bind(this)} />
                <ShowPostContainer />
            </div> 
        )
    }else if(this.state.show === 'profile'){
        return (
            <div>
               <Profile/> 
            </div>
        )
    }else if(this.state.show === 'userposts'){
        return(
            <div>
                <UserPosts/>
            </div>    
        )
    }

    else if(this.state.show === 'votedposts'){
        return(
            <div>
                <VotedPostsContainer/>
            </div>
        )
    }

    else if(this.state.show === 'search'){
        
        
        if(data.length === 0){
            return (
                
            <div className='container'>
            <SearchField toggleSearch={this.handleStateSearch.bind(this)} inputToParent={this.handleSearchInput.bind(this)}/>
                <p id='noresult'>Keine Ergebnisse</p>

            </div>
                )
        }
        
        
        
        return(
            <div className='container'>
                <SearchField toggleSearch={this.handleStateSearch.bind(this)} inputToParent={this.handleSearchInput.bind(this)}/>
                {data.map((obj, index)=>
                    
                    <ShowPost
                        key={index}
                        post={obj.post}
                        _id={obj._id}
                        votedBy={obj.votedBy}
                        time={obj.time}
                        author={obj.author}
                        path={obj.imagePath}
                    />
                
                
                )}
            </div>
        )
    }
}


handleStateProfile(){
    this.setState({show: 'profile'})
}

handleStateFeed(){
    this.setState({show: 'feed'})
}

handleStateUserPosts(){
    this.setState({show: 'userposts'})
}

handleStateVotedPosts(){
    this.setState({show: 'votedposts'})
}

handleStateSearch(){
    this.setState({show: 'search'})
}
// As soon as a new Post is created System switches between Profile and Feed to force a Rerender and Show newest Post on top!
toggleUpdater(){
    this.setState({ show: 'profile'});
    this.setState({ show: 'feed'});
}



// Gets Input value from SearchField in SearchField.js and sets the Components state equal to the Input!
handleSearchInput(input){
    
    this.searchForPost(input);
   
}



render(){
    return(
        <div>
            <NavBar 
            toggleLoggedOut={this.props.toggleLoggedOut}
            toggleProfile={this.handleStateProfile.bind(this)}
            toggleFeed={this.handleStateFeed.bind(this)}
            toggleUserPost={this.handleStateUserPosts.bind(this)} 
            toggleVotedPost={this.handleStateVotedPosts.bind(this)} />
            {this.toRender()}
        </div>
    )
}


}



export default LoggedIn;