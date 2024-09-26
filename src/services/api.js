import axios from "axios";

const api = axios.create({
  baseURL: "https://dummyjson.com", //api url
});

export const login = (credentials) => api.post("/auth/login", credentials);
export const getUsers = () => api.get("/users");
export const getUserOrders = (userId) => api.get(`/users/${userId}/orders`);
export const updateUser = (userId, data) => api.put(`/users/${userId}`, data);
export const deleteUser = (userId) => api.delete(`/users/${userId}`);
export const deleteOrder = (orderId) => api.delete(`/orders/${orderId}`);
