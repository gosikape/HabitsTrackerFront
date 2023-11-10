import React from 'react';
import {LogoutButton} from "../../LogoutButton/LogoutButton";
import './Header.css';

export const Header = () => {

    return <>
        <div className="main-header">
            <LogoutButton/>
        </div>
    </>
};
