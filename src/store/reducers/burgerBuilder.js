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

const addIngredient = (state, action) => {
    const updatedIngredient = { [action.ingredientName]: state.ingredients[action.ingredientName] + 1 }
    const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
    const updatedState = {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
    }
    return updateObject(state, updatedState);
};

const removeIngredient = (state, action) => {
    const updatedIngdt = { [action.ingredientName]: state.ingredients[action.ingredientName] - 1 }
    const updatedIngrts = updateObject(state.ingredients, updatedIngdt);
    const updatedSt = {
        ingredients: updatedIngrts,
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
    }
    return updateObject(state, updatedSt);
};

const setIngredient = (state, action) => {
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
        isLoading: false
    });
};

const fetchIngredientsStart = (state, action) => {
    return updateObject(state, { isLoading: true });
}

const fetchIngredientsFailed = (state, action) => {
    return updateObject(state, { isError: true, isLoading: false });
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case (actionTypes.ADD_INGREDIENT): return addIngredient(state, action);
        case (actionTypes.REMOVE_INGREDIENT): return removeIngredient(state, action);
        case (actionTypes.SET_INGREDIENT): return setIngredient(state, action);
        case (actionTypes.FETCH_INGREDIENTS_START): return fetchIngredientsStart(state, action);
        case (actionTypes.FETCH_INGREDIENTS_FAILED): return fetchIngredientsFailed(state, action);
        default: return state;
    }
}

export default reducer;