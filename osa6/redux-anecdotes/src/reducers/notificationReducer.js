const notificationReducer = (state = null, action) => {
    switch (action.type) {
        case 'SET_MESSAGE':
            return action.message
        case 'REMOVE_MESSAGE':
            return action.message
        default:
            return state
    }
}

export const setNotification = (message, time) => {
    return async dispatch => {
        await dispatch({
            type: 'SET_MESSAGE',
            message
        })
        setTimeout(() => {
            dispatch({
                type: 'REMOVE_MESSAGE',
                message: null
            })
        }, time)
    }
}

export default notificationReducer