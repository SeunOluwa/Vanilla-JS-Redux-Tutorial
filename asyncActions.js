// redux
const redux = require('redux');
const createStore = redux.createStore;

// middleware
const applyMiddleware = redux.applyMiddleware;
const thunkMiddleware = require('redux-thunk').default;

const axios = require('axios');

// state
const initialState = {
    loading: false,
    users: [],
    error: ''
};

// action types
const FETCH_USER_REQUEST = 'FETCH_USER_REQUEST';
const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';
const FETCH_USER_FAILURE = 'FETCH_USER_FAILURE';

// action creators
const fetchUsersRequest = () => {
    return {
        type: FETCH_USER_REQUEST
    }
};

const fetchUsersSuccess = users => {
    return {
        type: FETCH_USER_SUCCESS,
        payload: users
    }
};

const fetchUsersFailure = error => {
    return {
        type: FETCH_USER_FAILURE,
        payload: error
    }
};

// reducer
const reducer = (state = initialState, action) => {
    switch(action.type) {
        case FETCH_USER_REQUEST:
            return {
                ...state,
                loading: true
            };
        case FETCH_USER_SUCCESS:
            return {
                loading: false,
                users: action.payload,
                error: ''
            };
        case FETCH_USER_FAILURE:
            return {
                loading: false,
                users: [],
                error: action.payload
            };
        default:
            return state;
    };
};

// action creator returning function
const fetchUsers = () => {
    return function(dispatch) {
        dispatch(fetchUsersRequest());
        axios.get('https://jsonplaceholder.typicode.com/users')
          .then(response => {
            //   response.data is the array of users
            const users = response.data.map(user => user.id);
            dispatch(fetchUsersSuccess(users));
          })
          .catch(error => {
            //   error.message is the error description
            dispatch(fetchUsersFailure(error.message));
          });
    };
};

// redux store
const store = createStore(reducer, applyMiddleware(thunkMiddleware));
store.subscribe(() => { console.log(store.getState()) });
store.dispatch(fetchUsers());
