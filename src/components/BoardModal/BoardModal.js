import React from 'react';
import { connect } from 'react-redux';
import { toggleBoardModal } from '../../redux/reducer';
import './BoardModal.css';


const BoardModal= (props)=> {
        return(
            <div className="board-modal-container">
                <div className="board-modal-header">
                    <p>Create Board</p>
                    <p onClick={()=> props.toggleBoardModal()}>X</p>
                    <hr style={{ width:"80%" }}/>
                </div>

                <div className="board-modal-body">
                    <h4>Title</h4>
                    <input type="text"></input>
                </div>

                <div className="board-modal-footer">
                    <button>CREATE</button>
                </div>
            </div>
        )
}


const mapStateToProps= (state)=> {
    const { createBoardModal }= state;
    return { createBoardModal };
}

export default connect(mapStateToProps, { toggleBoardModal })(BoardModal);