import React from "react";

import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import { useNavigate } from 'react-router-dom';

const checkout = (props) => {
   const [state] = React.useState({
        ingredients: {
            meat: 1,
            cheese: 1,
            bacon: 1,
            salad: 1
        }
    })

    const navigate = useNavigate()

    const checkoutCancelledHandler = () => {
        navigate('/');
    }

    const checkoutContinuedHandler = () => {
        navigate('contact-data');
    }

        return (
            <div>
                <CheckoutSummary checkoutCancelled={checkoutCancelledHandler} checkoutContinued={checkoutContinuedHandler} ingredients={state.ingredients} />
            </div>
        )
}

export default checkout;