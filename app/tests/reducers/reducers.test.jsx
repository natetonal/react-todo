var expect = require('expect');
// Deep Freeze tests to make sure that pure functions remain pure (perfect for testing reducers)
var df = require('deep-freeze-strict');

import * as reducers from 'reducers';

describe('Reducers', () => {
    describe('searchTextReducer', () => {
        it('should set searchText', () => {
            // When testing, it's best not to include something else you're testing.
            var action = {
                type: 'SET_SEARCH_TEXT',
                searchText: 'dog'
            };
            var res = reducers.searchTextReducer('', df(action));
            expect(res).toEqual(action.searchText);

        });

        it('should flip showCompleted', () => {
            var action = {
                type: 'TOGGLE_SHOW_COMPLETED'
            };
            var res = reducers.showCompletedReducer(false, df(action));
            expect(res).toEqual(true);
        });
    });

    describe('todosReducer', () => {
        it('should add new todo', () => {
            var action = {
                type: 'ADD_TODO',
                todo: {
                    id: 'abc123',
                    text: 'a thing to do',
                    createdAt: 1236234,
                    completed: false
                }
            };
            var res = reducers.todosReducer(df([]), df(action));
            expect(res.length).toEqual(1);
            expect(res[0]).toEqual(action.todo);
        });

        it('should add existing todos', () => {
            var todos = [
                {
                    id: 111,
                    text: 'Anything',
                    completed: false,
                    completedAt: undefined,
                    createdAt: 33000
                }
            ];
            var action = {
                type: 'ADD_TODOS',
                todos
            };
            var res = reducers.todosReducer(df([]), df(action));
            expect(res.length).toEqual(1);
            expect(res[0]).toEqual(todos[0]);
        });

        it('should wipe todos from store on logout', () => {
            var todos = [
                {
                    id: 111,
                    text: 'Anything',
                    completed: false,
                    completedAt: undefined,
                    createdAt: 33000
                }
            ];
            var action = {
                type: 'ADD_TODOS',
                todos
            };

            var logout = {
                type: 'CLEAR_TODOS_ON_LOGOUT'
            };

            var addTodo = reducers.todosReducer(df([]), df(action));
            var res = reducers.todosReducer(df(addTodo), df(logout));

            expect(res).toEqual([]);

        });
        it('should toggle todo', () => {
            var todos = [
                {
                    id: 1,
                    text: 'Walk the dog',
                    completed: false,
                    createdAt: 123,
                    completedAt: undefined
                }
            ];
            var updates = {
                completed: false,
                completedAt: null
            };
            var action = {
                type: 'UPDATE_TODO',
                id: todos[0].id,
                updates
            };
            var res = reducers.todosReducer(df(todos), df(action));
            expect(res[0].completed).toEqual(updates.completed);
            expect(res[0].completedAt).toEqual(updates.completedAt);
            expect(res[0].text).toEqual(todos[0].text);
        });
        // define todos array with realistic todo item
        // generate action (id that matches id in todo item)
        // Call reducer and assert completed flipped
    });

    describe('authReducer', () => {
        it('should add uid to auth on LOGIN', () => {
            var action = {
                type: 'LOGIN',
                uid: 'someuid'
            };
            var res = reducers.authReducer(df({}), df(action));
            expect(res).toExist();
            expect(res.uid).toEqual('someuid');
        });

        it('should wipe auth on LOGOUT', () => {
            var auth = {
                uid: 'someuid'
            };
            var action = {
                type: 'LOGOUT'
            };
            var res = reducers.authReducer(df(auth), df(action));
            expect(res).toEqual({});
        });
    });
});
