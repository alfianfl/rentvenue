import { API } from "./API";

export const registerAPI = (payload) => {
  return API.post("/user/register", payload);
};

export const loginAPI = (payload) => {
  return API.post("/user/login", payload);
};

export const registerVendorAPI = (payload) => {
  return API.post("/vendor/register", payload);
};

export const loginVendorAPI = (payload) => {
  return API.post("/vendor/login", payload);
};
