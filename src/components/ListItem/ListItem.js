import React, { Component } from 'react';
import axios from 'axios';
import './ListItem.css';


export default class ListItem extends Component{
    constructor(props){
        super(props);

        this.state= {

        }
        this.addToList= this.addToList.bind(this);
    }

    addToList(){
        axios.post('/api/list/:id').then(response=> {
            return response.data;
        })
    }

    render(){
        return(
            <div className='list-item-container'>
                <p>{this.props.text}</p>
            </div>
        )
    }
}