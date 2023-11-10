import React, {FormEvent, useState} from 'react';
import {CreateHabitReq, HabitEntity} from "types";
import {Spinner} from "../../common/Spinner/Spinner";
import './Modal.css';

export const AddHabitModalForm = () => {
    const [form, setForm] = useState<CreateHabitReq>({
        title: '',
        description: '',
        totalRepeatCount: 0,
        userRepeatCount: 0,
        createdAt: new Date(),
        isActive: true,
    });
    const [loading, setLoading] = useState<boolean>(false);
    const [resultInfo, setResultInfo] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const updateForm = (key: string, value: any) => {
        setForm(form => ({
            ...form,
            [key]: value,
        }));
    };

    const sendForm = async (e: FormEvent) => {
        e.preventDefault();

        setLoading(true);

        try {
            const res = await fetch(`http://localhost:3001/habit`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(form),
            });

            if ([400, 401, 404, 500].includes(res.status)) {
                const err = await res.json();
                throw new Error(`An error occurred: ${err.message}`);
            }

            const data: HabitEntity = await res.json();

            setResultInfo(`New habit: [ ${data.title} ] was successfully added to your list!`);
            setError(null);
        } catch (e: any) {
            setError(e.message);
            setLoading(false);

        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <Spinner/>;
    }

    if (resultInfo !== null) {
        return <div className="add-habit-result-info">
            <p><strong>{resultInfo}</strong></p>
            <button className="btn-add" onClick={() => setResultInfo(null)}>Add another one</button>
        </div>
    }

    if (error) {
        return <div className="error-modal-view">
            <p><strong>{error}</strong></p>
            <button className="btn-back" onClick={() => setError(null)}>Go back to adding</button>
        </div>
    }


    return (
        <>
            <form onSubmit={sendForm} className="modal-form">
                <h3>New habit</h3>
                <label htmlFor="title">
                    What habit do you want to develop?</label><br/>
                <input
                    className="habit-detail"
                    id="title"
                    name="title"
                    type="text"
                    value={form.title}
                    placeholder="e.g. Smile more 😊"
                    required
                    onChange={e => updateForm('title', e.target.value)}
                />
                <label htmlFor="totalRepeatCount">
                    For how many days do you want to work on your habit?</label><br/>
                <input
                    className="habit-detail"
                    id="totalRepeatCount"
                    name="totalRepeatCount"
                    type="number"
                    min={1}
                    max={90}
                    required
                    onChange={e => updateForm('totalRepeatCount', Number(e.target.value))}
                />
                <button className="btn-submit" type="submit">Submit</button>
            </form>
        </>
    )
};
