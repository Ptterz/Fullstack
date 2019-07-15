import React from 'react'
import {
    BrowserRouter as Router,
    Route, Link, Redirect, withRouter
} from 'react-router-dom'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'

const Navigation = (props) => {
    const padding = {
        padding: 5
    }

    return (
        <div>
            <Navbar collapseOnSelect expand='lg' bg='light'>
                <Navbar.Toggle aria-controls='responsive-navbar-nav' />
                <Navbar.Collapse id='responsive-navbar-nav'>
                    <Nav className='mr-auto'>
                        <Nav.Link href="#blogs" as="span">
                            <Link style={padding} to='/'>blogs</Link>
                        </Nav.Link>
                        <Nav.Link href="#users" as="span">
                            <Link style={padding} to='/users'>users</Link>
                        </Nav.Link>
                        <Nav.Link href="#loggedIn" as="span">
                            {props.user.name} logged in.
                        </Nav.Link>
                        <Nav.Link href="#logoutButton" as="span" onSelect={props.logout}>
                            logout
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    )
}

export default Navigation