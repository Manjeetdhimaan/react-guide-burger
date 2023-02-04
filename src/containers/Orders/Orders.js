import React from "react";
import { connect } from "react-redux";

import Order from "../../components/Order/Order";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as actions from "../../store/actions/index";

class Orders extends React.Component {

    // state = {
    //     orders: [],
    //     isLoading: true
    // }

    componentDidMount () {
        this.props.onFetchOrders();
        // axios.get('orders.json').then(res => {
        //     const fetchedOrders = [];
        //     for (let key in res['data']) {
        //         fetchedOrders.push({ ...res['data'][key], id: key })
        //     }
        //     this.setState({isLoading: false, orders: fetchedOrders});
        // }).catch( err => {
        //     this.setState({isLoading: false});
        // })
    }

    render() {
        let orders = (
            <React.Fragment>
                {this.props.orders.map(order => {
                   return <Order key={order.id} ingredients={order.ingredients} price={+order.price} />
                })}
            </React.Fragment>
        )

        if (this.props.isLoading) {
            orders = <Spinner />
        }

        return (
            <div>
                {orders}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        isLoading: state.order.isLoading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: () => dispatch(actions.fetchOrders())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));