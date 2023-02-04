import React from "react";
import { connect } from "react-redux";
import { Navigate, Outlet } from 'react-router-dom';

import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import { withRouter } from "../../hoc/withRouter/withRouter";

class Checkout extends React.Component {

    checkoutCancelledHandler = () => {
        this.props.navigate(-1);
    }

    checkoutContinuedHandler = () => {
        // this.props.navigate('contact-data', { state: {ingredients: this.props.ingds, totalPrice: this.props.totalPrice}, replace: true});
        this.props.navigate('contact-data');
    }

    render() {
        let summary = <Navigate to="/" />
        if (this.props.ingds) {
            const puchasedRedirect = this.props.purchased ? <Navigate to="/" /> : null;
            summary = (
                <React.Fragment>
                    {puchasedRedirect}
                    <CheckoutSummary
                        checkoutCancelled={this.checkoutCancelledHandler}
                        checkoutContinued={this.checkoutContinuedHandler}
                        ingredients={this.props.ingds} />
                </React.Fragment>
            )
        }
        return (
            <div>
                {summary}
                <Outlet />
                {/* <Routes>
                    <Route path="/checkout/contact-data" element={<ContactData ingredients={ingredients} />} />
                 </Routes> */}
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        ingds: state.burgerBuilder.ingredients,
        purchased: state.order.purchased
    }
}

export default connect(mapStateToProps)(withRouter(Checkout));