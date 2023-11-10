import React from "react";
import {Link} from "react-router-dom";
import {Header} from "../components/common/Header/Header";

export const NotFoundView = () => {

    return <>
        <Header/>
        <div className="not-found-view">
            <Link to="/habit"> ◀◀ Go back to list</Link>
            <p> Page not found :( </p>
        </div>
    </>;
}
