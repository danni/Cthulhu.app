import { all, call, put, select, take } from 'redux-saga/effects';
import { AsyncStorage } from 'react-native';

import {
    BAR_CHANGED,
    LOAD_CHARACTER,
    TOGGLE_SKILL_USED,
    loadCharacterDone,
} from './Reducers/character';


function* watchLoad() {
    while (true) {
        const action = yield take(LOAD_CHARACTER);
        const data = yield call(AsyncStorage.getItem,
            `@character:${action.id}`)
        yield put(loadCharacterDone(JSON.parse(data)));
    }
}


function* watchCharacterChanges() {
    while (true) {
        // Listen for all character changes, and serialize them back to the
        // AsyncStorage
        yield take([
            BAR_CHANGED,
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
