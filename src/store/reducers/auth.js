import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
    token: null,
    userId: null,
    error: null,
    isLoading: false,
    authRedirectPath: '/'
};

const authStart = (state, action) => {
    return updateObject(state, { isLoading: true, error: null });
};

const authFail = (state, action) => {
    return updateObject(state, { isLoading: false, error: action.err });
};

const authSuccess = (state, action) => {
    return updateObject(state,
        {
            isLoading: false,
            error: null,
            token: action.idToken,
            userId: action.userId
        });
};

const authLogout = (state, action) => {
    return updateObject(state, { token: null, userId: null });
};

const setAuthRedirectPath = (state, action) => {
    return updateObject(state, { authRedirectPath: action.path });
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case (actionTypes.AUTH_START): return authStart(state, action);
        case (actionTypes.AUTH_FAIL): return authFail(state, action);
        case (actionTypes.AUTH_SUCCESS): return authSuccess(state, action);
        case (actionTypes.AUTH_LOGOUT): return authLogout(state, action);
        case (actionTypes.SET_AUTH_REDIRECT_PATH): return setAuthRedirectPath(state, action);
        default: return state;
    }
};

export default reducer;