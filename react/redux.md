# Redux

Redux nie wchodz w skłąd reacta i jest od niego niezależny  
Ponizszy kod odpalamy w node  
```javascript
const  redux = require('redux');
const createStore = redux.createStore;

const initialState = {
    counter: 0 
}

// Reducer
const rootReducer = (state=initialState, action) => {
    if (action.type==='INC_COUNTER') {
        return {
            ...state,  //nigdy nie modyfikujemy oryginalnego statu
            counter: state.counter +1
        }
    }
    if (action.type==='ADD_COUNTER') {
        return {
            ...state,  //nigdy nie modyfikujemy oryginalnego statu
            counter: state.counter + action.value
        }
    }    
    return state;
}


// Store
const store = createStore(rootReducer);
console.log(store.getState());

// Subscription
store.subscribe( () => {
    console.log('Subscription :', store.getState());
})



//Dispatching Action
store.dispatch({type: 'INC_COUNTER'}) ;
store.dispatch({type: 'ADD_COUNTER', value: 10}) ;
console.log(store.getState());
```
