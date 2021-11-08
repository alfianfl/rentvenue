import { API } from "./API";


export const ProfileAPI = (id, payload) => {
  return API.patch(`/user/${id}`, payload);
};

export const ProfileVendorAPI = (id, payload) => {
    return API.patch(`/vendor/${id}`, payload);
  };
  

