import React from "react";
import {Link} from "react-router-dom";
import './LogoutButton.css';

export const LogoutButton = () => {
    const logOut = () => {
        const res = fetch(`http://localhost:3001/logout`, {
            credentials: "include",
        });
    };

    return <>
        <button className="btn-signout" onClick={logOut}>
            <Link to="/logout"> Sign out </Link>
        </button>
    </>
};
