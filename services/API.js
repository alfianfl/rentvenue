import axios from "axios";

const baseURL = `https://rentavenue-backend.herokuapp.com/api`;

export const API = axios.create({
    baseURL: baseURL,
    withCredentials:true,
    headers: {}
});