import React from 'react';
import { connect } from 'react-redux';
import { toggleBoardModal } from '../../redux/reducer';
import './BoardModal.css';


const BoardModal= (props)=> {
        return(
            <div className="board-container" style={{ display:"flex", flexDirection:"column", justifyContent:"space-around" }}>
                <div className="board-modal-header">
                    <p style={{ margin: "auto" }}>Create Board</p>

                    <button onClick={()=> props.toggleBoardModal()} className="close-modal-btn" style={{ background:"#FFF", border:"none" }}>
                        <i className="fas fa-times"></i>
                    </button>
                </div>

                <hr style={{ width:"90%", borderColor:"#777", borderWidth:"0.5px" }}/>

                <div className="board-modal-body">
                    <h4>Title</h4>
                    <input onChange={(e)=> props.handleInput(e.target.value)} className="board-title-input" type="text"></input>
                </div>

                <div className="board-modal-footer">
                    <button onClick={()=> {
                        props.createBoard();
                        props.handleInput("");
                    }} className="board-modal-create-btn">CREATE</button>
                </div>
            </div>
        )
}


const mapStateToProps= (state)=> {
    const { createBoardModal }= state;
    return { createBoardModal };
}

export default connect(mapStateToProps, { toggleBoardModal })(BoardModal);