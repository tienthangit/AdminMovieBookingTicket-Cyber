
import { loginServices } from "../../services/loginServices";
import { openNotificationWithIcon } from "../../utils/notifications/notifications";
import { createActions } from "../constants/createAction";
import { OFF_LOADING, ON_LOADING } from "../constants/loadingConstants";
import { ACCOUNT_LOGIN } from '../constants/loginConstants'

export const SignInAction = (userLogin, callback) => {
    return async (dispatch) => {
        try
        {
            await dispatch(createActions(ON_LOADING))
            const res = await loginServices.signIn(userLogin)
            openNotificationWithIcon('success', `Xin Chào, ${res.data.content.hoTen}`)
            localStorage.setItem('toKen', res.data.content.accessToken)
            dispatch(createActions(ACCOUNT_LOGIN, res.data.content))
            localStorage.setItem('maLoaiNguoiDung', res.data.content.maLoaiNguoiDung)
            dispatch(createActions(OFF_LOADING))
            callback();
        } catch (err)
        {
            dispatch(createActions(OFF_LOADING))
            openNotificationWithIcon('error', `${err.response?.data?.content}`)
            console.log(err.response?.data);
        }
    }

}

export const GetInfoUserAction = () => {
    return (dispatch) => {
        loginServices.getInfo()
            .then((res) => {
                dispatch(createActions(ACCOUNT_LOGIN, res.data.content))
                // console.log(res.data);
            })
            .catch((err) => {
                console.log(err.response?.data);
            })
    }
}