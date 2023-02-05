import React, { Component } from "react";
import { connect } from "react-redux";

import Aux from "../../hoc/Auxiliary/Auxiliary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import axios from "../../axios-orders";
import { withRouter } from "../../hoc/withRouter/withRouter";
// import { createSearchParams } from "react-router-dom";
import * as actions from "../../store/actions/index";

class BurgerBuilder extends Component {
    state = {
        purchasing: false
    }

    async componentDidMount () {
        await this.props.onInItIngredients();
        // this.setState({isLoading: true});
        // axios.get('/ingredients.json').then(res => {
        //     this.setState({
        //         ingredients: res['data'],
        //         isLoading: false
        //     })
        // }).catch(err => {
        //     this.setState({isLoading: false, isError: true})
        // })
    }

    updatedPurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients)
        .map(igKey => {
            return ingredients[igKey];
        }).reduce((sum, el) => {
            return sum + el
        }, 0)
        // this.setState({ purchasable: sum > 0 })
        return sum > 0;
    }

    // addIngredientHandler = (type) => {
    //     const oldCount = this.state.ingredients[type];
    //     const updatedCount = oldCount + 1;
    //     const updatedIngredients = {
    //         ...this.state.ingredients
    //     }
    //     updatedIngredients[type] = updatedCount;
    //     const priceAddition = INGREDIENT_PRICES[type];
    //     const oldPrice = this.state.totalPrice;
    //     const newPrice = oldPrice + priceAddition;
    //     this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
    //     this.updatedPurchaseState(updatedIngredients);
    // }

    // removeIngredientHandler = (type) => {
    //     const oldCount = this.state.ingredients[type];
    //     if (oldCount <= 0) {
    //         return;
    //     }
    //     const updatedCount = oldCount - 1;
    //     const updatedIngredients = {
    //         ...this.state.ingredients
    //     }
    //     updatedIngredients[type] = updatedCount;

    //     const priceSubtraction = INGREDIENT_PRICES[type];
    //     const oldPrice = this.state.totalPrice;
    //     const newPrice = oldPrice - priceSubtraction;
    //     this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
    //     this.updatedPurchaseState(updatedIngredients);
    // }

    purchaseHandler = () => {
        if (this.props.isAuthenticated) {
            this.setState({ purchasing: true });
        }
        else {
            this.props.onSetAuthRedirectPath('/checkout');
            this.props.navigate('/auth');
        };
    };

    purchaseCancleHandler = () => {
        this.setState({ purchasing: false })
    }

    purchaseContinueHandler = () => {
        // const queryParams = [];
        // for (let ingd in this.props.ingds){
        //     queryParams.push(encodeURIComponent(ingd) + '=' + encodeURIComponent(this.props.ingds[ingd]));
        // }
        // queryParams.push('price=' + this.props.totalPrice);
        // const queryString = queryParams.join('&');
        
        // this.props.navigate({
        //     pathname: "/checkout",
        //     search: createSearchParams(queryString).toString()
        // });
        this.props.navigate('/checkout');
        this.props.onInitPurchase();
    }

    render() {
        const disabledInfo = {
            ...this.props.ingds
        }

        for(let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <=0
        }

        let orderSummary = null;       
        let burger = this.props.isError ? <p>Ingredients can't be loaded!</p> : <Spinner />;
        if (this.props.ingds) {
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ingds}/>
                    <BuildControls 
                        ingredientAdded={this.props.onIngredientAdded} 
                        ingredientRemoved={this.props.onIngredientRemoved} 
                        disabled={disabledInfo} 
                        price={this.props.totalPrice}
                        isAuth={this.props.isAuthenticated} 
                        purchasable={this.updatedPurchaseState(this.props.ingds)} 
                        ordered={this.purchaseHandler} />
                </Aux>
            )

            orderSummary = <OrderSummary 
                                ingredients={this.props.ingds} 
                                continuePurchase={this.purchaseContinueHandler}
                                canclePurchase={this.purchaseCancleHandler}
                                price={this.props.totalPrice}
                            />;
        }

        if (this.props.isLoading) {
            orderSummary = <Spinner />
        }

        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancleHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        )
    }
}

const mapStateToProps = state => {
    return {
        ingds: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice,
        isError: state.burgerBuilder.isError,
        isLoading: state.burgerBuilder.isLoading,
        isAuthenticated: state.auth.token !== null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
        onInItIngredients: () => dispatch(actions.initIngredients()),
        onInitPurchase: () => dispatch(actions.purchaseInit()),
        onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
    }
}

const firstHOC = withErrorHandler(BurgerBuilder, axios);

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(firstHOC));





// import React, { useEffect } from "react";
// import { createSearchParams, useNavigate } from 'react-router-dom';

