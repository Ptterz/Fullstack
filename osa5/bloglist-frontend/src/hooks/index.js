/* eslint-disable indent */
import { useState } from 'react'
import axios from 'axios'

export const useField = (type) => {
    const [value, setValue] = useState('')

    const onChange = (event) => {
        setValue(event.target.value)
    }

    const reset = () => setValue('')

    return {
        inputContent: {
            type,
            value,
            onChange,
        },
        reset
    }
}

export const useResource = (baseUrl) => {
    const [resources, setResources] = useState([])
    let token = null

    const setToken = newToken => {
        token = `Bearer ${newToken}`
    }

    const getAll = () => {
        const request = axios.get(baseUrl)
        return request.then(response => response.data)
    }

    const create = async newObject => {
        const config = {
            headers: { Authorization: token },
        }
        const response = await axios.post(baseUrl, newObject, config)
        return response.data
    }

    const update = async (requestBlog, id) => {
        const response = await axios.put(`${baseUrl}/${id}`, requestBlog)
        return response.data
    }

    const deletion = async id => {
        const config = {
            headers: { Authorization: token },
        }
        const response = await axios.delete(`${baseUrl}/${id}`, config)
        return response.data
    }

    const service = {
        setToken,
        setResources,
        getAll,
        create,
        update,
        deletion,
    }

    return [
        resources, service
    ]
}