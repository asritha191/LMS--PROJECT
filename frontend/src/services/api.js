import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'https://fakestoreapi.com',
})

export const getCourses = () => {
  return apiClient.get('/products')
}

export const getCourseById = (id) => {
  return apiClient.get(`/products/${id}`)
}

