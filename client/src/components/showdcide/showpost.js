import React, { Component } from 'react';
import ButtonYes from './buttonyes.js';
import ButtonNo from './buttonno.js';
import ShowStats from './showstats.js';
import './showpost.css';
import CommentsContainer from '../comment/commentscontainer.js';
import ShowImage from './showimage';


class ShowPost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showStats: false,
        }
    }

    // ****************************************************************
    // handleStateChange() is passed as a Prop to the <ButtonYes/>
    // and <ButtonNo/> Component. As soon as one of the Buttons
    // is clicked the function is triggered and this.state.showStats
    // will be changed to true...
    //
    // ... resulting in showButtons() else Statement will be executed
    // rendering the <ShowStats/> Component
    // *****************************************************************




    handleStateChange() {
        this.setState({showStats: true});
    }


    // *****************************************************************
    // showButtons() decides if the Votebuttons get rendered.
    // It gets the UserId from localStorage and Checks if
    // the  votedBy Array includes the  UserID (let isIncluded).
    //
    // If the UserId is not Included and this.state.showStats is
    // false, the Function returns a div containing <ButtonYes/> and
    // <ButtonNo/> Component...
    //
    //
    // If the UserId is included the <Showstats/> Component is returned!
    // ******************************************************************


    showButtons() {

        let votedBy = this.props.votedBy;
        let userId = localStorage.getItem('userId');
        let isIncluded = votedBy.includes(userId);

        if (!this.state.showStats && !isIncluded) {
            return (
                <div className='postbuttons'>
                    <ButtonYes handleStateByChild={this.handleStateChange.bind(this)} id={this.props._id} />
                    <ButtonNo handleStateByChild={this.handleStateChange.bind(this)} id={this.props._id} />
                </div>
            )
        }
        else {
                return <ShowStats id={this.props._id} />

        }



    };



    // *****************************************************
    // createTime() recieves the Timestamp from DB as props.
    // let newDate stores the current time in a variable in
    // order to compare Current Time and the Time the Post was
    // created.
    // ******************************************************
    createTime() {

        if (this.props.time) {

            let olddate = new Date(this.props.time);
            let newdate = new Date();

            let oldmillisec = olddate.getTime();
            let newmillisec = newdate.getTime();
            let millisecresult = newmillisec - oldmillisec;

            var hours = (millisecresult / (1000 * 60 * 60)).toFixed(0);
            var minutes = (millisecresult / (1000 * 60)).toFixed(0);
            var days = (hours / 24).toFixed(0);

            if (hours < 1) {
                return minutes + ' Minutes';
            }
            else if (hours >= 24) {
                return days + ' Days'
            } else {
                return hours + ' Hours';
            }
        }
    }

    renderImage() {
        console.log('showpostpath:' + this.props.path)
        if (this.props.path && this.props.path !== 'noImage') {
            return <ShowImage path={this.props.path} />
        }
        else {
            return null
        }
    }


    render() {


        return (

            <div className="col-md-5 actualpost" >
                {this.renderImage()}
                <div className='actualpostheader'>
                    <div className='postheaderleft'>

                        <p>@{this.props.authorusername ? this.props.authorusername : this.props.author}</p>
                    </div>

                    <div className='postheaderright'>
                        <p id='votedbylength'>{this.props.votedBy.length} Votes </p>
                        <p>{this.createTime()} ago</p>

                    </div>
                </div>



                <div className='posttext'>
                    <p>{this.props.post}</p>
                </div>

                <div className='postbuttonsresult'>
                    {this.showButtons()}
                </div>

                <CommentsContainer
                    postId={this.props._id}
                    author={this.props.author}
                />
            </div>

        );
    }
}

export default ShowPost;
