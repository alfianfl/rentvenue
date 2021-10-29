import { combineReducers } from "redux";
import venueReducer from "./venueReducer";

const rootReducer = combineReducers({
  venue: venueReducer,
});

export default rootReducer;
