import React from 'react'
import { connect } from 'react-redux'

const Notification = (props) => {
    if (props.notification === '') {
        return null
    } else {
        return (
            <div className={props.notification.type}>
                {props.notification.content}
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