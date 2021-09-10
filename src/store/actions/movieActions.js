import { movieServices } from "../../services/movieServices";
import { success, error } from "../../utils/notifications/notifications";
import { createActions } from "../constants/createAction";
import { GET_LIST_MOVIE, GET_MOVIE_DETAIL } from "../constants/movieConstant";

//=====================> GET_ALL_LIST MOVIE
export const getAllMovieListAction = () => {
    return async (dispatch) => {
        try
        {
            const result = await movieServices.getAllMovieList();
            dispatch(createActions(GET_LIST_MOVIE, result.data.content))
            // console.log(result.data);
        } catch (err)
        {
            console.log(err.response);
        }
    }
}
//=====================> SEARCH MOVIE
export const getListMovieAction = (tenPhim = '') => {
    return async (dispatch) => {
        try
        {
            const result = await movieServices.getListMovie(tenPhim);
            dispatch(createActions(GET_LIST_MOVIE, result.data.content))
            // console.log(result.data.content);
        }
        catch (err)
        {
            console.log(err.response);
        }
    }
}

//=====================> ADD MOVIE
export const addMovieAction = (formData) => {
    return async (dispatch) => {
        try
        {
            const result = await movieServices.addFilmMovie(formData);
            // console.log(result.data.content);
            success(result.data?.message)

        } catch (err)
        {
            error(err.response?.data?.content)
            console.log(err.response);
        }
    }
}

//=====================> GET DETAIL MOVIE

export const getInfoMovieAction = (maPhim) => {
    return async (dispatch) => {
        try
        {
            const result = await movieServices.getInfoMovie(maPhim);
            dispatch(createActions(GET_MOVIE_DETAIL, result.data.content))
            // console.log(result.data);
        } catch (err)
        {
            console.log(err.response);
        }
    }
}
//=====================> UPDATE MOVIE
export const updateMovieAction = (formData, callback) => {
    return async (dispatch) => {
        try
        {
            const result = await movieServices.updateMovie(formData);
            success(result.data?.message)
            // dispatch(getAllMovieListAction())
            callback();
            // console.log(result.data);
        } catch (err)
        {
            console.log(err.response);
        }
    }
}
//=====================> DELETE MOVIE
export const deleteMovieAction = (maPhim) => {
    return async (dispatch) => {
        try
        {
            const result = await movieServices.deleteMovie(maPhim);
            success(result.data?.message)
            dispatch(getAllMovieListAction())
            // console.log(result.data);
        } catch (err)
        {

            console.log(err.response);
        }
    }
}