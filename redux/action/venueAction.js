import { getVenueAPI } from "../../services/VenueApi";
export const fetchVenue = (id) => {
  return (dispatch) => {
    dispatch(fetchVenueRequest());
    getVenueAPI(id)
        .then(res=>{
            console.log(res);
        })
        .then(err=>{
            console.log(err);
        })
    }
};
export const fetchVenueRequest = () => {
  return {
    type: "FETCH_VENUE_REQUEST",
  };
};

export const fetchVenueSuccess = (Products) => {
  return {
    type: "FETCH_VENUE_SUCCESS",
    payload: Products,
  };
};
export const fetchVenueFailure = (errMsg) => {
  return {
    type: "FETCH_VENUE_FAILURE",
    payload: errMsg,
  };
};
