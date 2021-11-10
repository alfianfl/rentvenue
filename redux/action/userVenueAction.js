import {getAllVenueAPI } from "../../services/VenueApi";
export const fetchUserVenue = (id) => {
  return (dispatch) => {
    dispatch(fetchUserVenueRequest());
    getAllVenueAPI(id)
    .then((response) => {
        const venue = response.data.data;
        dispatch(fetchUserVenueSuccess(venue));
      })
      .catch((err) => {
        const errMsg = err.message;
        dispatch(fetchUserVenueFailure(errMsg));
      });
    }
};
export const fetchUserVenueRequest = () => {
  return {
    type: "FETCH_USER_VENUE_REQUEST",
  };
};

export const fetchUserVenueSuccess = (venue) => {
  return {
    type: "FETCH_USER_VENUE_SUCCESS",
    payload: venue,
  };
};
export const fetchUserVenueFailure = (errMsg) => {
  return {
    type: "FETCH_USER_VENUE_FAILURE",
    payload: errMsg,
  };
};
