import React from 'react';
import logoGIF from '../../images/trello-logo.gif';
import logo from '../../images/header-logo.png';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar= (props)=> {
    return(
        <div className="nav-main-container">
            <div className="nav-left">
                <Link to="/boards">
                    <div className="boards-logo-container">
                        <img src={logoGIF} alt="trello-logo" />
                        <p>Boards</p>
                    </div>
                </Link>
            </div>

            <div className="nav-mid">
                <img src={logo} alt="trello-logo" />
            </div>

            <div className="nav-right">

            </div>
        </div>
    )
}


export default Navbar;