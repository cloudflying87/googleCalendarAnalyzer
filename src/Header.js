import {
    Link
} from 'react-router-dom';
import React from 'react';


function Header() {

    return (
        <div className="Header">
            <header className="app-footer">
                <div id="auth-status" className="footer-top"></div>
                <div id="sign-in-or-out-button" className="footer">Sign in</div>
                <div id="revoke-access-button" className="footer">Revoke access</div>
                <Link to="/about" className="footer">About</Link>
                <Link to="/contact" className="footer">Contact</Link>
                <a href="http://github.com/eamoses" className="footer">&copy; 2019 Emily Anne Moses</a>
            </header>
        </div>
    )
}

export default Header;