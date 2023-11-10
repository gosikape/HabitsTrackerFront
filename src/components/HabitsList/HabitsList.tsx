import React, {useEffect, useState} from 'react';
import {HabitEntity} from "types";
import {HabitsUl} from "./HabitsUl";
import {Spinner} from "../common/Spinner/Spinner";
import {AddHabitModal} from "../AddHabit/Modal/AddHabitModal";

export const HabitsList = () => {
    const [habitsList, setHabitsList] = useState<HabitEntity[] | null>(null);
    const [error, setError] = useState<string | null>(null);

    const refreshHabitsList = async () => {
        setHabitsList(null);

        try {
            const res = await fetch(`http://localhost:3001/habit`, {
                credentials: "include",
            });

            if ([400, 401, 404, 500].includes(res.status)) {
                const err = await res.json();
                throw new Error(`An error occurred: ${err.message}`);
            }

            const data = await res.json();
            setHabitsList(data.habitsListForUser);
            setError(null);
        } catch (e: any) {
            setError(e.message);
        }
    };

    useEffect(() => {
        setError(null);
        refreshHabitsList();
    }, []);


    if (habitsList && habitsList === null) {
        return <Spinner/>;
    }

    return <>
        {habitsList && (
            habitsList.length > 0
                ?
                <>
                    <div className="habits-summary">
                        <div className="all-completed-habits">
                            Completed habits<br/>
                            {habitsList.filter((habit) => Number(habit.isActive) === 0).length}
                        </div>
                        <div className="all-added-habits">
                            All habits<br/>
                            {habitsList.length}
                        </div>
                        <div className="habits-completion-rate">
                            Completion rate<br/>
                            {Math.floor(((habitsList.filter((habit) => Number(habit.isActive) === 0).length) / habitsList.length) * 100)}%
                        </div>
                    </div>
                    <hr/>
                    <div className="habitsList-header">
                        <h1>List of your habits</h1>
                        <AddHabitModal onHabitsChange={refreshHabitsList}/>
                    </div>
                    <HabitsUl habits={habitsList} onHabitsChange={refreshHabitsList}/>
                </>
                :
                <div className="habitsList-header">
                    <h2>You have not added any habits yet</h2>
                    <AddHabitModal onHabitsChange={refreshHabitsList}/>
                </div>
        )}
        {error && <div className="error-view">{error}</div>}
    </>
};
