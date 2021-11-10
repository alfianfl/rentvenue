import { API } from "./API";


export const ProfileAPI = (id, payload) => {
  return API.patch(`/user/${id}`, payload);
};

export const ProfileVendorAPI = (id, payload) => {
    return API.patch(`/vendor/${id}`, payload);
  };

  export const getProfileAPI = (id) => {
    return API.get(`/user/${id}`);
  };
  

