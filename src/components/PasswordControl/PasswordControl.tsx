import React from "react";
import './PasswordControl.css';

interface Props {
    toggleShow: () => void;
    isPwd: boolean;
};

export const PasswordControlButton = (props: Props) => {
    return (
        <button
            className="pwd-ctrl-btn"
            title={props.isPwd ? "Show password" : "Hide password"}
            onClick={props.toggleShow}>
            {props.isPwd ? "👁‍🗨" : "◾"}
        </button>
    )
};
