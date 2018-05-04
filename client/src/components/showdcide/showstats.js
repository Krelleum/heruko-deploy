import React, { Component } from 'react';
import axios from 'axios';
import './showstats.css';


class ShowStats extends Component {
    constructor(props){
        super(props);
        this.state = {
            
        }
    }

// FETCHES DATA FROM SERVER WITH A TIMEOUT TO PREVENT COMPONENT RENDERING WITHOUT MOST RECENT DATA
componentDidMount() {
    
    
setTimeout(
    
    function(){

        axios({

            method: 'get',
            url: '/createpost/' + this.props.id,
        })
            .then((response) => {
               
                this.setState({ data: response.data });
               
            })
            .catch(function (error) {
                console.log(error);
            }) 
        }.bind(this), 300     
    )   
            
}

renderUserVote(){
    var userId = localStorage.getItem('userId');
    var voteYes = this.state.data.post.votedYes;
    var voteNo = this.state.data.post.votedNo;
    var voteYesIncludes = voteYes.includes(userId);
    var voteNoIncludes =  voteNo.includes(userId);
   
    if(voteYesIncludes){
        return(
            <div className='col-md-12 uservotedyes'>
                <p>You voted Yes</p>
            </div>
        )
    }else if(voteNoIncludes){
        return(
            <div className='col-md-12 uservotedno'>
                <p>You voted No</p>
            </div>
        )
    }else{
        return null
    }


}
// CHECKS IF STATE HAS FETCHED ALL DATA ... IF SO RETURNS THE POSITIVE RESPONSES FROM STATE

    renderWhenReady(){
      
        if(!this.state.data){
            return <p id='loading'>loading...</p>;
        }
        
        else{

            

            const posRes = this.state.data.post.posResponses;
            const negRes = this.state.data.post.negResponses;
            const allRes = this.state.data.post.allResponses;
            
            const posPercent = posRes * 100 / allRes;
            const negPercent = negRes * 100 / allRes;
            
            return( 
            
            
            <div className='col-md-12 showstatscontainer'>
                   {this.renderUserVote()}
         
               
                <div className='bars col-md-6'>    
                   
                    <div className="statswrapperleft">
                        <div id='positivebarwrapper'>
                                <div style={{ height: (posPercent*1.5) }} id='actualposbar'><p>{Math.round(posPercent)}% </p></div>
                        </div>
                    </div>
             
                    <div className="statswrapperright">
                        <div id='negativebarwrapper'>
                                <div style={{ height: (negPercent*1.5) }} id='actualnegbar'><p>{Math.round(negPercent)}% </p></div>
                        </div>
                    </div>
                        
                     </div>    

                </div>
                
            
            )
        }

    }
    
  


    render() {
        return (
            <div>
                <div className='showstats'>
                    
                    {this.renderWhenReady()}
                </div>



            </div>
        );
    }
}

export default ShowStats;





