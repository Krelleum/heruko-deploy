import React, { Component } from 'react';
import './signguest.css';




class SignGuest extends Component{

    render(){
        return(
            <div className='row'>
            <div className='signguestwrapper col-md-6 offset-md-3'>

               

                <div className='signguest col-md-6'>
                    
                        <p>Melde dich als Gast an</p>
                        <p>Du kannst Beiträge sehen aber nicht Posten</p>
                        
                </div>
                <div className='signguestbtn col-md-6'>
                        <p>Als Gast</p>
                </div>

                   

            </div>
            </div>
        )
    }
}

export default SignGuest;