import { GET_LIST_MOVIE, GET_MOVIE_DETAIL } from "../constants/movieConstant"

const initialState = {
    arrMovie: [],
    detailMovie: {},
}

const movieReducer = (state = initialState, { type, payload }) => {
    switch (type)
    {
        case GET_LIST_MOVIE:
            state.arrMovie = payload
            return { ...state }
        case GET_MOVIE_DETAIL:
            state.detailMovie = payload
            return { ...state }

        default:
            return state
    }
}

export default movieReducer;