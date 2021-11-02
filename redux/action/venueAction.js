import { getVenueAPI } from "../../services/VenueApi";
export const fetchVenue = (id) => {
  return (dispatch) => {
    dispatch(fetchVenueRequest());
    getVenueAPI(id)
    .then((response) => {
        const venue = response.data.data;
        dispatch(fetchVenueSuccess(venue));
      })
      .catch((err) => {
        const errMsg = err.message;
        dispatch(fetchVenueFailure(errMsg));
      });
    }
};
export const fetchVenueRequest = () => {
  return {
    type: "FETCH_VENUE_REQUEST",
  };
};

export const fetchVenueSuccess = (venue) => {
  return {
    type: "FETCH_VENUE_SUCCESS",
    payload: venue,
  };
};
export const fetchVenueFailure = (errMsg) => {
  return {
    type: "FETCH_VENUE_FAILURE",
    payload: errMsg,
  };
};
