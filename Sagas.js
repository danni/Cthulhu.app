import {
    all,
    call,
    select,
    take,
} from 'redux-saga/effects';
import { AsyncStorage } from 'react-native';


function* watchLoad() {
    while (true) {
        const action = yield take('*');
        console.log("LOADING", action);
    }
}


function* watchCharacterChanges() {
    while (true) {
        // Listen for all character changes, and serialize them back to the
        // AsyncStorage
        const action = yield take('*');

        if (!action.type.startsWith('character/')) {
            continue;
        }

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
