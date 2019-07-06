import anecdoteService from '../services/anecdoteService'

const compareVotes = (a, b) => b.votes - a.votes

export const upvote = (anecdote) => {
  return async dispatch => {
    const updated = await anecdoteService.update({
      ...anecdote,
      votes: anecdote.votes + 1
    })
    dispatch({
      type: 'VOTE',
      anecdote: updated
    })
  }
}

export const createNew = (anecdote) => {
  return async dispatch => {
    const response = await anecdoteService.create(anecdote)
    dispatch({
      type: 'NEW_ANECDOTE',
      anecdote: response
    })
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    })
  }
}

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'VOTE':
      state = state.map(anec => anec.id !== action.anecdote.id ? anec : action.anecdote)
      return state.sort(compareVotes)
    case 'NEW_ANECDOTE':
      return state.concat(action.anecdote)
    case 'INIT_ANECDOTES':
      return action.data
    default:
      return state
  }
}

export default reducer