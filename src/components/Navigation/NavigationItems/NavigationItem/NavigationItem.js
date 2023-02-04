import React from "react";
import { NavLink } from "react-router-dom";

import classes from "./NavigationItem.module.css";

const navigationItem = (props) => (
    <li className={classes.NavigationItem} onClick={props.clicked}>
            <NavLink to={props.link} className={({ isActive }) =>
                isActive ? classes.active : classes.nav_link}>
                    {props.children}
            </NavLink>
    </li>
)

export default navigationItem;