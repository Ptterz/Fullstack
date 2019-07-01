/* eslint-disable indent */
import React from 'react'
import { render, waitForElement } from '@testing-library/react'
jest.mock('./services/blogs')
import App from './App'

describe('<App />', () => {
    it('Show login screen if not signed in', async () => {
        const component = render(
            <App />
        )
        component.rerender(<App />)

        await waitForElement(
            () => component.getByText('login')
        )

        expect(component.container).toHaveTextContent('login')

        const blogs = component.container.querySelectorAll('.header')
        expect(blogs.length).toBe(0)
    })

    it('Logged-in user sees the blogs', async () => {
        const user = {
            username: 'Ptterz',
            token: '5d020a83bf0e930f6c513b87',
            name: 'Pete',
        }
        localStorage.setItem('loggedInUser', JSON.stringify(user))

        const component = render(
            <App />
        )

        await waitForElement(
            () => component.container.querySelector('.header')
        )

        component.rerender(<App />)

        component.debug()

        const blogs = component.container.querySelectorAll('.header')
        expect(blogs.length).toBe(3)
    })
})