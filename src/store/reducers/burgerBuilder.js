import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
    ingredients: null,
    totalPrice: 4,
    isError: false,
    isLoading: false
}

const INGREDIENT_PRICES = {
    cheese: 0.5,
    salad: 0.4,
    meat: 1.3,
    bacon: 0.7,
}

const reducer = (state = initialState, action) => {
    switch (action.type) {

        case (actionTypes.ADD_INGREDIENT):
            const updatedIngredient = { [action.ingredientName]: state.ingredients[action.ingredientName] + 1 }
            const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
            const updatedState = {
                ingredients: updatedIngredients,
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
            }
            return updateObject(state, updatedState);
            
        case (actionTypes.REMOVE_INGREDIENT):
            const updatedIngdt = { [action.ingredientName]: state.ingredients[action.ingredientName] - 1 }
            const updatedIngrts = updateObject(state.ingredients, updatedIngdt);
            const updatedSt = {
                ingredients: updatedIngrts,
                totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
            }
            return updateObject(state, updatedSt);
            
        case (actionTypes.SET_INGREDIENT):
            return updateObject(state, {
                ...state,
                // ingredients: action.ingredients,
                ingredients: {
                    salad: action.ingredients.salad,
                    cheese: action.ingredients.cheese,
                    bacon: action.ingredients.bacon,
                    meat: action.ingredients.meat,
                },
                totalPrice: initialState.totalPrice,
                isError: false,
                isLoading: false });

        case (actionTypes.FETCH_INGREDIENTS_START):
            return updateObject(state, {isLoading: true});
            
        case (actionTypes.FETCH_INGREDIENTS_FAILED):
            return updateObject(state, {isError: true, isLoading: false});
            
        default:
            return state;
    }
}

export default reducer;