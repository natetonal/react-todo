var React = require('react');

var Todo = React.createClass({
    render: function(){

        var {text, id, completed} = this.props;

        // You can write arrow functions directly into the render function.
        return(
            <div onClick={() => {
                this.props.onToggle(id);
            }}>
                <input type="checkbox" checked={completed} />
                {text}
            </div>
        );
    }
});

module.exports = Todo;
