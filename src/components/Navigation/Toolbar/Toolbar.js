import React from "react";

import classes from "./Toolbar.module.css";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";

const toobar = (props) => {
    return (
        <header className={classes.Toolbar}>
            <div>MENU</div>
            <div className={[classes.Logo, classes.DesktopOnly].join(' ')}>
                <Logo />
            </div>
            <nav className={classes.DesktopOnly}>
                <NavigationItems />
            </nav>
        </header>
    )
}

export default toobar;