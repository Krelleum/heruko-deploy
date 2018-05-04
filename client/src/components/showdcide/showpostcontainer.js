import React, { Component } from 'react';
import './showpost.css';
import axios from 'axios';
import ShowPost from './showpost.js';


class ShowPostContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            offset: 1,
            post: false,
            data: [],
            
        }
    }







componentWillMount(){
   

    axios({

        method: 'get',
        url: '/createpost'
     })
        .then((response) => {
           
            this.setState({data: response.data});
           
        })
        .catch(function (error) {
            console.log(error);
        });

    
}





componentDidMount(){
    window.addEventListener('scroll', this.onScroll, false);
}

componentWillUnmount(){
    window.removeEventListener('scroll', this.onScroll, false);
}







renderOnScroll(offset){

    axios({

        method: 'get',
        url: '/createpost/offset/' + offset,
    })
        .then((response) => {
            
            this.setState({ data: response.data });
            
        })
        .catch(function (error) {
            console.log(error);
        });
}


 onScroll = () => {
         if ((window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 100)) {
            this.setState({offset: this.state.offset + 5})
            this.renderOnScroll(this.state.offset);
        }
    }

   


   




    render() {
        
        const torender = this.state.data;

        return (
                 
        <div className='container'>
        
           {torender.map((obj, index) => 
                    
                 <ShowPost 
                    key={index}
                    post={obj.post} 
                    _id = {obj._id}
                    votedBy = {obj.votedBy}
                    time= {obj.time}
                    author= {obj.author}
                    path={obj.imagePath}
                    />
                   
            )}
            </div>
            
        );
    }
}

export default ShowPostContainer;