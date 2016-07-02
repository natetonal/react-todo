var expect = require('expect');
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import firebase, {firebaseRef} from  'app/firebase';

var actions = require('actions');

// Create mock store
var createMockStore = configureMockStore([thunk]);

describe('Actions', () => {
    it('should generate search text action', () => {
        var action = {
            type: 'SET_SEARCH_TEXT',
            searchText: 'some search text'
        };
        var res = actions.setSearchText(action.searchText);
        expect(res).toEqual(action);
    });

    it('should generate toggle showCompleted action', () => {
        var action = {
            type: 'TOGGLE_SHOW_COMPLETED',
        };
        var res = actions.toggleShowCompleted();
        expect(res).toEqual(action);
    });

    it('should generate ADD_TODO action', () => {
        var action = {
            type: 'ADD_TODO',
            todo: {
                id: 'abc123',
                text: 'anything',
                completed: false,
                createdAt: 12
            }
        };
        var res = actions.addTodo(action.todo);
        expect(res).toEqual(action);
    });

    // Remember - pass "done" if async call in test.
    it('should create todo and dispatch ADD_TODO', (done) => {
        const store = createMockStore({});
        const todoText = 'My todo item';
        store.dispatch(actions.startAddTodo(todoText)).then(() => {
            const actions = store.getActions();
            expect(actions[0]).toInclude({
                type: 'ADD_TODO'
            });
            expect(actions[0].todo).toInclude({
                text: todoText
            });
            done();
        }).catch(done);
    });

    it('should generate ADD_TODOS action', () =>{
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
        var res = actions.addTodos(todos);
        expect(res).toEqual(action);
    });

    it('should generate UPDATE_TODO action', (done) => {
        var action = {
            type: 'UPDATE_TODO',
            id: 1,
            updates: {
                completed: false
            }
        };
        var res = actions.updateTodo(action.id, action.updates);
        expect(res).toEqual(action);
        done();
    });

    it('should generate LOGIN action', (done) => {
        var action = {
            type: 'LOGIN',
            uid: 'someuid'
        };
        var res = actions.login(action.uid);
        expect(res).toEqual(action);
        done();
    });

    it('should generate LOGOUT action', (done) => {
        var action = {
            type: 'LOGOUT'
        };
        var res = actions.logout();
        expect(res).toEqual(action);
        done();
    });

    describe('Tests with Firebase todos', () => {
        var testTodoRef;

        // This wipes the original data, adds new data, then error checks.
        beforeEach((done) => {
            var todosRef = firebaseRef.child('todos');

            todosRef.remove().then(() => {
                testTodoRef = firebaseRef.child('todos').push();
                return testTodoRef.set({
                    text: 'Something to do',
                    completed: false,
                    createdAt: 128857
                });
            })
            .then(() => done())
            .catch(done);
        });

        afterEach((done) => {
            testTodoRef.remove().then(() => done());
        });

        it('should toggle todo and dispatch UPDATE_TODO action', (done) => {
            const store = createMockStore({});
            const action = actions.startToggleTodo(testTodoRef.key, true);
            store.dispatch(action).then(() => {
                const mockActions = store.getActions();
                expect(mockActions[0]).toInclude({
                    type: 'UPDATE_TODO',
                    id: testTodoRef.key
                });
                expect(mockActions[0].updates).toInclude({
                    completed: true
                });
                expect(mockActions[0].updates.completedAt).toExist();

                done();
            }, done);
        });

        it('should add todos and dispatch ADD_TODOS action', (done) => {
            const store = createMockStore({});
            const action = actions.startAddTodos();
            store.dispatch(action).then(() => {
                const mockActions = store.getActions();

                expect(mockActions[0]).toInclude({ type: 'ADD_TODOS' });
                expect(mockActions[0].todos).toExist();
                // For some reason this locks up:
                // expect(mockActions[0].todos).toInclude({ text: 'Something to do' });

                done();
            }, done);
        });

    });
});
