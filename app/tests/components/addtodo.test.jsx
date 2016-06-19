var React = require('react');
var ReactDOM = require('react-dom');
var expect = require('expect');
var TestUtils = require('react-addons-test-utils');
var $ = require('jQuery');

var AddTodo = require('AddTodo');

describe('AddTodo', () => {
    it('should exist', () => {
        expect(AddTodo).toExist();
    });

    it('should call onSubmitTodo if text is entered', () => {
        var spy = expect.createSpy();
        // After creating a spy, it can be injected into an instance of your component like so:
        var addTodo = TestUtils.renderIntoDocument(<AddTodo onSubmitTodo={spy}/>);
        var $el = $(ReactDOM.findDOMNode(addTodo));
        var todoText = 'abcde';

        addTodo.refs.todoText.value = todoText;
        // TestUtils also has an object called "Simulate" that can run simulations. Submit, for example:
        TestUtils.Simulate.submit($el.find('form')[0]);

        expect(spy).toHaveBeenCalledWith(todoText);
    });

    it('should call onSubmitTodo with null if no text is entered', () => {
        var spy = expect.createSpy();
        // After creating a spy, it can be injected into an instance of your component like so:
        var addTodo = TestUtils.renderIntoDocument(<AddTodo onSubmitTodo={spy}/>);
        var $el = $(ReactDOM.findDOMNode(addTodo));
        var todoText = '';

        addTodo.refs.todoText.value = todoText;
        // TestUtils also has an object called "Simulate" that can run simulations. Submit, for example:
        TestUtils.Simulate.submit($el.find('form')[0]);

        expect(spy).toHaveBeenCalledWith(null);
    });
});
