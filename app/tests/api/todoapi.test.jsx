var expect = require('expect');

var TodoAPI = require('TodoAPI');

describe('TodoAPI', () => {
    // Mocha method that gets called before each test:
    beforeEach(() => {
        localStorage.removeItem('todos');
    });

    it('should exist', () => {
        expect(TodoAPI).toExist();
    });

    describe('setTodos', () => {
        it('should set valid todos array', () => {
            var todos = [
                {
                    id: 23,
                    text: 'Test all files',
                    completed: false
                }
            ];

            TodoAPI.setTodos(todos);

            var actualTodos = JSON.parse(localStorage.getItem('todos'));

            // toBe checks if two things are the same objects in memory, whereas
            // toEqual checks if two values (even arrays and objects) are equal in value.
            expect(actualTodos).toEqual(todos);
        });

        it('should not set invalid todos array', () => {
            var badTodos = {a: 'b'};

            TodoAPI.setTodos(badTodos);

            expect(localStorage.getItem('todos')).toBe(null);
        });
    });

    describe('getTodos', () => {
        it('should return an empty array for bad localStorage data', () => {
            var actualTodos = TodoAPI.getTodos();
            expect(actualTodos).toEqual([]);

        });

        it('should return todos if valid array in localStorage', () =>{
            var todos = [
                {
                    id: 23,
                    text: 'Test all files',
                    completed: false
                }
            ];

            localStorage.setItem('todos', JSON.stringify(todos));

            var actualTodos = TodoAPI.getTodos();

            expect(actualTodos).toEqual(todos);

        });

    });
});
