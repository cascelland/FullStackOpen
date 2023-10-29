import axios from 'axios'
const baseUrl = '/api/blogs'

let token = ''

const createToken = (userToken) => {
  token = `Bearer ${userToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async (newBlog) => {
  const config = {
    headers: { Authorization: `${token}` }
  }
  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

export default { createToken, getAll, create }