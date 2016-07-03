var React = require('react');
var ReactDOM = require('react-dom');

var {Provider} = require('react-redux');
var {hashHistory} = require('react-router');

var actions = require('actions');
var store = require('configureStore').configure();

import firebase from 'app/firebase/';
import router from 'app/router/';

// onAuthStateChanged takes a function as its only argument, and passes "user" into its callback.
// If "user" exists, someone is logged in. If not, then they're logged out.

firebase.auth().onAuthStateChanged((user) => {
    if(user){
        store.dispatch(actions.login(user.uid));
        // Start fetching data from Firebase database
        store.dispatch(actions.startAddTodos());
        hashHistory.push('todos');
    } else {
        store.dispatch(actions.logout());
        store.dispatch(actions.clearTodosOnLogout());
        hashHistory.push('/');
    }
});

import './../playground/firebase/index';

// Load foundation
$(document).foundation();

// App css
require('style!css!sass!applicationStyles')



// The provider allows the entire app (or components you choose) access to the store.
ReactDOM.render(
    <Provider store={store}>
        {router}
    </Provider>,
  document.getElementById('app')
);

// This is how the initialState was pulled using localStorage:
// store.subscribe(() => {
//     var state = store.getState();
//     console.log('New state: ', store.getState());
//     TodoAPI.setTodos(state.todos);
// });

// var initialTodos = TodoAPI.getTodos();
// store.dispatch(actions.addTodos(initialTodos))