// import Aux from "../../hoc/Auxiliary/Auxiliary";
// import Burger from "../../components/Burger/Burger";
// import BuildControls from "../../components/Burger/BuildControls/BuildControls";
// import Modal from "../../components/UI/Modal/Modal";
// import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
// import Spinner from "../../components/UI/Spinner/Spinner";
// import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
// import axios from "../../axios-orders";

// const INGREDIENT_PRICES = {
//     cheese: 0.5,
//     salad: 0.4,
//     meat: 1.3,
//     bacon: 0.7,
// };

// const burgerBuilder = (props) => {
//     const [ingredients, setIngredients] = React.useState(null);
//     const [totalPrice, setTotalPrice] = React.useState(4);
//     const [purchasable, setPurchasable] = React.useState(false);
//     const [purchasing, setPurchasing] = React.useState(false);
//     const [isLoading, setIsLoading] = React.useState(false);
//     const [isError, setIsError] = React.useState(false);
//     const navigate = useNavigate();

//     useEffect(() => {
//         setIsLoading(true);
//         axios.get('/ingredients.json').then(res => {
//             setIsLoading(false);
//             setIngredients(res['data']);
//         }).catch(err => {
//             setIsLoading(false)
//             setIsError(true)
//         })
//     }, [])

//     const updatedPurchaseState = (ingredients) => {
//         const sum = Object.keys(ingredients)
//         .map(igKey => {
//             return ingredients[igKey];
//         }).reduce((sum, el) => {
//             return sum + el
//         }, 0);

//         setPurchasable(sum > 0);
//     }

//     const addIngredientHandler = (type) => {
//         const oldCount = ingredients[type];
//         const updatedCount = oldCount + 1;
//         const updatedIngredients = {
//             ...ingredients
//         }
//         updatedIngredients[type] = updatedCount;

//         const priceAddition = INGREDIENT_PRICES[type];
//         const oldPrice = totalPrice;
//         const newPrice = oldPrice + priceAddition;

//         setTotalPrice(newPrice);
//         setIngredients(updatedIngredients);
//         updatedPurchaseState(updatedIngredients);
//     }

//     const removeIngredientHandler = (type) => {
//         const oldCount = ingredients[type];
//         if (oldCount <= 0) {
//             return;
//         }
//         const updatedCount = oldCount - 1;
//         const updatedIngredients = {
//             ...ingredients
//         }
//         updatedIngredients[type] = updatedCount;

//         const priceSubtraction = INGREDIENT_PRICES[type];
//         const oldPrice = totalPrice;
//         const newPrice = oldPrice - priceSubtraction;
       
//         setTotalPrice(newPrice);
        
//         setIngredients(updatedIngredients);
        
//         updatedPurchaseState(updatedIngredients);
//         // setState({ ...state, totalPrice: newPrice, ingredients: updatedIngredients, purchasable: sum > 0 });
//     }

//     const purchaseHandler = () => {
//         setPurchasing(true);
//     }

//     const purchaseCancleHandler = () => {
//         setPurchasing(false);
//     }
    
//     const purchaseContinueHandler = () => {
//         const queryParams = [];
//         for (let ingd in ingredients){
//             queryParams.push(encodeURIComponent(ingd) + '=' + encodeURIComponent(ingredients[ingd]));
//         }
//         queryParams.push('price=' + totalPrice);
//         const queryString = queryParams.join('&');
        
//         navigate({
//             pathname: "/checkout",
//             search: createSearchParams(queryString).toString()
//         });
//         // navigate('/checkout?' + queryString);    
//     }

//         const disabledInfo = {
//             ...ingredients
//         }

//         for(let key in disabledInfo) {
//             disabledInfo[key] = disabledInfo[key] <=0
//         }

//         let orderSummary = null;       
        
//         let burger = isError ? <p>Ingredients can't be loaded!</p> : <Spinner />;
//         if (ingredients) {
//             burger = (
//                 <Aux>
//                     <Burger ingredients={ingredients}/>
//                     <BuildControls 
//                         ingredientAdded={addIngredientHandler} 
//                         ingredientRemoved={removeIngredientHandler} 
//                         disabled={disabledInfo} 
//                         price={totalPrice} 
//                         purchasable={purchasable} 
//                         ordered={purchaseHandler} />
//                 </Aux>
//             )

//             orderSummary = <OrderSummary 
//                                 ingredients={ingredients} 
//                                 continuePurchase={purchaseContinueHandler}
//                                 canclePurchase={purchaseCancleHandler}
//                                 price={totalPrice}
//                             />;
//         }

//         if (isLoading) {
//             orderSummary = <Spinner />
//         }

//         return (
//             <Aux>
//                 <Modal show={purchasing} modalClosed={purchaseCancleHandler}>
//                     {orderSummary}
//                 </Modal>
//                 {burger}
//             </Aux>
//         )
// }

// export default withErrorHandler(burgerBuilder, axios);