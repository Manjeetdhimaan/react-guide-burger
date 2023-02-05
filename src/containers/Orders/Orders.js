import React from "react";
import { connect } from "react-redux";

import Order from "../../components/Order/Order";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as actions from "../../store/actions/index";
import { Navigate } from "react-router";

class Orders extends React.Component {

    // state = {
    //     orders: [],
    //     isLoading: true
    // }

    componentDidMount () {
        this.props.onFetchOrders(this.props.token, this.props.userId);
        // axios.get('orders.json').then(res => {
        //     const fetchedOrders = [];
        //     for (let key in res['data']) {
        //         fetchedOrders.push({ ...res['data'][key], id: key })
        //     }
        //     this.setState({isLoading: false, orders: fetchedOrders});
        // }).catch( err => {purchaseBurger
        //     this.setState({isLoading: false});
        // })
    }

    render() {
        let authRedirect = null;
        if(!this.props.isAuthenticated) {
            authRedirect = <Navigate to="/" />
        }

        let orders = null;
        if(this.props.orders) {
            orders = (
                <React.Fragment>
                    {this.props.orders.map(order => {
                       return <Order key={order.id} ingredients={order.ingredients} price={+order.price} />
                    })}
                </React.Fragment>
            )
        }

        if (this.props.isLoading) {
            orders = <Spinner />
        }

        return (
            <div>
                {authRedirect}
                {orders}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        isLoading: state.order.isLoading,
        token: state.auth.token,
        isAuthenticated: state.auth.token !== null,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: (token, userId) => dispatch(actions.fetchOrders(token, userId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));