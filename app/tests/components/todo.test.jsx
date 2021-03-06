var React = require('react');
var ReactDOM = require('react-dom');
var expect = require('expect');
var TestUtils = require('react-addons-test-utils');
var $ = require('jquery');


// Use ES6 destructuring to grab the raw React component rather than the connected one.
import {Todo} from 'Todo';
import * as actions from 'actions';


describe('Todo', () => {
    it('should exist', () => {
        expect(Todo).toExist();
    });

    it('should dispatch toggleTodo action onClick', () => {
        var todoData = {
            id: 199,
            text: 'Write todo.test.jsx test',
            completed: true
        };

        var action = actions.startToggleTodo(todoData.id, !todoData.completed);

        var spy = expect.createSpy();
        var todo = TestUtils.renderIntoDocument(<Todo {...todoData} dispatch={spy} />);
        var $el = $(ReactDOM.findDOMNode(todo));
        TestUtils.Simulate.click($el.find('input')[0]);
        expect(spy).toHaveBeenCalledWith(action);
    });
});
