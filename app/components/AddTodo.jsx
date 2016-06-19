var React = require('react');

var AddTodo = React.createClass({

    handleSubmit: function(event){
        event.preventDefault();

        var todoText = this.refs.todoText.value;
        if(todoText){
            this.props.onSubmitTodo(todoText);
            this.refs.todoText.value = '';
        } else {
            this.refs.todoText.focus();
            this.props.onSubmitTodo(null);
        }
    },

    render: function(){

        var {submitTodo} = this.props;

        return(
            <div className="comp-addTodo">
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

module.exports = AddTodo;
