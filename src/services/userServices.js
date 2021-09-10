import { requests } from "../services/Api/request"
import { DOMAIN_MOVIE_CYBER } from "../utils/systemSetting"

export const userServices = {
    getAllUserList() {
        return requests({
            url: `${DOMAIN_MOVIE_CYBER}/api/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=GP01`,
            method: "GET"
        })
    },
    createUser(data) {
        return requests({
            url: `${DOMAIN_MOVIE_CYBER}/api/QuanLyNguoiDung/ThemNguoiDung`,
            method: "POST",
            data
        })
    },
    deleteUser(taikhoan) {
        return requests({
            url: `${DOMAIN_MOVIE_CYBER}/api/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${taikhoan}`,
            method: "DELETE",
        })
    },
    editUser(taikhoan) {
        return requests({
            url: `${DOMAIN_MOVIE_CYBER}/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung`,
            method: "POST",
            data: taikhoan
        })
    },
    getListUser(hoTen = '') {
        if (hoTen.trim() !== '')
        {
            return requests({
                url: `${DOMAIN_MOVIE_CYBER}/api/QuanLyNguoiDung/TimKiemNguoiDung?MaNhom=GP01&tuKhoa=${hoTen}`,
                method: "GET",
            })
        } return requests({
            url: `${DOMAIN_MOVIE_CYBER}/api/QuanLyNguoiDung/TimKiemNguoiDung?MaNhom=GP01`,
            method: "GET",
        })
    }
}