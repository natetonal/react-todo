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
            var res = reducers.searchTextReducer(df(''), df(action));
            expect(res).toEqual(action.searchText);

        });

        it('should flip showCompleted', () => {
            var action = {
                type: 'TOGGLE_SHOW_COMPLETED'
            };
            var state = false;
            var res = reducers.showCompletedReducer(df(state), df(action));
            expect(res).toEqual(!state);
        });
    });
});
