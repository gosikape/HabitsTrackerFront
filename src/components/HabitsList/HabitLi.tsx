import React, {ChangeEvent, MouseEvent, useState} from 'react';
import {HabitEntity, SetHabitAsDoneUpdateReq} from "types";
import {Link} from "react-router-dom";
import './Habit.css';

interface Props {
    habit: HabitEntity;
    onHabitsChange: () => void;
}

export const HabitLi = (props: Props) => {
    const [done, setDone] = useState(false);

    const markHabitAsDone = async (e: ChangeEvent) => {
        e.preventDefault()

        if (props.habit.userRepeatCount + 1 > props.habit.totalRepeatCount || Number(props.habit.isActive)===0) {
            alert(`Your work on this habit has been already completed!
               Congratulations!!!`);
            return;
        }

        if (!window.confirm(`Are you sure you want to mark <<${props.habit.title}>> as done today?`)) {
            return;
        }

        if (props.habit.userRepeatCount + 1 === props.habit.totalRepeatCount) {
            alert(`Congratulations!!!! 
Habit [ ${props.habit.title} ] has just been completed!`);
        }

        const isActive = (props.habit.userRepeatCount + 1 < props.habit.totalRepeatCount);

        try {
            await fetch(`http://localhost:3001/habit/${props.habit.id}`, {
                method: 'PATCH',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userRepeatCount: props.habit.userRepeatCount += 1,
                    isActive: isActive,
                } as SetHabitAsDoneUpdateReq),
            })

        } finally {
            setDone(true);
        }

        props.onHabitsChange();
    }


    const deleteHabit = async (e: MouseEvent) => {
        e.preventDefault();

        if (!window.confirm(`Are you sure you want to remove [ ${props.habit.title} ] ?`)) {
            return;
        }

        const res = await fetch(`http://localhost:3001/habit/${props.habit.id}`, {
            method: 'DELETE',
            credentials: 'include',
        });
        console.log(res);

        props.onHabitsChange();
    }


    return <table className="habits-list" style={{background: !props.habit.isActive ? "darkgray" : "revert-layer"}}>
        <tbody>
        <tr key={props.habit.id}>
            <td className="col-1">
                <input
                    name="done"
                    type="checkbox"
                    title="Mark as done"
                    checked={done}
                    onChange={markHabitAsDone}
                />
            </td>
            <th className="col-2"> {props.habit.title} </th>
            <td className="col-3">
                <Link to={`/habit/${props.habit.id}`} className="edit" title="Edit details">🖍</Link>
            </td>
            <td className="col-4">
                {props.habit.userRepeatCount} / {props.habit.totalRepeatCount}
            </td>
            <td className="col-5">
                <a href="#"
                    // @ts-ignore
                   onClick={deleteHabit}
                   title="Delete habit"
                   className="dlt"> 🗑 </a>
            </td>
        </tr>
        </tbody>
    </table>
};
