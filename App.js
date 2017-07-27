import React from 'react';
import PropTypes from 'prop-types';
import { combineReducers, createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga'
import { Provider, connect } from 'react-redux';
import { addNavigationHelpers } from 'react-navigation';

import AppNavigator from './routes';
import sagas from './Sagas';


// All reducers in the store
const AppReducer = combineReducers({
    nav: require('./Reducers/nav').default,
    home: require('./Reducers/home').default,
    character: require('./Reducers/character').default,
    character_ui: require('./Reducers/character/ui').default,
});
const sagaMiddleware = createSagaMiddleware();
const store = createStore(AppReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(sagas)


// A component containing the navigation stack that will be connected to a
// Redux container.
@connect((state) => ({
    nav: state.nav,
    character: state.character,
}))
class App extends React.Component {
    static propTypes = {
        character: PropTypes.object,
        dispatch: PropTypes.func,
        nav: PropTypes.object,
    };

    render() {
        return (
            <AppNavigator
                navigation={addNavigationHelpers({
                    character: this.props.character.toJS(),
                    dispatch: this.props.dispatch,
                    state: this.props.nav,
                })}
            />
        );
    }
}


// Redux provider, and navigation container, everything needed to make
// the app run.
export default class Root extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <App />
            </Provider>
        );
    }
}
