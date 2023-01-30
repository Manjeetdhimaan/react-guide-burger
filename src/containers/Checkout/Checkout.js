import React from "react";
import { useNavigate, useSearchParams, Outlet } from 'react-router-dom';

import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";

const checkout = (props) => {
   const [ingredients, setIngredients] = React.useState(
    {
        salad: 0,
        bacon: 0,
        meat: 0,
        cheese: 0
    }
   );
   const [totalPrice, setTotalPrice] = React.useState(0);

    const navigate = useNavigate()
    const [searchParams] = useSearchParams();

    React.useEffect(() => {
         const query = [...searchParams];
         const queryIngredients = {};
         let price = 0;
        // const query = new URLSearchParams(...searchParams);
        for ( let param of query ){
            if( param[0] === 'price' ) {
                price = param[1];
            }
            else {
                queryIngredients[param[0]] = +param[1];
            }
        }
        
        if (Object.keys(queryIngredients).length > 0) {
            setIngredients(queryIngredients);
            setTotalPrice(price);
        }
        
    }, [])

    const checkoutCancelledHandler = () => {
        navigate(-1);
    }

    const checkoutContinuedHandler = () => {
        navigate('contact-data', { state: {ingredients, totalPrice: totalPrice}, replace: true});
    }
        return (
            <div>
                <CheckoutSummary
                 checkoutCancelled={checkoutCancelledHandler} 
                 checkoutContinued={checkoutContinuedHandler} 
                 ingredients={ingredients} />
                 <Outlet  />
                 {/* <Routes>
                    <Route path="/checkout/contact-data" element={<ContactData ingredients={ingredients} />} />
                 </Routes> */}
            </div>
        )
}

export default checkout;