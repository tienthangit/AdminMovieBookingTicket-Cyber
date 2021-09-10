import { userServices } from "../../services/userServices";
import { success, error } from "../../utils/notifications/notifications";
import { createActions } from "../constants/createAction";
import { CLOSE_DRAWER } from "../constants/drawerConstants";
import { GET_USER_LIST } from "../constants/userConstants";

export const getAllUserListActions = (dispatch) => {
    return userServices.getAllUserList()
        .then(res => {
            dispatch(createActions(GET_USER_LIST, res.data.content))
            // console.log(res.data);
        })
        .catch(err => {
            console.log(err.response?.data);
        })
}

export const createUserAction = (newUser) => {
    return (dispatch) => {
        return userServices.createUser(newUser)
            .then(res => {
                // console.log(res);
                success(res.data.message);
                dispatch(createActions(CLOSE_DRAWER))
                dispatch(getAllUserListActions)
            })
            .catch(err => {
                console.log(err);
                error(err.response?.data?.content)
            })
    }
}
export const deleteUserAction = (taiKhoan) => {

    return async (dispatch) => {
        try
        {
            const result = await userServices.deleteUser(taiKhoan)
            // console.log(result);
            success(result.data?.content)
            //load lại danh sách phim
            dispatch(getAllUserListActions)

        } catch (err)
        {
            error(err.response?.data?.content)
            console.log(err.response?.data)
        }
    }
}
export const EditUserAction = (newData) => {
    return async (dispatch) => {
        try
        {
            const result = await userServices.editUser(newData);
            success(result.data?.message)
            //load lại danh sách phim
            dispatch(getAllUserListActions)
            dispatch(createActions(CLOSE_DRAWER))
            // console.log(result);

        } catch (err)
        {
            console.log(err.response?.data);
        }
    }
}

export const getListUserAction = (hoTen = "") => {
    return async (dispatch) => {
        try
        {
            const result = await userServices.getListUser(hoTen);
            dispatch(createActions(GET_USER_LIST, result.data.content))
        }
        catch (err)
        {
            console.log(err);
        }
    }
}