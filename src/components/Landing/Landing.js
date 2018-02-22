import React, { Component } from 'react';
// import axios from 'axios';
import { connect } from 'react-redux'
import { reqUser, login } from '../../redux/reducer';
import './Landing.css';


class Landing extends Component{    
    componentDidMount(){
        this.props.reqUser;
    }
    
    render(){
        return(
            <div className="landing-container">
                <div className="login-container">
                    <div className="logo-container">
                        <div className="bars-container">
                            <div className="bar bar-1"></div>
                            <div className="bar bar-2"></div>
                            <div className="bar bar-3"></div>
                        </div>
        

                        <h1 className="landing-logo-text">Trello</h1>
                    </div>
                    
                    <button className="login-btn" onClick={()=> this.props.login()}>LOGIN</button>
                </div>

            </div>
        )
    }
}

const mapStateToProps= (state)=> {
    const { user, logged }= state;
    return { user, logged };
};

export default connect(mapStateToProps, { reqUser, login })(Landing);