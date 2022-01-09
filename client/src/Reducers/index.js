import removeNotificationReducer from "./removeNotification";   
import fakeFriendListReducer from "./fakeFriendList";
import {combineReducers} from 'redux'

const allReducers = combineReducers({
    data: fakeFriendListReducer,
    removeNotication : removeNotificationReducer
})

export default allReducers;