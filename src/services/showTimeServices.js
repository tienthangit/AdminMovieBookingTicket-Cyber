import { DOMAIN_MOVIE_CYBER } from '../utils/systemSetting'
import { requests } from './Api/request'

export const showTimeServices = {
    //==================LayThongTinHeThongRap
    getInfoCinema : () => {
        return requests({
            url: `${DOMAIN_MOVIE_CYBER}/api/QuanLyRap/LayThongTinHeThongRap`,
            method: "GET",
        })
    },
    //==================LayThongTinCumRapTheoHeThong
    getInfoGroupCinema : (maRap) => {
        return requests({
            url: `${DOMAIN_MOVIE_CYBER}/api/QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=${maRap}`,
            method: "GET",
        })
    },
    //==================LayThongTinLichChieuHeThongRap

    getInfoShowTimeCinema : (maRap) => {
        return requests({
            url: `${DOMAIN_MOVIE_CYBER}/api/QuanLyRap/LayThongTinLichChieuHeThongRap?maHeThongRap=${maRap}&maNhom=GP01`,
            method: "GET",
        })
    },
    //==================LayThongTinLichChieuPhim
    getInfoShowTime : (maPhim) => {
        return requests({
            url: `${DOMAIN_MOVIE_CYBER}/api/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${maPhim}`,
            method: "GET",
        })
    }

}