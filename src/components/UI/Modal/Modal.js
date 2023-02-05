import React, { Component } from "react";

import classes from "./Modal.module.css";
import Backdrop from "../Backdrop/Backdrop";

class Modal extends Component {
    // You can use PureComponent to not re-render any component (Pure components checks all conditions to not re-render any component until unless it really needs to be.)
    shouldComponentUpdate( nextProps, nextState ) {
        return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
    }

    render () {
        return (
            <React.Fragment>
                <Backdrop show={this.props.show} clicked={this.props.modalClosed} />
                <div 
                className={classes.Modal}
                style={
                    {transform: this.props.show ? 'translateY(0)' : 'translateY(100vh)',
                    opacity: this.props.show ? 1 : 0}
                }>
                    {this.props.children}
                </div>
            </React.Fragment>
        )
    }
}

export default Modal;