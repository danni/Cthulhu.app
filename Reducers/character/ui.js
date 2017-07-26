// UI-state Reducer
//
// For data, see the Reducers/character.

import { fromJS } from 'immutable';

const initial = fromJS({
    openBar: null,
});


// Actions
export const BAR_SET_OPEN = 'character/ui/BAR_SET_OPEN';
export const barSetOpen = (bar) => ({
    type: BAR_SET_OPEN,
    bar,
});


// Reducer
export default (state = initial, action) => {
    switch (action.type) {
        case BAR_SET_OPEN:
            return state
                .set('openBar', action.bar);

        default:
            return state;
    }
};
