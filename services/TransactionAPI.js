import { API } from "./API";

export const bookingAPI = (payload) => {
  return API.post("/transaction", payload, {withCredentials:true});
};

export const getPendingTransactionAPI = (id) => {
  return API.get(`/user/${id}/transaction/pending`);
};

export const getSuccessTransactionAPI = (id) => {
  return API.get(`/user/${id}/transaction/success`);
};

export const getFinishedTransactionAPI = (id) => {
  return API.get(`/user/${id}/transaction/finish`);
};

export const feedbackAPI = (id, payload) => {
  return API.post(`/transaction/${id}/feedback/`, payload);
};


