import { API } from "./API";

export const addVenueAPI = (payload) => {
  return API.post("/venue", payload, {withCredentials:true});
};

export const getAllVenueAPI = (city) => {
  return API.get(`/venue`);
};

export const getVenueAPI = (id) => {
  return API.get(`/vendor/${id}/venue/notverified`);
};

export const getVenueVerifiedAPI = (id) => {
  return API.get(`/vendor/${id}/venue/verified`);
};

export const editVenueAPI = (id, payload) => {
  return API.patch(`/venue/${id}`, payload);
};

export const getDetailVenueAPI = (id) => {
  return API.get(`/venue/${id}`);
};

export const deleteVenueAPI = (id) => {
  return API.delete(`/venue/${id}`);
};

export const getAnalyticAPI = (id) => {
  return API.get(`/vendor/${id}/analytic`);
};

export const getVenueByCityAPI = () => {
  return API.get(`/venue/city`);
};

export const getVenueFilterCityAPI = () => {
  return API.get(`/venue/city`);
};

export const getVenueCityAPI = (city) => {
  return API.get(`/venue/search/city/${city}`);
};

export const getVenueCityFilterAPI = (payload) => {
  return API.post(`/venue/search/city`, payload);
};

export const getDateVenue = (id) => {
  return API.get(`/venue/${id}/date`);
};

export const getAscVenue = () => {
  return API.get(`/venue/price/asc`);
};

export const getDescVenue = (id) => {
  return API.get(`/venue/price/desc`);
};

export const getAscVenueCity = (city) => {
  return API.get(`/venue/${city}/price/asc`);
};

export const getDescVenueCity = (city) => {
  return API.get(`/venue/${city}/price/desc`);
};

export const getAdminVenue = () => {
  return API.get(`/admin/venue`);
};

export const submitVenueVerification = (id, payload) => {
  return API.post(`/admin/venue/${id}/verification`, payload);
};

export const getVenueDocument = (id) => {
  return API.get(`/admin/venue/${id}/document`);
};

export const getAdminDataUser = () => {
  return API.get(`/admin/user`);
};

export const getAdminDataVendor = () => {
  return API.get(`/admin/vendor`);
};



