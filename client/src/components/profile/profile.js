import React, {Component} from 'react';
import './profile.css';
import axios from 'axios';
import DeleteUser from './deleteuser';

class Profile extends Component{
    constructor(props){
        super(props);
        this.state = {
            data: '',
            firstLetter:'',
            length:'',
            show: 'nothing',
        }
    }






componentDidMount(){
    
    var userId = JSON.parse(localStorage.getItem('userId'));
    var userKey = sessionStorage.getItem('userkey');
    
    axios({
        method : 'get', 
        url: '/user/' + userId,
        headers: { 'Authorization': userKey }
    })
    .then(response => {
        this.setState({data: response.data});
        this.setFirstLetter(response.data.email);      
    })
    .catch(err => {
        console.log(err);
    });

    
}    

setFirstLetter(data){
    const userName = data;
    this.setState({firstLetter :userName.charAt(0), }) 
}



// Handle Rendering of Individual Settings Menu

handleSettings(){
    if(this.state.show === 'nothing'){
        return null
    }
    else if (this.state.show === 'deleteUser'){
        return <DeleteUser setShowCloseParent={this.setShowClose.bind(this)}/>
    }
}






setShowDeleteUser(){
    this.setState({
        show: 'deleteUser'
    })
}


setShowClose(){
    this.setState({
        show:'nothing'
    })
}







render(){
    

    return(
        <div>
           
           
            <div className='col-md-12 profilecontainer'>
                
                <div className='profilewrapper'>
                    
                    <div className='col-md-4 profilepicture'>
                        <p>{this.state.firstLetter}</p>
                    </div>
                    
                  

                    <div className='col-md-8 profileusersettings'>
                        <div className='profileusersettingsheading'>
                            <p>Einstellungen</p>
                        </div>
                        

                        {this.handleSettings()}



                            <div className='col-md-3 profileusersetting profileusersetting1'>
                                <h2>Profilbild ändern</h2>
                                <p>Lade hier dein neues Profilbild hoch!</p>
                            </div>
                            <div className='col-md-3 profileusersetting profileusersetting2'>
                                <h2>Passwort ändern</h2>
                                <p>Ändere hier dein Benutzer-Passwort.</p>
                            </div>
                            <div className='col-md-3 profileusersetting profileusersetting3'>
                                <h2>Posts löschen</h2>
                                <p>Lösche hier alle deine Posts.</p>
                            </div>
                            <div className='col-md-3 profileusersetting profileusersetting4' onClick={this.setShowDeleteUser.bind(this)}>
                                <h2>Account löschen</h2>
                                <p>Lösche hier deinen Account.</p>
                            </div>
                            <div className='col-md-3 profileusersetting profileusersetting5'>
                                <h2>Gib uns Feedback</h2>
                                <p>Anregungen oder Bugs? Bitte hier melden!</p>
                            </div>
                    </div>
                </div>

                   
                </div> 
            </div>
            
        
    )
}
}

export default Profile;