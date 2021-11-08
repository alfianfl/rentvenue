import { API } from "./API";

export const checkInAPI = (payload) => {
  return API.post("/checkin/in", payload);
};

export const checkOutAPI = (payload) => {
    return API.post("/checkin/out", payload);
};
  

