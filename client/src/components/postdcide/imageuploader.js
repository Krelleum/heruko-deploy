import React, { Component } from 'react';

import './imageuploader.css';

class ImageUploader extends Component{



handleInput(e){
    
    const file = new FormData();
    let fileinput = e.target.files[0];
    file.append('file', fileinput);
    this.props.sendFileToParent(file);

}







render(){
    return(
        <div className='col-md-9 uploaderwrapper'>
        <label htmlFor='uploaderinput' id='uploaderlabel'>Add Image</label>
            <input type='file' id='uploaderinput' onChange={this.handleInput.bind(this)}></input>
        </div>
    )
}




}

export default ImageUploader;