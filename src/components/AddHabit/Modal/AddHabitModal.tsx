import React from 'react';
import {Modal} from "./Modal";
import {useModal} from "./useModal";
import {ModalClose} from "./ModalClose";
import {AddHabitModalForm} from "./AddHabitModalForm";
import './Modal.css';

interface Props {
    onHabitsChange: () => void;
}

export const AddHabitModal = (props: Props) => {
    const {isVisible, toggle} = useModal();

    return <>
        <div>
            <button className="btn-open" onClick={toggle}>Add new habit</button>
            <Modal isVisible={isVisible} toggle={toggle} onHabitsChange={props.onHabitsChange}>
                <AddHabitModalForm/>
                <ModalClose toggle={toggle} onHabitsChange={props.onHabitsChange}/>
            </Modal>
        </div>
    </>
};
