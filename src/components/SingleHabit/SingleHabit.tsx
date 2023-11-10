import React, {useEffect, useState} from "react";
import {GetSingleHabitRes} from "types";
import {Link, useParams} from "react-router-dom";
import {Spinner} from "../common/Spinner/Spinner"
import {SingleHabitEditForm} from "./SingleHabitEditForm";
import './SingleHabit.css';

export const SingleHabit = () => {
    const [habitInfo, setHabitInfo] = useState<GetSingleHabitRes | null>(null);
    const [error, setError] = useState<string | null>(null);
    const {habitId} = useParams();

    useEffect(() => {
        setError(null);
        (async () => {
            try {
                const res = await fetch(`http://localhost:3001/habit/${habitId}`, {
                    credentials: "include",
                });

                if ([400, 401, 404, 500].includes(res.status)) {
                    const err = await res.json();
                    throw new Error(`An error occurred: ${err.message}`);
                }

                setHabitInfo(await res.json());
                setError(null);

            } catch (e: any) {
                setError(e.message);
            }
        })();
    }, []);

    if (habitInfo?.habitUnit && habitInfo === null) {
        return <Spinner/>;
    }


    return <>
        {!habitInfo?.habitUnit ? <Link className="single-habit-info" to="/habit"> ◀◀ Go back to list</Link> : null}
        {habitInfo?.habitUnit && (
            <div className="single-habit-info">
                <Link className="single-habit-info" to="/habit"> ◀◀ Go back to list </Link>
                <div className="single-habit-details">
                    <h2> Details of: <strong>[ {habitInfo.habitUnit.title} ]</strong>, created at: <strong>
                        {(new Date(habitInfo.habitUnit.createdAt)).toLocaleDateString()}
                    </strong>
                    </h2>
                    <h3>
                        Completion rate: {<strong style={{color: "antiquewhite", fontSize: "larger"}}>
                        {Math.round(habitInfo.habitUnit.userRepeatCount / habitInfo.habitUnit.totalRepeatCount * 100)}%
                    </strong>}
                    </h3>
                    <h4>
                        You have been working on your habit for <strong>
                        {Math.floor(((new Date(Date.now()) as any).getTime() - ((new Date(habitInfo.habitUnit.createdAt)) as any).getTime()) / (1000 * 3600 * 24))}
                    </strong> day(s) and till now you have manged to finish <strong>
                        {habitInfo.habitUnit.userRepeatCount}
                    </strong> out of <strong>
                        {habitInfo.habitUnit.totalRepeatCount}
                    </strong> rep(s).
                    </h4>
                    {habitInfo.habitUnit.description
                        ? <p><strong style={{textDecoration: "underline"}}>
                            Additional info: </strong> {habitInfo.habitUnit.description} </p>
                        : null}

                    <SingleHabitEditForm savedHabit={habitInfo.habitUnit} key={habitInfo.habitUnit.id}/>
                </div>
            </div>
        )}
        {error && <div className="error-view">{error}</div>}
    </>;
};
