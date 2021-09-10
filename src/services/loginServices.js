import { DOMAIN_MOVIE_CYBER } from '../utils/systemSetting'
import { requests } from './Api/request'

export const loginServices = {
    signIn(userLogin) {
        return requests({
            url: `${DOMAIN_MOVIE_CYBER}/api/QuanLyNguoiDung/DangNhap`,
            method: 'POST',
            data: userLogin
        })
    },
    getInfo() {
        return requests({
            url: `${DOMAIN_MOVIE_CYBER}/api/QuanLyNguoiDung/ThongTinTaiKhoan`,
            method: 'POST',
        })
    }
}