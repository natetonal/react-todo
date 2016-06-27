var React = require('react');
var ReactDOM = require('react-dom');

var {Provider} = require('react-redux');
var {Route, Router, IndexRoute, hashHistory} = require('react-router');

var TodoApp = require('TodoApp');

var actions = require('actions');
var store = require('configureStore').configure();

store.subscribe(() => {
    console.log('New state: ', store.getState());
});

// Load foundation
$(document).foundation();

// App css
require('style!css!sass!applicationStyles')

// The provider allows the entire app (or components you choose) access to the store.
ReactDOM.render(
  <Provider store={store}>
    <TodoApp />
  </Provider>,
  document.getElementById('app')
);
