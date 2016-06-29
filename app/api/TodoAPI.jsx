var $ = require('jquery');

module.exports = {

    filterTodos: function(todos, showCompleted, searchText){
        var filteredTodos = todos;
        // Filter by showCompleted
        filteredTodos = filteredTodos.filter((todo) => {
            return !todo.completed || showCompleted;
        });

        // Filter by searchText
        if(searchText){
            filteredTodos = filteredTodos.filter((todo) => {
                return todo.text.toLowerCase().indexOf(searchText) > -1;
            });
        }
        // Sort todos with incomplete first
        filteredTodos.sort((a, b) => {
            if(!a.completed && b.completed){
                // A should come before B
                return -1;
            } else if(a.completed && !b.completed){
                // A should come after B
                return 1;
            } else {
                // A and B are equal
                return 0;
            }
        });

        return filteredTodos;
    }
};

// These were used for storing in localStorage:
// setTodos: function(todos) {
//     if($.isArray(todos)){
//         localStorage.setItem('todos', JSON.stringify(todos));
//         return todos;
//     }
// },
// getTodos: function() {
//     var stringTodos = localStorage.getItem('todos');
//     var todos = [];
//
//     try {
//         todos = JSON.parse(stringTodos);
//     } catch(error) {
//
//     }
//
//     return $.isArray(todos) ? todos : [];
//
// },
