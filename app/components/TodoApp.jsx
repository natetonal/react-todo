var React = require('react');
var uuid = require('node-uuid');
var moment = require('moment');

var TodoList = require('TodoList');
var TodoSearch = require('TodoSearch');
var TodoAPI = require('TodoAPI');
var AddTodo= require('AddTodo');


var TodoApp = React.createClass({

    getInitialState: function(){
        return {
            showCompleted: false,
            searchText: '',
            todos: TodoAPI.getTodos()
        };
    },

    componentDidUpdate: function(){
        TodoAPI.setTodos(this.state.todos);
    },

    handleAddTodo: function(text){
        if(text){
            this.setState({
                todos: [
                    ...this.state.todos,
                    {
                        id: uuid(),
                        text: text,
                        completed: false,
                        createdAt: moment().unix(),
                        completedAt: undefined
                    }
                ]
            });
        } else {
            alert('Hey, man. Like, enter some text.');
        }
    },

    handleToggle: function(id){
        var updatedTodos = this.state.todos.map((todo) => {
            if(todo.id === id){
                todo.completed = !todo.completed;
                todo.completedAt = todo.completed ? moment().unix() : undefined;
            }
            return todo;
        });

        this.setState({ todos: updatedTodos });
    },

    handleSearch: function(showCompleted, searchText){
        this.setState({
            showCompleted: showCompleted,
            searchText: searchText.toLowerCase()
        });
    },

    render: function(){

        var {todos, showCompleted, searchText} = this.state;

        var filteredTodos = TodoAPI.filterTodos(todos, showCompleted, searchText);

        return(
            <div>
                <h1 className="page-title">Todo App</h1>
                <div className="row">
                    <div className="column small-11 medium-6 large-5 small-centered">
                        <div className="container">
                            <TodoSearch onSearch={this.handleSearch} />
                            <TodoList todos={filteredTodos} onToggle={this.handleToggle} />
                            <AddTodo onSubmitTodo={this.handleAddTodo} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = TodoApp;
