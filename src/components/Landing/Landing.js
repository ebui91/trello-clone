import React, { Component } from 'react';
// import axios from 'axios';
import { connect } from 'react-redux'
import { reqUser, login } from '../../redux/reducer';

class Landing extends Component{    
    componentDidMount(){
        this.props.reqUser;
    }
    
    render(){
        return(
            <div>
                <h1>Trello</h1>
                <button onClick={()=> this.props.login()}>LOGIN</button>
            </div>
        )
    }
}

const mapStateToProps= (state)=> {
    const { user, logged }= state;
    return { user, logged };
};

export default connect(mapStateToProps, { reqUser, login })(Landing);