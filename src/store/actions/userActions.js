import { userServices } from "../../services/userServices";
import { openNotificationWithIcon} from "../../utils/notifications/notifications";
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
                openNotificationWithIcon('success', `Tạo User mới thành công!!..`)
                dispatch(createActions(CLOSE_DRAWER))
                dispatch(getAllUserListActions)
            })
            .catch(err => {
                openNotificationWithIcon('error', err.response?.data?.content)
                console.log(err);
            })
    }
}

export const deleteUserAction = (taiKhoan) => {

    return async (dispatch) => {
        try
        {
            const result = await userServices.deleteUser(taiKhoan)
            // console.log(result);
            openNotificationWithIcon('success', `Xóa User mới thành công!!..`)
            //load lại danh sách phim
            dispatch(getAllUserListActions)

        } catch (err)
        {
            openNotificationWithIcon('error', err.response?.data?.content)
            console.log(err.response?.data)
        }
    }
}

export const EditUserAction = (newData) => {
    return async (dispatch) => {
        try
        {
            const result = await userServices.editUser(newData);
            openNotificationWithIcon('success', `Cập nhật thành công!!..`)
            //load lại danh sách phim
            dispatch(getAllUserListActions)
            dispatch(createActions(CLOSE_DRAWER))
            // console.log(result);

        } catch (err)
        {
            openNotificationWithIcon('error', err.response?.data?.content)
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