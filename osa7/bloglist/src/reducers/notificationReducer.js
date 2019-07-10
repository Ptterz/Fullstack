export const setNotification = (data, time) => {
    return async dispatch => {
        await dispatch({
            type: 'SET_NOTIFICATION',
            data
        })
        setTimeout(() => {
            dispatch({
                type: 'REMOVE_NOTIFICATION',
                data: ''
            })
        }, time)
    }
}

const notificationReducer = (state = '', action) => {
    switch (action.type) {
        case 'SET_NOTIFICATION':
            return action.data
        case 'REMOVE_NOTIFICATION':
            return action.data
        default:
            return state
    }
}

export default notificationReducer