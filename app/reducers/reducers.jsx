var uuid = require('node-uuid');
var moment = require('moment');

export var searchTextReducer = (state = '', action) => {
    switch(action.type){
        case 'SET_SEARCH_TEXT':
            return action.searchText;
        default:
            return state;
    }
};

export var showCompletedReducer = (state = false, action) => {
    switch(action.type){
        case 'TOGGLE_SHOW_COMPLETED':
            return !state;
        default:
            return state;
    }
};

export var authReducer = (state = {}, action) => {
    switch(action.type){
        case 'LOGIN':
            return {
                uid: action.uid
            };
        case 'LOGOUT':
            return {};
        default:
            return state;
    }
};

export var todosReducer = (state = [], action) => {
    switch(action.type){
        case 'ADD_TODO':
            return [
                ...state,
                action.todo
            ];
        case 'ADD_TODOS':
            return [
                ...state,
                ...action.todos
            ];
        case 'UPDATE_TODO':
        // when using the spread operator one after the other in an object,
        // the 2nd one will override the 1st in priority.
            return state.map((todo) => {
                if(todo.id === action.id){
                    return{
                        ...todo,
                        ...action.updates
                    }
                } else {
                    return todo;
                }
            });
        // Add case for TOGGLE_TODO (needs to match id in todos array, then modify by setting completed to !completed and update completedAt)
        // Use moment for completed at if completed, clear if uncompleting.
        case 'CLEAR_TODOS_ON_LOGOUT':
            return [];
        default:
            return state;
    }
};
