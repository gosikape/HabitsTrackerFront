import React, {FormEvent, useEffect, useState} from "react";
import {HabitEntity, SetHabitUpdateReq} from "types";
import {Spinner} from "../common/Spinner/Spinner";
import './SingleHabit.css';

interface Props {
    savedHabit: HabitEntity;
}

export const SingleHabitEditForm = (props: Props) => {
    const [editedHabit, setEditedHabit] = useState(props.savedHabit);
    const [loading, setLoading] = useState<boolean>(false);
    const [resultInfo, setResultInfo] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);


    useEffect(() => {
        setEditedHabit(props.savedHabit);
    }, [props.savedHabit]);

    const change = (e: any) => setEditedHabit(editedHabit => ({
        ...editedHabit,
        [e.target.name]: e.target.value,
    }));

    const updateData = async (e: FormEvent) => {
        e.preventDefault();

        setLoading(true);

        try {
            const res = await fetch(`http://localhost:3001/habit/${props.savedHabit.id}`, {
                method: 'PATCH',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    title: editedHabit.title,
                    description: editedHabit.description,
                    totalRepeatCount: Number(editedHabit.totalRepeatCount),
                    userRepeatCount: Number((Number(editedHabit.isActive) === 1 && (editedHabit.userRepeatCount >= editedHabit.totalRepeatCount)) ? 0 : editedHabit.userRepeatCount),
                    isActive: editedHabit.isActive,
                } as SetHabitUpdateReq),
            })

            if ([400, 401, 404, 500].includes(res.status)) {
                const err = await res.json();
                throw new Error(`An error occurred: ${err.message}`);
            }

            if (Number(editedHabit.isActive) === 0 && (editedHabit.userRepeatCount < editedHabit.totalRepeatCount)) {
                if (!window.confirm(`You have finished just ${editedHabit.userRepeatCount} out of ${editedHabit.totalRepeatCount} rep(s). Are you sure you want to mark habit: [ ${editedHabit.title} ] as completed?`)) {
                    return;
                }
            }
            if (Number(editedHabit.isActive) === 1 && (editedHabit.userRepeatCount >= editedHabit.totalRepeatCount)) {
                if (!window.confirm(`Your work on habit [ ${editedHabit.title} ]  has been already completed. Are you sure you want to reactivate this habit?`)) {
                    return;
                }
            }

            const data: HabitEntity = await res.json();
            setResultInfo(`Habit: [ ${data.title} ] was successfully updated!`);
            setError(null);
        } catch (e: any) {
            setError(e.message);
            setLoading(false);
        } finally {
            setLoading(false);
        }
    }

    if (resultInfo !== null) {
        return <div className="update-result-info">
            <p><strong>{resultInfo}</strong></p>
        </div>
    }

    return <>
        {loading && <Spinner/>}
        {error && <div className="error-view">{error}</div>}

        <form onSubmit={updateData}>
            <table className="habit-update-table">
                <tbody>
                <tr>
                    <th><label htmlFor="habit-update-title">Title</label></th>
                    <td>
                        <input className="habit-update"
                               type="text"
                               id="habit-update-title"
                               value={editedHabit.title}
                               name="title"
                               onChange={change}
                        />
                    </td>
                </tr>
                <tr>
                    <th><label htmlFor="habit-update-isActive"> Activity status </label></th>
                    <td><select
                        className="habit-update"
                        id="habit-update-isActive"
                        defaultValue={editedHabit.isActive ? 1 : 0}
                        name="isActive"
                        onChange={change}>
                        <option value={1}>in progress</option>
                        <option value={0}>completed</option>
                    </select>
                    </td>
                </tr>
                <tr>
                    <th><label htmlFor="habit-update-userRepeatCount"> Finished reps </label></th>
                    <td>
                        <input
                            className="habit-update-num"
                            id="habit-update-userRepeatCount"
                            type="number"
                            value={editedHabit.userRepeatCount}
                            name="userRepeatCount"
                            min={0}
                            max={editedHabit.totalRepeatCount}
                            required
                            onChange={change}
                        />
                    </td>
                </tr>
                <tr>
                    <th><label htmlFor="habit-update-totalRepeatCount"> Total reps </label></th>
                    <td>
                        <input
                            className="habit-update-num"
                            id="habit-update-totalRepeatCount"
                            type="number"
                            value={editedHabit.totalRepeatCount}
                            name="totalRepeatCount"
                            min={editedHabit.userRepeatCount}
                            max={90}
                            required
                            onChange={change}
                        />
                    </td>
                </tr>
                <tr>
                    <th><label htmlFor="habit-update-description"> Additional description </label></th>
                    <td> <textarea
                        className="habit-update"
                        value={editedHabit.description}
                        name="description"
                        id="habit-update-description"
                        onChange={change}
                    />
                    </td>
                </tr>
                </tbody>
            </table>
            <button type="submit" className="btn-submit">Submit</button>
        </form>
    </>
};
