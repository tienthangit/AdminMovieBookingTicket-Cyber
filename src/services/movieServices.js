import { DOMAIN_MOVIE_CYBER } from '../utils/systemSetting'
import { requests } from './Api/request'

export const movieServices = {
    getAllMovieList() {
        return requests({
            url: `${DOMAIN_MOVIE_CYBER}/api/QuanLyPhim/LayDanhSachPhim?maNhom=GP01`,
            method: 'GET',
        })
    },
    deleteMovie(maPhim) {
        return requests({
            url: `${DOMAIN_MOVIE_CYBER}/api/QuanLyPhim/XoaPhim?MaPhim=${maPhim}`,
            method: 'DELETE'
        })
    },
    getDetailMovie(maPhim) {
        return requests({
            url: `${DOMAIN_MOVIE_CYBER}/api/QuanLyPhim/LayThongTinPhim?MaPhim=${maPhim}`,
            method: 'GET'
        })
    },
    getListMovie(tenPhim = '') {
        if (tenPhim.trim() !== '')
        {
            return requests({
                url: `${DOMAIN_MOVIE_CYBER}/api/QuanLyPhim/LayDanhSachPhim?maNhom=GP01&tenPhim=${tenPhim}`,
                method: 'GET',
            })
        }
        return requests({
            url: `${DOMAIN_MOVIE_CYBER}/api/QuanLyPhim/LayDanhSachPhim?maNhom=GP01`,
            method: 'GET',
        })
    },
    addFilmMovie(formData) {
        return requests({
            url: `${DOMAIN_MOVIE_CYBER}/api/QuanLyPhim/ThemPhimUploadHinh`,
            method: 'POST',
            data: formData
        })
    },
    getInfoMovie(maPhim) {
        return requests({
            url: `${DOMAIN_MOVIE_CYBER}/api/QuanLyPhim/LayThongTinPhim?MaPhim=${maPhim}`,
            method: 'GET',
        })
    },
    updateMovie(formData) {
        return requests({
            url: `${DOMAIN_MOVIE_CYBER}/api/QuanLyPhim/CapNhatPhimUpload`,
            method: 'POST',
            data: formData
        })
    },
    deleteMovie(maPhim) {
        return requests({
            url: `${DOMAIN_MOVIE_CYBER}/api/QuanLyPhim/XoaPhim?MaPhim=${maPhim}`,
            method: 'DELETE',
        })
    }
}