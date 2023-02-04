import * as actionTypes from "../actions/actionTypes";

const initialState = {
    orders: [],
    isLoading: false,
    purchased: false,
    isError: false
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case (actionTypes.PURCHASE_INIT):
            return {
                ...state,
                purchased: false
            };
        case (actionTypes.PUCHASE_BURGER_START):
            return {
                ...state,
                isLoading: true
            };
        case (actionTypes.PUCHASE_BURGER_SUCCESS):
            const newOrder = {
                ...action.orderData,
                id: action.orderId,
            };
            return {
                ...state,
                isLoading: false,
                orders: state.orders.concat(newOrder),
                purchased: true
            };
        case (actionTypes.PUCHASE_BURGER_FAIL):
            return {
                ...state,
                isLoading: false
            };
        case (actionTypes.FETCH_ORDERS_SUCCESS):
            return {
                ...state,
                orders: action.orders,
                isError: false,
                isLoading: false
            };
        case (actionTypes.FETCH_ORDERS_FAIL):
            return {

            };
        case (actionTypes.FETCH_ORDERS_START):
            return {
                ...state,
                isLoading: true
            };
        default:
            return state;
    }
}

export default reducer;