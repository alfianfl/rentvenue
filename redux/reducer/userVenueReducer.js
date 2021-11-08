const initialState = {
    loading: false,
    venue: [],
    error: "",
  };
  const userVenueReducer = (state = initialState, action) => {
    switch (action.type) {
      case "FETCH_USER_VENUE_REQUEST":
        return {
          ...state,
          loading: true,
        };
      case "FETCH_USER_VENUE_SUCCESS":
        return {
          loading: false,
          venue: action.payload,
          error: "",
        };
      case "FETCH_USER_VENUE_FAILURE":
        return {
          loading: false,
          venue: [],
          error: action.payload,
        };
      default:
        return state;
    }
  };
  export default userVenueReducer;
  