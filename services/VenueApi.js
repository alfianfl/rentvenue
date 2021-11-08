import { API } from "./API";

export const addVenueAPI = (payload) => {
  return API.post("/venue", payload, {withCredentials:true});
};

export const getAllVenueAPI = () => {
  return API.get("/venue");
};

export const getVenueAPI = (id) => {
  return API.get(`/vendor/${id}/venue/notverified`);
};

export const getVenueVerifiedAPI = (id) => {
  return API.get(`/vendor/${id}/venue/verified`);
};

export const getDetailVenueAPI = (id) => {
  return API.get(`/venue/${id}`);
};

export const deleteVenueAPI = (id) => {
  return API.delete(`/venue/${id}`);
};