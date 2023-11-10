import React, {FormEvent, useState} from "react";
import {RegisterEntity} from "types";
import {Spinner} from "../common/Spinner/Spinner";
import {Link, NavLink} from "react-router-dom";
import {PasswordControlButton} from "../PasswordControl/PasswordControl";
import './RegisterForm.css';

export const RegisterForm = () => {
    const [form, setForm] = useState<RegisterEntity>({
        username: '',
        password: '',
    });
    const [inputType, setInputType] = useState("password");
    const [isPwd, setIsPwd] = useState(true);
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
            const res = await fetch(`http://localhost:3001/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(form)
            });

            if ([400, 401, 404, 500].includes(res.status)) {
                const err = await res.json();
                throw new Error(`An error occurred: ${err.message}`);
            }

            const data: RegisterEntity = await res.json();

            setLoading(false);
            setResultInfo(`User: [ ${data.username} ] was successfully added to database`);
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
        return <div className="register-result-info">
            <p className="register-result-info-p1">
                <strong>{resultInfo}</strong>
            </p>
            <p className="register-result-info-p2">Let's <NavLink to="/login">Sign in</NavLink></p>
        </div>
    }


    return <>
        <div className="register-view">
            <Link to="/login"> ◀◀ Go back to Login page</Link>
            <h1>Create new account</h1>
            <form onSubmit={sendForm} className="register-form">
                <label htmlFor="register-detail-email">Username</label>
                <input
                    className="register-detail"
                    id="register-detail-email"
                    name="email"
                    type="email"
                    value={form.username}
                    autoComplete="email"
                    placeholder="Enter your e-mail"
                    required
                    onChange={e => updateForm('username', e.target.value)}
                /> <br/>
                <label htmlFor="register-detail-password">Password{'  '}</label>
                <input
                    className="register-detail"
                    id="register-detail-password"
                    name="password"
                    type={inputType}
                    value={form.password}
                    autoComplete="new-password"
                    placeholder="Password"
                    required
                    onChange={e => updateForm('password', e.target.value)}
                /> <br/>
                <br/>
                <button className="btn-submit-register" type="submit">Submit</button>
            </form>
            <div className="pwd-control-reg">
                <PasswordControlButton
                    toggleShow={() => {
                        setInputType(inputType === "password" ? "text" : "password")
                        setIsPwd((isPwd) => !isPwd)
                    }} isPwd={isPwd}/>
            </div>
        </div>
        {error && <div className="error-view">{error}</div>}
    </>
};
