var expect = require('expect');
// Deep Freeze tests to make sure that pure functions remain pure (perfect for testing reducers)
var df = require('deep-freeze-strict');

var reducers = require('reducers');

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
                text: 'Walk the dog'
            };
            var res = reducers.todosReducer(df([]), df(action));
            expect(res.length).toEqual(1);
            expect(res[0].text).toEqual(action.text);
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

        it('toggle todo', () => {
            var todos = [
                {
                    id: 1,
                    text: 'Walk the dog',
                    completed: false,
                    createdAt: 123,
                    completedAt: undefined
                }
            ];
            var action = {
                type: 'TOGGLE_TODO',
                id: 1
            };
            var res = reducers.todosReducer(df(todos), df(action));
            expect(res[0].completed).toEqual(!todos.completed);
            expect(res[0].completedAt).toExist();
        });
        // define todos array with realistic todo item
        // generate action (id that matches id in todo item)
        // Call reducer and assert completed flipped
    });
});
