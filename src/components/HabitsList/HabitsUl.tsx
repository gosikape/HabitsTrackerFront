import React, {useState} from 'react';
import {HabitEntity} from "types";
import {HabitLi} from "./HabitLi";
import {HabitsFilter} from "../HabitsListFilter/HabitsFilter";
import './Habit.css';

interface Props {
    habits: HabitEntity[];
    onHabitsChange: () => void;
}

export const HabitsUl = (props: Props) => {
    const [activeOnly, setActiveOnly] = useState<boolean>(false);

    return <div>
        <table className="habits-list">
            <thead>
            <tr>
                <th colSpan={3}> Habit's title</th>
                <th className="col-4"> Reps</th>
                <th className="col-5"/>
            </tr>
            </thead>
        </table>
        <HabitsFilter activeOnly={activeOnly} onActiveOnlyChange={setActiveOnly}/>

        {
            props.habits
                .filter(habit => (activeOnly && !habit.isActive) ? habit.isActive : habit)
                .map(habit => (
                    <HabitLi
                        key={habit.id}
                        habit={habit}
                        onHabitsChange={props.onHabitsChange}
                    />
                ))
        }
    </div>
};
