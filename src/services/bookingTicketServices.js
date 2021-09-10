import { DOMAIN_MOVIE_CYBER } from '../utils/systemSetting'
import { requests } from './Api/request'

export const bookingTicketServices = {
    createShowTimes(infoShowTime) {
        return requests({
            url: `${DOMAIN_MOVIE_CYBER}/api/QuanLyDatVe/TaoLichChieu`,
            method: 'POST',
            data: infoShowTime
        })
    },
}