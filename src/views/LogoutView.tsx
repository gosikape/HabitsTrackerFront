import React from "react";
import {Link} from "react-router-dom";

export const LogoutView = () => {

    return <>
        <div className="logout-view">

            <h3 style={{fontStyle: "italic", marginTop: "20px"}}>
                "We first make our habits,<br/>
                then our habits make us"<br/>
                - John Dryden
            </h3>

            <p>Thanks for using my app! Hope to see you soon!</p><br/>

            <Link to="/login">Sign in again</Link>
        </div>
    </>
;}
