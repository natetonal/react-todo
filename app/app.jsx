var React = require('react');
var ReactDOM = require('react-dom');

var {Provider} = require('react-redux');
var {Route, Router, IndexRoute, hashHistory} = require('react-router');

import TodoApp from 'TodoApp';
import TodoLogin from 'TodoLogin';

var actions = require('actions');
var store = require('configureStore').configure();
var TodoAPI = require('TodoAPI');

import './../playground/firebase/index';

// Start fetching data from Firebase database
store.dispatch(actions.startAddTodos());

// Load foundation
$(document).foundation();

// App css
require('style!css!sass!applicationStyles')

// The provider allows the entire app (or components you choose) access to the store.
ReactDOM.render(
    <Provider store={store}>
        <Router history={hashHistory}>
            <Route path="/">
                <Route path="todos" component={TodoApp} />
                <IndexRoute component={TodoLogin} />
            </Route>
        </Router>
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
