import { GET_USER_LIST, GET_USER_EDIT } from "../constants/userConstants"

const initialState = {
    arrUser: [],
    userEdit:{}
}

export const userReducer = (state = initialState, { type, payload }) => {
    switch (type)
    {

        case GET_USER_LIST:
            state.arrUser = payload
            return { ...state }
        case GET_USER_EDIT:
            state.userEdit = payload
            return { ...state }

        default:
            return state
    }
}
