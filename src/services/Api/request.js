import axios from 'axios'

export const requests = ({ url, method, data, params }) => {
    const variables = {
        url,
        method,
        data,
        params,
        headers: {
            TokenCybersoft: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJGcm9udCBFbmQgNjQiLCJIZXRIYW5TdHJpbmciOiIyMS8wMS8yMDIyIiwiSGV0SGFuVGltZSI6IjE2NDI3MjMyMDAwMDAiLCJuYmYiOjE2MTYxNzMyMDAsImV4cCI6MTY0Mjg3MDgwMH0.2sSWVGy-3Ce9iJ8bIYmYOJ9aE1eu3fz07DtA2ECfiyk'
        }
    }
    const toKen = localStorage.getItem('toKen')
    if (toKen)
    {
        variables.headers = {
            ...variables.headers,
            Authorization: "Bearer " + toKen,
        }
    }
    return axios(variables)
}