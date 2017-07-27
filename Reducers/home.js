import { fromJS } from 'immutable';

const initial = fromJS({
    characters: [],
});


// Actions
export const LOAD = 'home/LOAD';
export const load = () => ({
    type: LOAD,
});


export const LOAD_DONE = 'home/LOAD_DONE';
export const loadDone = (data) => ({
    type: LOAD_DONE,
    data,
});


// Reducer
export default (state = initial, action) => {
    switch (action.type) {
        case LOAD_DONE:
            return state
                .set('characters', fromJS(action.data));

        default:
            return state;
    }
};
