import { getVenueVerifiedAPI } from "../../services/VenueApi";
export const fetchVenueVerified = (id) => {
  return (dispatch) => {
    dispatch(fetchVenueVerifiedRequest());
    getVenueVerifiedAPI(id)
    .then((response) => {
        const venue = response.data.data;
        dispatch(fetchVenueVerifiedSuccess(venue));
      })
      .catch((err) => {
        const errMsg = err.message;
        dispatch(fetchVenueVerifiedFailure(errMsg));
      });
    }
};
export const fetchVenueVerifiedRequest = () => {
  return {
    type: "FETCH_VENUE_VERIFIED_REQUEST",
  };
};

export const fetchVenueVerifiedSuccess = (venue) => {
  return {
    type: "FETCH_VENUE_VERIFIED_SUCCESS",
    payload: venue,
  };
};
export const fetchVenueVerifiedFailure = (errMsg) => {
  return {
    type: "FETCH_VENUE_VERIFIED_FAILURE",
    payload: errMsg,
  };
};
