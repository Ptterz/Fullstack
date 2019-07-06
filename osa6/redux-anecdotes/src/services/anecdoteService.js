import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
    return {
        content: anecdote,
        id: getId(),
        votes: 0
    }
}

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const create = async (newObject) => {
    const response = await axios.post(baseUrl, asObject(newObject))
    return response.data
}

const update = async (updatedObject) => {
    const response = await axios.put(`${baseUrl}/${updatedObject.id}`, updatedObject)
    return response.data
}

export default { getAll, create, update }

