import notificationReducer from './notificationReducer'
import deepFreeze from 'deep-freeze'

describe('notificationReducer', () => {
    test('returns a new state with action SET_NOTIFICATION', () => {
        const state = ''
        const action = {
            type: 'SET_NOTIFICATION',
            data: {
                type: '',
                content: 'Hello world'
            }
        }

        deepFreeze(state)
        const newState = notificationReducer(state, action)

        expect(newState.content).not.toEqual('')
        expect(newState.content).toEqual('Hello world')
    })

    test('returns an empty state with action REMOVE_NOTIFICATION', () => {
        const state = 'Old notification'
        const action = {
            type: 'REMOVE_NOTIFICATION'
        }

        deepFreeze(state)
        const newState = notificationReducer(state, action)

        expect(newState).not.toEqual('Old notification')
        expect(newState).toEqual('')
    })
})