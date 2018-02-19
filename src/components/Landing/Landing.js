import React, { Component } from 'react';
import axios from 'axios';

class Landing extends Component{
    componentWillMount(){
        axios.get('http://localhost:3001/api/test').then(response=> {
            console.log(response.data);
        })
    }
    render(){
        return(
            <div>Landing</div>
        )
    }
}

export default Landing;