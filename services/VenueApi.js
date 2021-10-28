import { API } from "./API";

export const addVenueAPI = (payload) => {
  return API.post("/venue", payload, {withCredentials:true});
};

export const loginAPI = (payload) => {
  return API.post("/user/login", payload);
};
