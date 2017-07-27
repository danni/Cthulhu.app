// Data-reducer
//
// For UI-state, see Reducers/character/ui

import { fromJS } from 'immutable';

const initial = fromJS({
    id: 1,  // Used for storing the character

    name: 'Maddy Tillinghast',
    occupation: 'Dilettante',
    age: 32,
    sex: 'Female',
    birthplace: 'Salem, MA',
    residence: 'Arkham, MA',

    hp: {
        current: 9,  // Current hit points
        today: 9,  // Hit points at the start of the day
        // Max is calculated
    },
    san: {
        current: 80,  // Current sanity
        today: 80,  // Sanity at the start of the day
        // Max is calculated
    },
    luck: {
        current: 65,
        max: 99,
    },
    mp: {
        current: 16,
        // Max is calculated
    },

    stats: {
        str: 45,
        con: 40,
        siz: 50,
        dex: 55,
        app: 60,
        edu: 60,
        int: 70,
        pow: 80,
    },

    skills: {
        accounting: {
            name: 'Accounting',
            current: 5,
            used: false,
        },

        anthropology: {
            name: 'Anthropology',
            current: 1,
            used: false,
        },

        mythos: {
            name: 'Cthulhu Mythos',
            current: 2,
            used: false,
        },
    }
});


// Actions
export const TOGGLE_SKILL_USED = 'character/TOGGLE_SKILL_USED';
export const toggleSkillUsed = (skill) => ({
    type: TOGGLE_SKILL_USED,
    skill,
});

export const BAR_CHANGED = 'character/BAR_CHANGED';
export const barChanged = (bar, value) => ({
    type: BAR_CHANGED,
    bar,
    value,
});

export const LOAD_CHARACTER = 'character/LOAD_CHARACTER';
export const loadCharacter = (id) => ({
    type: LOAD_CHARACTER,
    id,
});

export const LOAD_CHARACTER_DONE = 'character/LOAD_CHARACTER_DONE';
export const loadCharacterDone = (data) => ({
    type: LOAD_CHARACTER_DONE,
    data,
});

 
export const ATTRIBUTES = [{
    key: 'occupation',
    name: 'Occupation',
}, {
    key: 'age',
    name: 'Age',
}, {
    key: 'sex',
    name: 'Sex',
}, {
    key: 'birthplace',
    name: 'Birthplace',
}, {
    key: 'residence',
    name: 'Residence',
}];

export const BARS = [{
    key: 'hp',
    name: 'Hit Points',
    color: 'darkred',
}, {
    key: 'san',
    name: 'Sanity',
    color: 'purple',
}, {
    key: 'luck',
    name: 'Luck',
    color: 'blue',
}, {
    key: 'mp',
    name: 'Magic Points',
    color: 'green',
}];

export const STATS = [{
    key: 'str',
    name: 'Strength',
}, {
    key: 'con',
    name: 'Constitution',
}, {
    key: 'siz',
    name: 'Size',
}, {
    key: 'dex',
    name: 'Dexterity',
}, {
    key: 'app',
    name: 'Appearance',
}, {
    key: 'edu',
    name: 'Education',
}, {
    key: 'pow',
    name: 'Power',
}];


// Reducer
export default (state = initial, action) => {
    switch (action.type) {
        case TOGGLE_SKILL_USED:
            state = state
                .setIn(['skills', action.skill, 'used'],
                    !state.getIn(['skills', action.skill, 'used']))
            break;

        case BAR_CHANGED:
            state = state
                .setIn([action.bar, 'current'], action.value);
            break;

        case LOAD_CHARACTER_DONE:
            state = state
                .mergeDeep(action.data);
            break;

        default:
            break;
    }

    // Derive calculated values
    return state
        // Max HP is (CON + SIZ) / 10. pg 49.
        .setIn(['hp', 'max'], (state.getIn(['stats', 'con']) + state.getIn(['stats', 'siz'])) / 10)
        // Max SAN is 99 - Cthulhu Mythos
        .setIn(['san', 'max'], 99 - state.getIn(['skills', 'mythos', 'current']))
        // POW / 5. pg 64
        .setIn(['mp', 'max'], state.getIn(['stats', 'pow']) / 5);
};
