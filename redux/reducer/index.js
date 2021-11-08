import { combineReducers } from "redux";
import venueReducer from "./venueReducer";
import userVenueReducer from "./userVenueReducer";
import venueVerifiedReducer from "./venueVerifiedReducer";

const rootReducer = combineReducers({
  venue: venueReducer,
  userVenue:userVenueReducer,
  venueVerified:venueVerifiedReducer
});

export default rootReducer;
