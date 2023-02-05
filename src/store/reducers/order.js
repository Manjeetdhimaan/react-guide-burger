import * as actionTypes from "../actions/actionTypes";

const initialState = {
    orders: [],
    isLoading: false,
    purchased: false,
    error: null
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case (actionTypes.PURCHASE_INIT):
            return {
                ...state,
                purchased: false,
                error: null,
                isLoading: false
            };
        case (actionTypes.PUCHASE_BURGER_START):
            return {
                ...state,
                isLoading: true,
                error: null
            };
        case (actionTypes.PUCHASE_BURGER_SUCCESS):
            const newOrder = {
                ...action.orderData,
                id: action.orderId
            };
            return {
                ...state,
                isLoading: false,
                orders: state.orders.concat(newOrder),
                purchased: true,
                error: null
            };
        case (actionTypes.PUCHASE_BURGER_FAIL):
            return {
                ...state,
                isLoading: false,
                error: action.error
            };
        case (actionTypes.FETCH_ORDERS_SUCCESS):
            return {
                ...state,
                orders: action.orders,
                error: null,
                isLoading: false
            };
        case (actionTypes.FETCH_ORDERS_FAIL):
            return {
                ...state,
                isLoading: false,
                error: action.error,
            };
        case (actionTypes.FETCH_ORDERS_START):
            return {
                ...state,
                isLoading: true,
                error: null
            };
        default:
            return state;
    }
}

export default reducer;