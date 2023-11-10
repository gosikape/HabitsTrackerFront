import React, {FormEvent, useState} from "react";
import {LoginEntity, UserEntity} from "types";
import {Spinner} from "../common/Spinner/Spinner";
import {Navigate, NavLink} from "react-router-dom";
import {PasswordControlButton} from "../PasswordControl/PasswordControl";
import './LoginForm.css';

export const LoginForm = () => {
    const [form, setForm] = useState<LoginEntity>({
        username: '',
        password: '',
    });
    const [inputType, setInputType] = useState("password");
    const [isPwd, setIsPwd] = useState(true);
    const [data, setData] = useState<null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [authUser, setAuthUser] = useState<null | UserEntity>(null);
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
            const res = await fetch(`http://localhost:3001/login`, {
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

            const result = await res.json();
            setLoading(false);
            setData(result.ok);
            setAuthUser(result.user as UserEntity);
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

    return <>
        <div className="login-view">
            <p>Don't have an account yet? Sign up <NavLink to="/register">here</NavLink></p>
            <h1>Sign in to your account</h1>
            <form onSubmit={sendForm} className="login-form">
                <label htmlFor="login-detail-email">Username</label>
                <input
                    className="login-detail"
                    id="login-detail-email"
                    name="email"
                    type="email"
                    value={form.username}
                    autoComplete="email"
                    placeholder="Enter your e-mail"
                    required
                    onChange={e => updateForm('username', e.target.value)}
                /> <br/>
                <label htmlFor="login-detail-password">Password{'  '}</label>
                <input
                    className="login-detail"
                    id="login-detail-password"
                    name="password"
                    type={inputType}
                    value={form.password}
                    autoComplete="current-password"
                    placeholder="Password"
                    required
                    onChange={e => updateForm('password', e.target.value)}
                /> <br/>
                <br/>
                <button className="btn-submit-login" type="submit">Login</button>
            </form>
        </div>
        <div className="pwd-control-log">
            <PasswordControlButton
                toggleShow={() => {
                    setInputType(inputType === "password" ? "text" : "password")
                    setIsPwd((isPwd) => !isPwd)
                }} isPwd={isPwd}/>
        </div>

        {authUser ? <Navigate replace to="/habit"/> : null}
        {error && <div className="error-view">{error}</div>}
    </>
};
