import { ACCOUNT_LOGIN } from "../constants/loginConstants"

const initialState = {
    accountLogin: {}
}

export const loginReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case ACCOUNT_LOGIN:
        state.accountLogin = payload
        return { ...state }

    default:
        return state
    }
}
