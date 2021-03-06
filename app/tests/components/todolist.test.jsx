var React = require('react');
var ReactDOM = require('react-dom');
var {Provider} = require('react-redux');
var expect = require('expect');
var TestUtils = require('react-addons-test-utils');
var $ = require('jquery');

// var TodoList = require('TodoList');
// the import statement supports bringing in 'export default' module. This will eventually replace "require()"
import {configure} from 'configureStore';
import ConnectedTodoList, {TodoList} from 'TodoList';
import ConnectedTodo, {Todo} from 'Todo';

describe('TodoList', () => {
    it('should exist', () => {
        expect(TodoList).toExist();
    });

    it('should render one todo component for each todo item', () => {
        var todos = [
            {
                id: 1,
                text: 'Do something',
                completed: false,
                completedAt: undefined,
                createdAt: 500
            },
            {
                id: 2,
                text: 'Do something else',
                completed: false,
                completedAt: undefined,
                createdAt: 500
            }
        ];

        var store = configure({
            todos
        });
        var provider = TestUtils.renderIntoDocument(
            <Provider store={store}>
                <ConnectedTodoList />
            </Provider>
        )
        var todoList = TestUtils.scryRenderedComponentsWithType(provider, ConnectedTodoList)[0];
        // This lets us check how many of a component are rendered under another component:
        var todosComponents = TestUtils.scryRenderedComponentsWithType(todoList, ConnectedTodo);

        expect(todosComponents.length).toBe(todos.length);
    });

    it('should render empty message if no todos', () => {
        var todos = [];

        var todoList = TestUtils.renderIntoDocument(<TodoList todos={todos} />);

        var $el = $(ReactDOM.findDOMNode(todoList));

        expect($el.find('p').length).toBe(1);
    });
});
