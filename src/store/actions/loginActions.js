
import { loginServices } from "../../services/loginServices";
import { error } from "../../utils/notifications/notifications";
import { createActions } from "../constants/createAction";
import { ACCOUNT_LOGIN } from '../constants/loginConstants'

export const SignInAction = (userLogin, callback) => {
    return (dispatch) => {
        loginServices.signIn(userLogin)
            .then((res) => {
                localStorage.setItem('toKen', res.data.content.accessToken)
                dispatch(createActions(ACCOUNT_LOGIN, res.data.content))
                localStorage.setItem('maLoaiNguoiDung', res.data.content.maLoaiNguoiDung)
                callback();
                // console.log(res.data.content);
            })
            .catch((err) => {
                error(err.response?.data?.content)
                console.log(err.response?.data);
            })
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