import { API } from "./API";

export const registerAPI = (payload) => {
  return API.post("/user/register", payload);
};

export const loginAPI = (payload) => {
  return API.post("/user/login", payload);
};
