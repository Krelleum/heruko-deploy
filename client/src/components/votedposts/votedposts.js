import React, { Component } from 'react';
import './votedposts.css';



class VotedPosts extends Component{



// Decides wether to render Red or Green Box depending on Vote for Yes or vote for No

  checkvote(){
   const userId =  localStorage.getItem('userId')
   const yesIncludes = this.props.data.votedYes.includes(userId);
   const noIncludes = this.props.data.votedNo.includes(userId);
   console.log(yesIncludes);
   console.log(noIncludes);

   if(yesIncludes == true){
       return (

       <div className='col-md-3 votedposts votedpostsgreen'>

           <p>You Voted Yes</p>
           <p>{this.props.data.post}</p>



       </div>
       )
   }else if (noIncludes == true){
       return (

           <div className='col-md-3 votedposts votedpostsred'>

               <p>You Voted No</p>
               <p>{this.props.data.post}</p>



           </div>
       )
   }
   else {
       return <div><p>Error</p></div>
   }
}





  render(){
      return(
          <div>


              {this.checkvote()}



          </div>
      )
  }


}
















export default VotedPosts;
