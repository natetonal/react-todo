var React = require('react');
var uuid = require('node-uuid');
var moment = require('moment');

import TodoList from 'TodoList';
import AddTodo from 'AddTodo';
var TodoSearch = require('TodoSearch');
var TodoAPI = require('TodoAPI');

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
                            <TodoList />
                            <AddTodo onSubmitTodo={this.handleAddTodo} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = TodoApp;
