var React = require('react');
var Todo = require('Todo');

var TodoList = React.createClass({
    render: function(){

        var {todos} = this.props;

        var renderTodos = () => {
            return todos.map((todo) => {
                // You can use the spread (...) operator to send all properties of todo as this.props:
                return (<Todo key={todo.id} {...todo} onToggle={this.props.onToggle} />);
            })
        };

        return(
            <div>
                {renderTodos()}
            </div>
        );
    }
});

module.exports = TodoList;
