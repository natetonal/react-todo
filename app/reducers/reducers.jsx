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
            return !state.showCompleted;
        default:
            return state;
    }
};

export var todosReducer = (state = [], action) => {
    switch(action.type){
        case 'ADD_TODO':
            return [
                ...state,
                {
                    id: uuid(),
                    text: action.text,
                    completed: false,
                    createdAt: moment().unix(),
                    completedAt: undefined
                }
            ];
        case 'TOGGLE_TODO':
            return state.map((todo) => {
                if(todo.id === action.id){
                    var nextCompleted = !todo.completed;
                    return {
                        ...todo,
                        completed: nextCompleted,
                        completedAt: nextCompleted ? moment().unix() : undefined
                    };
                } else {
                    return todo;
                }
            });
        // Add case for TOGGLE_TODO (needs to match id in todos array, then modify by setting completed to !completed and update completedAt)
        // Use moment for completed at if completed, clear if uncompleting.

        default:
            return state;
    }
};
