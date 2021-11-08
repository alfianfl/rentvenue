const initialState = {
    loading: false,
    venue: [],
    error: "",
  };
  const venueReducer = (state = initialState, action) => {
    switch (action.type) {
      case "FETCH_VENUE_VERIFIED_REQUEST":
        return {
          ...state,
          loading: true,
        };
      case "FETCH_VENUE_VERIFIED_SUCCESS":
        return {
          loading: false,
          venue: action.payload,
          error: "",
        };
      case "FETCH_VENUE_VERIFIED_FAILURE":
        return {
          loading: false,
          venue: [],
          error: action.payload,
        };
      default:
        return state;
    }
  };
  export default venueReducer;
  