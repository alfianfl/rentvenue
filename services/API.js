import axios from "axios";

const baseURL = `http://localhost:19089/api`;

export const API = axios.create({
    baseURL: baseURL,
    withCredentials:true,
    headers: {}
});