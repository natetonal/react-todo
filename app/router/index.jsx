import React from 'react';
import {Route, Router, IndexRoute, hashHistory} from 'react-router';
import TodoApp from 'TodoApp';
import TodoLogin from 'TodoLogin';
import firebase from 'app/firebase';

// React-Router middleware (next allows async actions)
var requireLogin = (nextState, replace, next) => {
    if(!firebase.auth().currentUser){
        // replace is similar to hashHistory.push()
        replace('/');
    }
    next();
};

var redirectIfLoggedIn = (nextState, replace, next) => {
    if(firebase.auth().currentUser){
        replace('todos');
    }
    next();
};

export default (
    <Router history={hashHistory}>
        <Route path="/">
            <Route path="todos" component={TodoApp} onEnter={requireLogin} />
            <IndexRoute component={TodoLogin} onEnter={redirectIfLoggedIn}/>
        </Route>
    </Router>
);
