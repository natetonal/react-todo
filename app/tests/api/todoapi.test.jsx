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

    describe('filterTodos', () => {
        var todos = [
            {
                id: 1,
                text: 'Some text here',
                completed: true
            },
            {
                id: 2,
                text: 'Other text here',
                completed: false
            },
            {
                id: 3,
                text: 'More text here',
                completed: true
            }
        ];

        it('should return all items if showCompleted is true', () => {
            var filteredTodos = TodoAPI.filterTodos(todos, true, '');
            expect(filteredTodos.length).toBe(3);
        });

        it('should return all incomplete items if showCompleted is false', () => {
            var filteredTodos = TodoAPI.filterTodos(todos, false, '');
            expect(filteredTodos.length).toBe(1);
        });

        it('should sort by completed status', () => {
            var filteredTodos = TodoAPI.filterTodos(todos, true, '');
            expect(filteredTodos[0].completed).toBe(false);
        });

        it('should filter todos by searchText', () => {
            var filteredTodos = TodoAPI.filterTodos(todos, true, 'some');
            expect(filteredTodos.length).toBe(1);
        });

        it('should return all todos if searchText is empty', () => {
            var filteredTodos = TodoAPI.filterTodos(todos, true, '');
            expect(filteredTodos.length).toBe(3);
        });
    });
});


// Tests with the API calls to localStorage
// describe('setTodos', () => {
//     it('should set valid todos array', () => {
//         var todos = [
//             {
//                 id: 23,
//                 text: 'Test all files',
//                 completed: false
//             }
//         ];
//
//         TodoAPI.setTodos(todos);
//
//         var actualTodos = JSON.parse(localStorage.getItem('todos'));
//
//         // toBe checks if two things are the same objects in memory, whereas
//         // toEqual checks if two values (even arrays and objects) are equal in value.
//         expect(actualTodos).toEqual(todos);
//     });
//
//     it('should not set invalid todos array', () => {
//         var badTodos = {a: 'b'};
//
//         TodoAPI.setTodos(badTodos);
//
//         expect(localStorage.getItem('todos')).toBe(null);
//     });
// });
//
// describe('getTodos', () => {
//     it('should return an empty array for bad localStorage data', () => {
//         var actualTodos = TodoAPI.getTodos();
//         expect(actualTodos).toEqual([]);
//
//     });
//
//     it('should return todos if valid array in localStorage', () =>{
//         var todos = [
//             {
//                 id: 23,
//                 text: 'Test all files',
//                 completed: false
//             }
//         ];
//
//         localStorage.setItem('todos', JSON.stringify(todos));
//
//         var actualTodos = TodoAPI.getTodos();
//
//         expect(actualTodos).toEqual(todos);
//
//     });
//
// });
