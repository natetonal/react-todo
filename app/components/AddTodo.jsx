var React = require('react');
var {connect} = require('react-redux');
var actions = require('actions');

export var AddTodo = React.createClass({

    handleSubmit: function(event){
        event.preventDefault();
        var {dispatch} = this.props;
        var todoText = this.refs.todoText.value;
        if(todoText){
            dispatch(actions.startAddTodo(todoText));
            this.refs.todoText.value = '';
        }
        // Could write an error handler here.
    },

    render: function(){

        var {submitTodo} = this.props;

        return(
            <div className="container__footer">
                <form ref="todoForm" onSubmit={this.handleSubmit}>
                    <label>Add a Todo:
                        <input ref="todoText" type="text" placeholder="e.g. 'Learn to code'" />
                    </label>
                        <button className="button primary expanded hollow">Add it!</button>
                </form>
            </div>
        );
    }
});

export default connect()(AddTodo);
