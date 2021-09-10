import { OPEN_DRAWER, SUBMIT_DRAWER_CREATE_USER, CLOSE_DRAWER, SUBMIT_DRAWER_EDIT_USER, SUBMIT_DRAWER_EDIT_MOVIE } from '../constants/drawerConstants'
import React from 'react'
const initialState = {
    visible: false,
    title: 'drawer',
    ContentComponent: <p>Default</p>,
    funcSubmit: () => { return alert('test') }
}

const drawerReducer = (state = initialState, { type, payload }) => {
    switch (type)
    {
        case OPEN_DRAWER:
            state.title = payload.title
            state.ContentComponent = payload.content
            return { ...state, visible: true }
        case CLOSE_DRAWER:
            return { ...state, visible: false }
        case SUBMIT_DRAWER_CREATE_USER:
            state.funcSubmit = payload
            return { ...state }
        case SUBMIT_DRAWER_EDIT_USER:
            state.funcSubmit = payload
            return { ...state }
        case SUBMIT_DRAWER_EDIT_MOVIE:
            state.funcSubmit = payload
            return { ...state }

        default:
            return state
    }
}
export default drawerReducer