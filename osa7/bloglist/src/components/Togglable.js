import React, { useState, useImperativeHandle } from 'react'
import Button from 'react-bootstrap/Button'

const Togglable = React.forwardRef((props, ref) => {
    const [visible, setVisible] = useState(false)

    const hideWhenVisible = { display: visible ? 'none' : '' }
    const showWhenVisible = { display: visible ? '' : 'none' }

    const style = {
        marginTop: 5,
        marginBottom: 10
    }

    const toggleVisibility = () => {
        setVisible(!visible)
    }

    useImperativeHandle(ref, () => {
        return {
            toggleVisibility
        }
    })

    return (
        <div>
            <div style={hideWhenVisible}>
                <Button onClick={toggleVisibility} style={style} variant='primary' data-cy='newBlogButton'>{props.buttonLabel}</Button>
            </div>
            <div style={showWhenVisible}>
                {props.children}
            </div>
        </div>
    )
})

export default Togglable