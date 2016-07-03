// Pass in social authentication here:
import firebase, {firebaseRef, githubProvider} from 'app/firebase/';
import moment from 'moment';

export var setSearchText = (searchText) => {
    return {
        type: 'SET_SEARCH_TEXT',
        searchText
    };
};

export var toggleShowCompleted = () => {
    return {
        type: 'TOGGLE_SHOW_COMPLETED'
    };
};

export var addTodo = (todo) => {
    return {
        type: 'ADD_TODO',
        todo
    };
};

// With the Thunk middleware, actions can be taught to return functions rather than objects.
// These middleware action functions have the benefit of being passed a dispatch and getState call as arguments.

export var startAddTodo = (text) => {
    return (dispatch, getState) => {
        var todo = {
            text,
            completed: false,
            createdAt: moment().unix(),
            completedAt: null
        };
        // getState gets the current state from the store.
        var uid = getState().auth.uid;
        var todoRef = firebaseRef.child(`users/${uid}/todos`).push(todo);

        return todoRef.then(() => {
            dispatch(addTodo({
                ...todo,
                id: todoRef.key
            }));
        });
    };
};

export var addTodos = (todos) => {
    return {
        type: 'ADD_TODOS',
        todos
    }
};

export var startAddTodos = () => {
    return (dispatch, getState) => {
        var uid = getState().auth.uid;
        var todosRef = firebaseRef.child(`users/${uid}/todos`);
        return todosRef.once('value').then((snapshot) => {
            var todosObj = snapshot.val()
            var todos = [];
            console.log('todosObj: ', todosObj);
            if(todosObj){
                todos = Object.keys(todosObj).map((todoKey) => {
                    return {
                        ...todosObj[todoKey],
                        id: todoKey
                    };
                });
            }

            dispatch(addTodos(todos));

        });
    };
};

export var updateTodo = (id, updates) => {
    return {
        type: 'UPDATE_TODO',
        id,
        updates
    };
};

export var clearTodosOnLogout = () => {
    return {
        type: 'CLEAR_TODOS_ON_LOGOUT'
    };
};

export var startToggleTodo = (id, completed) => {
    return (dispatch, getState) => {
        var uid = getState().auth.uid;
        var todoRef = firebaseRef.child(`users/${uid}/todos/${id}`);
        var updates = {
            completed,
            completedAt: completed ? moment().unix() : null
        };

        return todoRef.update(updates).then(() => {
            dispatch(updateTodo(id, updates));
        });
    };
};


export var login = (uid) => {
    return{
        type: 'LOGIN',
        uid
    };
};

export var logout = () => {
    return{
        type: 'LOGOUT'
    };
};

export var startLogin = () => {
    return (dispatch, getState) => {
        firebase.auth().signInWithPopup(githubProvider).then((result) => {
            // There's a ton of helpful data that comes back in the result object. Remember this!!!
            console.log('Auth worked! ', result);
        }, (error) => {
            console.log('Unable to auth: ', error);
        });
    };
};

export var startLogout = () => {
    return (dispatch, getState) => {
        firebase.auth().signOut().then(() => {
            console.log('Logged out!');
        }, () => {

        });
    };
};
