var React = require('react');
var TodoList = require('TodoList');
var AddTodo= require('AddTodo');
var TodoSearch = require('TodoSearch');

var TodoApp = React.createClass({

    getInitialState: function(){
        return {
            showCompleted: false,
            searchText: '',
            todos: [
                {
                    id: 1,
                    text: 'Walk the dog'
                },
                {
                    id: 2,
                    text: 'Clean the yard'
                },
                {
                    id: 3,
                    text: 'Give baby a bath'
                },
                {
                    id: 4,
                    text: 'Go to work'
                }
            ]
        };
    },

    handleAddTodo: function(text){
        event.preventDefault();
        if(text){
            alert(`New todo: ${text}.`);
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

        var {todos} = this.state;

        return(
            <div className="row">
                <div className="column small-8 small-centered">
                    <TodoSearch onSearch={this.handleSearch} />
                    <TodoList todos={todos} />
                    <AddTodo onSubmitTodo={this.handleAddTodo} />
                </div>
            </div>
        );
    }
});

module.exports = TodoApp;
