import React from 'react';
import {Routes, Route, Navigate} from "react-router-dom";
import {HabitView} from "./views/HabitView";
import {LoginView} from "./views/LoginView";
import {RegisterView} from "./views/RegisterView";
import {SingleHabitView} from "./views/SingleHabitView";
import {NotFoundView} from "./views/NotFoundView";
import {UserView} from "./views/UserView";
import {LogoutView} from "./views/LogoutView";
import './App.css';

export const App = () => {

    return (
        <Routes>
            <Route path="/" element={<Navigate replace to="/login"/>}/>
            <Route path="/login" element={<LoginView/>}/>
            <Route path="/register" element={<RegisterView/>}/>
            <Route path="/habit" element={<HabitView/>}/>
            <Route path="/habit/:habitId" element={<SingleHabitView/>}/>
            <Route path="/user" element={<UserView/>}/>
            <Route path="/logout" element={<LogoutView/>}/>
            <Route path="*" element={<NotFoundView/>}/>
        </Routes>
    );
};

