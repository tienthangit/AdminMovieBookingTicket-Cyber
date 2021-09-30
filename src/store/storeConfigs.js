import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk';
import drawerReducer from './reducers/drawerReducer';
import loadingReducer from './reducers/loadingReducer';
import { loginReducer } from './reducers/loginReducer';
import movieReducer from './reducers/movieReducer';
import { userReducer } from './reducers/userReducer';

const rootReducer = combineReducers({
    loginReducer,
    userReducer,
    drawerReducer,
    movieReducer,
    loadingReducer,
})


// để sài redux devtool
const composeEnchancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    rootReducer,
    composeEnchancers(applyMiddleware(thunk)),
);

export default store;