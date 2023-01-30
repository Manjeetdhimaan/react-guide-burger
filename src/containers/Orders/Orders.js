import React from "react";

import Order from "../../components/Order/Order";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

class Orders extends React.Component {

    state = {
        orders: [],
        isLoading: true
    }

    componentDidMount () {
        axios.get('orders.json').then(res => {
            const fetchedOrders = [];
            for (let key in res['data']) {
                fetchedOrders.push({ ...res['data'][key], id: key })
            }
            this.setState({isLoading: false, orders: fetchedOrders});
        }).catch( err => {
            this.setState({isLoading: false});
        })
    }

    render() {
        let orders = (
            <React.Fragment>
                {this.state.orders.map(order => {
                   return <Order key={order.id} ingredients={order.ingredients} price={+order.price} />
                })}
            </React.Fragment>
        )

        if (this.state.isLoading) {
            orders = <Spinner />
        }

        return (
            <div>
                {orders}
            </div>
        )
    }
}

export default withErrorHandler(Orders, axios);