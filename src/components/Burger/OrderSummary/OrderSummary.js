import React from "react";

import Aux from "../../../hoc/Auxiliary";
import Button from "../../UI/Button/Button";

const orderSummary = ( props ) => {
    const ingredientSummmary = Object.keys(props.ingredients)
        .map(igKey => {
            return (
                <li key={igKey}>
                    <span style={{textTransform: 'capitalize'}}>{igKey}</span>: {props.ingredients[igKey]}
                </li>
            )
        })

    return (
        <Aux>
             <h3>Your Order!</h3>
             <p>A delicious burger with following ingredients:</p>
             <ul>
                {ingredientSummmary}
             </ul>
             <p><strong>Total Price: {props.price.toFixed(2)}</strong></p>
             <p>Continue to checkout?</p>
             <Button btnType="Danger" clicked={props.canclePurchase}>CANCEL</Button>
             <Button btnType="Success" clicked={props.continuePurchase}>CONTINUE</Button>
        </Aux>
    )
}

export default orderSummary;