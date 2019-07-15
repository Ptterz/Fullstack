import React from 'react'
import { connect } from 'react-redux'
import {
    BrowserRouter as Router,
    Route, Link, Redirect, withRouter
  } from 'react-router-dom'
  import Table from 'react-bootstrap/Table'

const Users = (props) => {
    return (
        <div>
            <h2>Users</h2>
            <Table>
                <thead>
                    <tr>
                        <th>User</th>
                        <th>Number of blogs</th>
                    </tr>
                </thead>
                <tbody>
                    {getRows(props.users)}
                </tbody>
            </Table>
        </div>
    )
}

const getRows = users => {
    if (users === null) {
        return (
            <div>
                Loading users...
            </div>
        )
    }

    return (
        users.map(user =>
            <tr key={user.id}>
                <td>
                    <Link to={`/users/${user.id}`}>{user.name}</Link>
                </td>
                <td>
                    {user.blogs.length}
                </td>
            </tr>
        )
    )
}

const mapStateToProps = (state) => {
    return {
        users: state.users
    }
}

export default connect(mapStateToProps)(Users)