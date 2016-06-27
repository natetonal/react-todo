var React = require('react');
var {connect} = require('react-redux');
var moment = require('moment');
var actions = require('actions');

// With Redux in place, this React class can be kept around for testing.
export var Todo = React.createClass({
    render: function(){

        var {text, id, completed, createdAt, completedAt, dispatch} = this.props;
        var todoClassName = completed ? 'todo todo-completed' : 'todo';

        var renderDate = () => {
            var message = 'Created';
            var timestamp = createdAt;

            if(completed){
                message = 'Completed';
                timestamp = completedAt;
            }

            return `${message} ${moment.unix(timestamp).format('MMM. Do, YYYY @ h:mm a')}`;
        };

        // You can write arrow functions directly into the render function.
        return(
            <div className={todoClassName} onClick={() => {
                // this.props.onToggle(id);
                dispatch(actions.toggleTodo(id));
            }}>
                <div>
                    <input type="checkbox" checked={completed} />
                </div>
                <div>
                    <p>{text}</p>
                    <p className="todo__subtext">{renderDate()}</p>
                </div>
            </div>
        );
    }
});

// This will make sure that any time this module is required, the connected Todo module is the one returned.
export default connect()(Todo);
