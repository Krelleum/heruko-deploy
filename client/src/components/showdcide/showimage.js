import React, { Component} from 'react';
import './showimage.css';

class ShowImage extends Component{
    constructor(props){
        super(props);
        this.state = {

        }
    }


    render(){
        return(
            <div className='col-md-12 showimage'>
                <img src={this.props.path} alt='posted by User'></img>
            </div>
        )
    }
}

export default ShowImage;