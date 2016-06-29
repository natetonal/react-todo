var React = require('react');
var ReactDOM = require('react-dom');
var expect = require('expect');
var TestUtils = require('react-addons-test-utils');
var $ = require('jquery');

import * as actions from 'actions';

var {AddTodo} = require('AddTodo');

describe('AddTodo', () => {
    it('should exist', () => {
        expect(AddTodo).toExist();
    });

    it('should dispatch addTodo when valid todoText', () => {
        var todoText = 'abcde';
        var action = actions.startAddTodo(todoText);

        var spy = expect.createSpy();
        // After creating a spy, it can be injected into an instance of your component like so:
        var addTodo = TestUtils.renderIntoDocument(<AddTodo dispatch={spy}/>);
        var $el = $(ReactDOM.findDOMNode(addTodo));

        addTodo.refs.todoText.value = todoText;
        // TestUtils also has an object called "Simulate" that can run simulations. Submit, for example:
        TestUtils.Simulate.submit($el.find('form')[0]);

        expect(spy).toHaveBeenCalledWith(action);
    });

    it('should not dispatch addTodo when invalid todoText', () => {
        var spy = expect.createSpy();
        // After creating a spy, it can be injected into an instance of your component like so:
        var addTodo = TestUtils.renderIntoDocument(<AddTodo dispatch={spy}/>);
        var $el = $(ReactDOM.findDOMNode(addTodo));
        var todoText = '';

        addTodo.refs.todoText.value = todoText;
        // TestUtils also has an object called "Simulate" that can run simulations. Submit, for example:
        TestUtils.Simulate.submit($el.find('form')[0]);

        expect(spy).toNotHaveBeenCalled();
    });
});
