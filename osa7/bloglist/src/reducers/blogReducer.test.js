import blogReducer from './blogReducer'
import deepFreeze from 'deep-freeze'

describe ('blogReducer', () => {
    test('Returns a new array with added blog in it with ADD_BLOG', () => {
        const state = []
        const action = {
            type: 'ADD_BLOG',
            blog: {
                title: 'Howdy',
                author: 'Pete',
                url: 'website',
                likes: 0
            }
        }

        deepFreeze(state)
        const newState = blogReducer(state, action)

        expect(newState.length).toBe(state.length + 1)
    })
})