import { API } from "./API";

export const registerAPI = (payload) =>{
    return API.post("/register", payload);
};

export const loginAPI = (payload) =>{
    return API.post("/register", payload);
};


