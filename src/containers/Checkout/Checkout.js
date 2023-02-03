import React from "react";
import { connect } from "react-redux";
import { Outlet } from 'react-router-dom';

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
    render () {
        return (
            <div>
                <CheckoutSummary
                 checkoutCancelled={this.checkoutCancelledHandler} 
                 checkoutContinued={this.checkoutContinuedHandler} 
                 ingredients={this.props.ingds} />
                 <Outlet  />
                 {/* <Routes>
                    <Route path="/checkout/contact-data" element={<ContactData ingredients={ingredients} />} />
                 </Routes> */}
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        ingds: state.rootReducer.ingredients
    }
}

export default connect(mapStateToProps)(withRouter(Checkout));