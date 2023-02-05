import React from "react";

import classes from "./NavigationItems.module.css";
import NavigationItem from "./NavigationItem/NavigationItem";

const navigationItems = (props) => (
    <ul className={classes.NavigationItems}>
        <NavigationItem clicked={props.closeDrawer} link="/">Burger Builder</NavigationItem>
        {props.isAuthenticated ? <NavigationItem clicked={props.closeDrawer} link="/orders">Orders</NavigationItem>: null}
        {!props.isAuthenticated ? 
        <NavigationItem clicked={props.closeDrawer} link="/auth">Authenticate</NavigationItem> : 
        <NavigationItem clicked={props.closeDrawer} link="/logout">Logout</NavigationItem>
        }
    </ul>
)

export default navigationItems;