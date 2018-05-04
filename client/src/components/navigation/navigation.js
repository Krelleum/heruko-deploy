import React, { Component } from 'react';
import './navigation.css';
// import SignUp from '../signup/signup';
import InfoBox from '../infobox/infobox';

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }



    logout() {
        sessionStorage.removeItem('userkey');
        sessionStorage.removeItem('useremail');
        localStorage.removeItem('userId');
        this.props.toggleLoggedOut();
    }



    // renderButtons()
    // Decides Wether to render full Navbar if user is logged in and has a Token in sessionStorage
    // or just Feed and Login Navbar Items if user is logged out and has no Token in sessionStorage
    renderButtons(){
        let existingToken = sessionStorage.getItem('userkey');
        if(existingToken){
            return (
                <div className="navbar-nav">

                    <a className="nav-item nav-link active">
                        <div onClick={this.props.toggleFeed} className='Feedbutton navbutton'>
                            <p>Feed</p>
                        </div> <span className="sr-only">(current)</span>
                    </a>




                    <a className="nav-item nav-link" >
                        <div onClick={this.props.toggleProfile} className='profilebutton navbutton'>
                            <p>My Profile</p>
                        </div>
                    </a>

                    <a className="nav-item nav-link" >
                        <div onClick={this.props.toggleUserPost} className='userpostsbutton navbutton'>
                            <p>My Posts</p>
                        </div>
                    </a>
                    <a className="nav-item nav-link" >
                        <div onClick={this.props.toggleVotedPost} className='userpostsbutton navbutton'>
                            <p>My Votes</p>
                        </div>
                    </a>




                    <a className="nav-item nav-link" >
                        <div className='logout navbutton'>
                            <p onClick={this.logout.bind(this)}>{existingToken ? 'Logout' : 'Login'}</p>
                        </div>
                    </a>


                </div>
            )
        }else{
            return (
                <div className="navbar-nav">

                    <a className="nav-item nav-link active">
                        <div onClick={this.props.toggleFeed} className='Feedbutton navbutton'>
                            <p>Feed</p>
                        </div> <span className="sr-only">(current)</span>
                    </a>




                    <a className="nav-item nav-link" >
                        <div className='logout navbutton'>
                            <p onClick={this.logout.bind(this)}>{existingToken ? 'Logout' : 'Login'}</p>
                        </div>
                    </a>


                </div>
            )
        }
    }



    render() {

        let existingToken = sessionStorage.getItem('userkey');
        

        return (

            <nav className="navbar navbar-expand-lg  bg-light">

                <a className="navbar-brand" >FEEDBCK</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon">+</span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    {this.renderButtons()}

                </div>
                <div className="nav-infobox" >
                    <InfoBox />
                </div>
            </nav>

        );
    }
}

export default Navbar;
