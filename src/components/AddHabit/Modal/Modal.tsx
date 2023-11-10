import React, {ReactNode} from "react";
import './Modal.css';

interface Props {
    children?: ReactNode;
    isVisible: boolean;
    toggle: () => void;
    onHabitsChange: () => void;
}

export const Modal = (props: Props) => {
    const onOverlayClick = () => {
        props.toggle();
        props.onHabitsChange();
    };

    return <>
        {props.isVisible && (
            <div className="overlay" onClick={onOverlayClick}>
                <div className="modal-container" onClick={e => e.stopPropagation()}>
                    {props.children}
                </div>
            </div>
        )}
    </>;
};
