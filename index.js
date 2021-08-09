// redux
const redux = require('redux');
const createStore = redux.createStore;
const combineReducers = redux.combineReducers;

// middleware
const applyMiddleware = redux.applyMiddleware;

// logger
const reduxLogger = require('redux-logger');
const logger = reduxLogger.createLogger();

// action types
const BUY_CAKE = 'BUY_CAKE';
const BUY_ICECREAM = 'BUY_ICECREAM';

// action creators
function buyCake() {
    return {
        type: BUY_CAKE,
        info: 'First redux action'
    };
};

function buyIceCream() {
    return {
        type: BUY_ICECREAM
    }
}

// state
// const initialState = {
//     numOfCakes: 10,
//     numOfIceCreams: 20
// };

const initialCakeState = {
    numOfCakes: 10
};

const initialIceCreamState = {
    numOfIceCreams: 20
};

// reducers
// const reducer = (state = initialState, action) => {
//     switch(action.type) {
//         case BUY_CAKE:
//             return {
//                 ...state,
//                 numOfCakes: state.numOfCakes - 1
//             };

//         case BUY_ICECREAM:
//             return {
//                 ...state,
//                 numOfIceCreams: state.numOfIceCreams - 1
//             };

//             default:
//                 return state;
//     };
// };

const cakeReducer = (state = initialCakeState, action) => {
    switch(action.type) {
        case BUY_CAKE:
            return {
                ...state,
                numOfCakes: state.numOfCakes - 1
            };

            default:
                return state;
    };
};

const iceCreamReducer = (state = initialIceCreamState, action) => {
    switch(action.type) {
        case BUY_ICECREAM:
            return {
                ...state,
                numOfIceCreams: state.numOfIceCreams - 1
            };

            default:
                return state;
    };
};

// combine reducers
const rootReducer = combineReducers({
    cake: cakeReducer,
    iceCream: iceCreamReducer    
});

// redux store
const store = createStore(rootReducer, applyMiddleware(logger));
console.log('Initial state', store.getState());
const unsubscribe = store.subscribe(() => {});
store.dispatch(buyCake())
store.dispatch(buyCake())
store.dispatch(buyCake())
store.dispatch(buyIceCream())
store.dispatch(buyIceCream())
unsubscribe();
