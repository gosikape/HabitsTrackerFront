import React from "react";
import './Modal.css';

interface Props {
    toggle: () => void;
    onHabitsChange: () => void;
};

export const ModalClose = (props: Props) => {

    const onModalClose = () => {
        props.toggle();
        props.onHabitsChange();
    };

    return (
        <button
            className="btn-close"
            onClick={onModalClose}>
            ✖
        </button>
    )
};
