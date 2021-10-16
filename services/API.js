import axios from "axios";

const baseURL = `http`;

export const API = axios.create({
    baseURL: baseURL ,
    headers: {}
});