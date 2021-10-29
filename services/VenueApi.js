import { API } from "./API";

export const addVenueAPI = (payload) => {
  return API.post("/venue", payload, {withCredentials:true});
};

export const getVenueAPI = (id) => {
  return API.get(`/vendor/${id}/venue/notverified`);
};