import { all, call, put, select, take, takeLatest } from 'redux-saga/effects';
import { AsyncStorage } from 'react-native';

import {
    LOAD,
    loadDone,
} from './Reducers/home';
import {
    LOAD_CHARACTER,
    SET_VALUE,
    TOGGLE_SKILL_USED,
    loadCharacterDone,
} from './Reducers/character';


function* watchLoad() {
    yield takeLatest([LOAD, LOAD_CHARACTER], function* (action) {
        switch (action.type) {
            case LOAD: {
                const keys = (yield call(AsyncStorage.getAllKeys))
                    .filter((key) => key.startsWith('@character:'))
                const data = [];

                // Request all the keys
                // FIXME: multiGet is broken
                for (let key of keys) {
                    data.push(JSON.parse(yield call(AsyncStorage.getItem, key)));
                }

                yield put(loadDone(data));
                break;
            }

            case LOAD_CHARACTER: {
                const data = yield call(AsyncStorage.getItem,
                    `@character:${action.id}`)
                yield put(loadCharacterDone(JSON.parse(data)));
                break;
            }

            default:
                console.error('Unexpected!');
                break;
        }
    });
}


function* watchCharacterChanges() {
    while (true) {
        // Listen for all character changes, and serialize them back to the
        // AsyncStorage
        yield take([
            SET_VALUE,
            TOGGLE_SKILL_USED,
        ]);
        const state = yield select();
        const char = state.character.toJS();

        // Store the character sheet to JSON
        yield call(AsyncStorage.setItem,
            `@character:${char.id}`,
            JSON.stringify(char));
    }
}


export default function* rootSaga() {
    yield all([
        watchLoad(),
        watchCharacterChanges(),
    ]);
}
