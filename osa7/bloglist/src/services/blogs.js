import axios from 'axios'
const baseUrl = `${BACKEND_URL}/api/blogs`

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

const createComment = async (blog, comment) => {
  const response = await axios.post(`${baseUrl}/${blog.id}/comments`, comment)
  return response.data
}

const update = async requestBlog => {
  const response = await axios.put(`${baseUrl}/${requestBlog.id}`, requestBlog)
  return response.data
}

const deletion = async id => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response.data
}

export default { setToken, getAll, create, createComment, update, deletion }