import React from 'react'
import { connect } from 'react-redux'

const Notification = ({ notification }) => {
    const style = {
        color: notification.type === 'error' ? 'red' : 'green',
        background: 'lightgrey',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    }
    if (notification === '') {
        return null
    } else {
        return (
            <div style={style}>
                {notification.content}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        notification: state.notification
    }
}

export default connect(mapStateToProps)(Notification)