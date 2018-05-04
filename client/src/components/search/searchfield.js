import React, { Component } from 'react';
import './search.css';

class SearchField extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

// Grabs Input and Transfers it to Parents State and Triggers Render of Search Component
handleChange(e){
    let input = e.target.value;
    
    if(input !== '' && input !== ' '){
        this.props.toggleSearch();
        this.props.inputToParent(input);
        
    }
}






    render() {
        return (
            <div className='container searchcontainer'>
                <div className='col-md-8 search'>
                    
                    <input type='text' placeholder='Suche' id='searchfieldinput' onChange={this.handleChange.bind(this)}></input>
                    
                </div>
            </div>
        )
    }
}

export default SearchField;