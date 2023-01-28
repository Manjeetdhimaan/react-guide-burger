import React, { useEffect } from "react";

import Aux from "../../hoc/Auxiliary/Auxiliary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import axios from "../../axios-orders";
import { useNavigate } from 'react-router-dom';

const INGREDIENT_PRICES = {
    cheese: 0.5,
    salad: 0.4,
    meat: 1.3,
    bacon: 0.7,
};

const burgerBuilder = (props) => {
    const [state, setState] = React.useState({
        ingredients: null,
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        isLoading: false,
        isError: false
    })

    useEffect(() => {
        
        setState({...state, isLoading: true});
        axios.get('/ingredients.json').then(res => {
            setState({
                ...state,
                ingredients: res['data'],
                isLoading: false
            })
        }).catch(err => {
            setState({ ...state, isLoading: false, isError: true})
        })
    }, [])

    const updatedPurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients)
        .map(igKey => {
            return ingredients[igKey];
        }).reduce((sum, el) => {
            return sum + el
        }, 0);
     
        this.setState({ ...state, purchasable: sum > 0 })
    }

    const addIngredientHandler = (type) => {
        const oldCount = state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...state.ingredients
        }
        updatedIngredients[type] = updatedCount;

        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = state.totalPrice;
        const newPrice = oldPrice + priceAddition;

        const sum = Object.keys(updatedIngredients)
        .map(igKey => {
            return updatedIngredients[igKey];
        }).reduce((sum, el) => {
            return sum + el
        }, 0);

        setState({ ...state, totalPrice: newPrice, ingredients: updatedIngredients, purchasable: sum > 0  });
        // updatedPurchaseState(updatedIngredients);
    }

    const removeIngredientHandler = (type) => {
        const oldCount = state.ingredients[type];
        if (oldCount <= 0) {
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...state.ingredients
        }
        updatedIngredients[type] = updatedCount;

        const priceSubtraction = INGREDIENT_PRICES[type];
        const oldPrice = state.totalPrice;
        const newPrice = oldPrice - priceSubtraction;

        const sum = Object.keys(updatedIngredients)
        .map(igKey => {
            return updatedIngredients[igKey];
        }).reduce((sum, el) => {
            return sum + el
        }, 0);

        setState({ ...state, totalPrice: newPrice, ingredients: updatedIngredients, purchasable: sum > 0 });
        // updatedPurchaseState(updatedIngredients);
    }

    const purchaseHandler = () => {
        setState({ ...state, purchasing: true })
    }

    const purchaseCancleHandler = () => {
        setState({...state, purchasing: false })
    }

    const navigate = useNavigate();
    const purchaseContinueHandler =() =>{
        navigate('/checkout');
        // setState({isLoading: true});
        // const order = {
        //     ingredients: state.ingredients,
        //     price: state.totalPrice,
        //     customer: {
        //         name: 'Manjeet Singh',
        //         address: {
        //             street: 'Gali no 8',
        //             zipCode: '160055',
        //             country: 'India'
        //         },
        //         email: 'mani@mani.com'
        //     },
        //     deliveryMethod: 'fastest'
        // }
        // axios.post('/orders.json', order).then(res => {
        //     setState({isLoading: false, purchasing: false});
        // }).catch(err => {
        //     setState({isLoading: false, purchasing: false});
        //     console.log(err);
        // });
        
    }

        const disabledInfo = {
            ...state.ingredients
        }

        for(let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <=0
        }

        let orderSummary = null;       
        
        let burger = state.isError ? <p>Ingredients can't be loaded!</p> : <Spinner />;
        if (state.ingredients) {
            burger = (
                <Aux>
                    <Burger ingredients={state.ingredients}/>
                    <BuildControls 
                        ingredientAdded={addIngredientHandler} 
                        ingredientRemoved={removeIngredientHandler} 
                        disabled={disabledInfo} 
                        price={state.totalPrice} 
                        purchasable={state.purchasable} 
                        ordered={purchaseHandler} />
                </Aux>
            )

            orderSummary = <OrderSummary 
                                ingredients={state.ingredients} 
                                continuePurchase={purchaseContinueHandler}
                                canclePurchase={purchaseCancleHandler}
                                price={state.totalPrice}
                            />;
        }

        if (state.isLoading) {
            orderSummary = <Spinner />
        }

        return (
            <Aux>
                <Modal show={state.purchasing} modalClosed={purchaseCancleHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        )
}

