var React = require('react');
// Connect allows children to specify what data from the store they need.
var {connect} = require('react-redux');
import Todo from 'Todo';
var TodoAPI = require('TodoAPI');

export var TodoList = React.createClass({
    render: function(){

        var {todos, showCompleted, searchText} = this.props;

        var renderTodos = () => {
            if(todos.length === 0){
                return(
                    <p className="container__message">Nothing to do!</p>
                );
            }

            return TodoAPI.filterTodos(todos, showCompleted, searchText).map((todo) => {
                // You can use the spread (...) operator to send all properties of todo as this.props:
                return (<Todo key={todo.id} {...todo} />);
            })
        };

        return(
            <div>
                {renderTodos()}
            </div>
        );
    }
});

// This connects store to TodoList component.
export default connect(
    (state) => {
        return state;
    }
)(TodoList);
