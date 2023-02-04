import * as actionTypes from "./actionTypes";
import axios from "../../axios-orders";

export const addIngredient = (ingdName) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: ingdName
    }
}

export const removeIngredient = (ingdName) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: ingdName
    }
}

export const setIngredients = (ingredients) => {
    return {
        type: actionTypes.SET_INGREDIENT,
        ingredients: ingredients
    }
}

export const fetchIngredientsStart = () => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_START
    }
}

export const fetchIngredientsFailed = () => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAILED
    }
}

export const initIngredients = () => {
    return async dispatch => {
        dispatch(fetchIngredientsStart());
        await axios.get('/ingredients.json').then(res => {
            dispatch(setIngredients(res['data']));
        }).catch(err => {
            dispatch(fetchIngredientsFailed());
        })
    }
}