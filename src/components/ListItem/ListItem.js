import React, { Component } from 'react';
import axios from 'axios';
import './ListItem.css';


export default class ListItem extends Component{
    constructor(props){
        super(props);

        this.state= {

        }
        this.addToList= this.addToList.bind(this);
        this.removeFromList= this.removeFromList.bind(this);
    }

    addToList(){
        axios.post('/api/list/:id').then(response=> {
            return response.data;
        });
    }

    removeFromList(id){
        axios.delete(`/api/list/${id}`).then(response=> {
            return response.data;
        });
    }

    render(){
        return(
            <div className='list-item-container'>
                <p>{this.props.text}</p>

                <button onClick={()=> this.removeFromList(this.props.item_id)} className="remove-item-btn">
                    <i className="far fa-trash-alt fa-2x"></i>
                </button>
            </div>
        )
    }
}