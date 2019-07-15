import React from 'react'
import { connect } from 'react-redux'

const User = (props) => {
    if (props.user === undefined) {
        return (
            <div>
                Loading user info...
            </div>
        )
    }
    return (
        <div>
            <h2>{props.user.name}</h2>
            <h3>Added blogs</h3>
            <ul>
                {props.user.blogs.length === 0
                    ? <li>No blogs added</li>
                    : props.user.blogs.map(blog => <li key={blog.id}>{blog.title}</li>)
                }
            </ul>
        </div>
    )
}

const mapStateToProps = (state, ownProps) => {
    return {
        user: ownProps.usr
    }
}

export default connect(mapStateToProps)(User)