export default withErrorHandler(burgerBuilder, axios);




// import React, { Component } from "react";

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
// }

// class BurgerBuilder extends Component {
//     state = {
//         ingredients: null,
//         totalPrice: 4,
//         purchasable: false,
//         purchasing: false,
//         isLoading: false,
//         isError: false
//     }

//     componentDidMount () {
//         this.setState({isLoading: true});
//         axios.get('/ingredients.json').then(res => {
//             this.setState({
//                 ingredients: res['data'],
//                 isLoading: false
//             })
//         }).catch(err => {
//             this.setState({isLoading: false, isError: true})
            
//         })
//     }

//     updatedPurchaseState = (ingredients) => {
//         const sum = Object.keys(ingredients)
//         .map(igKey => {
//             return ingredients[igKey];
//         }).reduce((sum, el) => {
//             return sum + el
//         }, 0)
//         this.setState({ purchasable: sum > 0 })
//     }

//     addIngredientHandler = (type) => {
//         const oldCount = this.state.ingredients[type];
//         const updatedCount = oldCount + 1;
//         const updatedIngredients = {
//             ...this.state.ingredients
//         }
//         updatedIngredients[type] = updatedCount;

//         const priceAddition = INGREDIENT_PRICES[type];
//         const oldPrice = this.state.totalPrice;
//         const newPrice = oldPrice + priceAddition;
//         this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
//         this.updatedPurchaseState(updatedIngredients);
//     }

//     removeIngredientHandler = (type) => {
//         const oldCount = this.state.ingredients[type];
//         if (oldCount <= 0) {
//             return;
//         }
//         const updatedCount = oldCount - 1;
//         const updatedIngredients = {
//             ...this.state.ingredients
//         }
//         updatedIngredients[type] = updatedCount;

//         const priceSubtraction = INGREDIENT_PRICES[type];
//         const oldPrice = this.state.totalPrice;
//         const newPrice = oldPrice - priceSubtraction;
//         this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
//         this.updatedPurchaseState(updatedIngredients);
//     }

//     purchaseHandler = () => {
//         this.setState({ purchasing: true })
//     }

//     purchaseCancleHandler = () => {
//         this.setState({ purchasing: false })
//     }

//     purchaseContinueHandler = () => {
//         this.setState({isLoading: true});
//         const order = {
//             ingredients: this.state.ingredients,
//             price: this.state.totalPrice,
//             customer: {
//                 name: 'Manjeet Singh',
//                 address: {
//                     street: 'Gali no 8',
//                     zipCode: '160055',
//                     country: 'India'
//                 },
//                 email: 'mani@mani.com'
//             },
//             deliveryMethod: 'fastest'
//         }
//         axios.post('/orders.json', order).then(res => {
//             this.setState({isLoading: false, purchasing: false});
//         }).catch(err => {
//             this.setState({isLoading: false, purchasing: false});
//             console.log(err);
//         });    
//     }

//     render() {
//         const disabledInfo = {
//             ...this.state.ingredients
//         }

//         for(let key in disabledInfo) {
//             disabledInfo[key] = disabledInfo[key] <=0
//         }

//         let orderSummary = null;       
        
//         let burger = this.state.isError ? <p>Ingredients can't be loaded!</p> : <Spinner />;
//         if (this.state.ingredients) {
//             burger = (
//                 <Aux>
//                     <Burger ingredients={this.state.ingredients}/>
//                     <BuildControls 
//                         ingredientAdded={this.addIngredientHandler} 
//                         ingredientRemoved={this.removeIngredientHandler} 
//                         disabled={disabledInfo} 
//                         price={this.state.totalPrice} 
//                         purchasable={this.state.purchasable} 
//                         ordered={this.purchaseHandler} />
//                 </Aux>
//             )

//             orderSummary = <OrderSummary 
//                                 ingredients={this.state.ingredients} 
//                                 continuePurchase={this.purchaseContinueHandler}
//                                 canclePurchase={this.purchaseCancleHandler}
//                                 price={this.state.totalPrice}
//                             />;
//         }

//         if (this.state.isLoading) {
//             orderSummary = <Spinner />
//         }

//         return (
//             <Aux>
//                 <Modal show={this.state.purchasing} modalClosed={this.purchaseCancleHandler}>
//                     {orderSummary}
//                 </Modal>
//                 {burger}
//             </Aux>
//         )
//     }
// }

// export default withErrorHandler(BurgerBuilder, axios);