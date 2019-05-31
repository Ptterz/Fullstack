import axios from 'axios'
const baseURL = 'https://murmuring-escarpment-81876.herokuapp.com'

const getAll = () => {
    const request = axios.get(`${baseURL}/api/persons`)
    return request.then(response => response.data)
}

const create = newPerson => {
    const request = axios.post(`${baseURL}/api/persons`, newPerson)
    return request.then(response => response.data)
}

const deletePerson = id => {
    const url = `${baseURL}/${id}`
    const request = axios.delete(url)
    return request.then(response => response.data)
}

const updatePerson = person => {
    console.log(person)
    const url = `${baseURL}/api/persons/${person.id}`
    const request = axios.put(url, person)
    return request.then(response => response.data)
}

export default { getAll, create, deletePerson, updatePerson }