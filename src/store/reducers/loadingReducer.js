import { OFF_LOADING, ON_LOADING } from "../constants/loadingConstants"

const initialState = {
    isLoading: false
}
const loadingReducer = (state = initialState, { type, payload }) => {
    switch (type)
    {
        case ON_LOADING:
            state.isLoading = true;
            return { ...state }
        case OFF_LOADING:
            state.isLoading = false;
            return { ...state }
        default:
            return state
    }
}

export default loadingReducer