import axiosInstance from './axiosInstance'

export const registerUser = (data) =>
  axiosInstance.post('/auth/register', data)

export const loginUser = (data) =>
  axiosInstance.post('/auth/login', data)

export const getProducts = (page = 1, limit = 10) =>
  axiosInstance.get(`/products?page=${page}&limit=${limit}`)

export const getProductById = (id) =>
  axiosInstance.get(`/products/${id}`)

export const getCategories = (page = 1, limit = 10) =>
  axiosInstance.get(`/categories?page=${page}&limit=${limit}`)

export const getCategoryById = (id) =>
  axiosInstance.get(`/categories/${id}`)
