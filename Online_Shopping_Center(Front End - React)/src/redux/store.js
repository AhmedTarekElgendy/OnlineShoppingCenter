import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import savedItemsReducer from "./saveditemsReducer";
import { logger} from "redux-logger"

const store = createStore(savedItemsReducer, applyMiddleware(logger,thunk));


export default store;
