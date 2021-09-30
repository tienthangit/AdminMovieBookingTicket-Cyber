import { movieServices } from "../../services/movieServices";
import { openNotificationWithIcon } from "../../utils/notifications/notifications";
import { createActions } from "../constants/createAction";
import { GET_LIST_MOVIE, GET_MOVIE_DETAIL } from "../constants/movieConstant";
import { OFF_LOADING, ON_LOADING } from "../constants/loadingConstants";


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
export const addMovieAction = (formData,callBack) => {
    return async (dispatch) => {
        try
        {
            const result = await movieServices.addFilmMovie(formData);
            // console.log(result.data.content);
            openNotificationWithIcon('success', result.data?.message)
            callBack();
        } catch (err)
        {
            openNotificationWithIcon('error', err.response?.data?.message)
            console.log(err.response);
        }
    }
}

//=====================> GET DETAIL MOVIE

export const getInfoMovieAction = (maPhim) => {
    return async (dispatch) => {
        try
        {
            // await dispatch(createActions(ON_LOADING))
            const result = await movieServices.getInfoMovie(maPhim);
            dispatch(createActions(GET_MOVIE_DETAIL, result.data.content))
            // dispatch(createActions(OFF_LOADING))
            // console.log(result.data);
        } catch (err)
        {
            // dispatch(createActions(OFF_LOADING))
            console.log(err.response);
        }
    }
}
//=====================> UPDATE MOVIE
export const updateMovieAction = (formData, callback) => {
    return async (dispatch) => {
        try
        {
            await dispatch(createActions(ON_LOADING))
            const result = await movieServices.updateMovie(formData);
            openNotificationWithIcon('success', `Cập nhật thành công!..`)
            // dispatch(getAllMovieListAction())
            await dispatch(createActions(OFF_LOADING))
            callback();
            // console.log(result.data);
        } catch (err)
        {
            dispatch(createActions(OFF_LOADING))
            openNotificationWithIcon('error', err.response?.data?.content)
            console.log(err.response);
        }
    }
}
//=====================> DELETE MOVIE
export const deleteMovieAction = (maPhim) => {
    return async (dispatch) => {
        try
        {
            await dispatch(createActions(ON_LOADING))
            const result = await movieServices.deleteMovie(maPhim);
            openNotificationWithIcon('success', `Xóa phim thành công!..`)
            dispatch(getAllMovieListAction())
            dispatch(createActions(OFF_LOADING))
            // console.log(result.data);
        } catch (err)
        {
            dispatch(createActions(OFF_LOADING))
            openNotificationWithIcon('error', err.response?.data?.content)
            console.log(err.response);
        }
    }
}