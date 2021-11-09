import { API } from "./API";

export const getFeedbackAPI = (id) => {
  return API.get(`/venue/${id}/feedback`);
};


