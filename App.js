import React from 'react';
import PropTypes from 'prop-types';
import { combineReducers, createStore } from 'redux';
import { Provider, connect } from 'react-redux';
import { addNavigationHelpers } from 'react-navigation';

import AppNavigator from './routes';


// All reducers in the store
const AppReducer = combineReducers({
    nav: require('./Reducers/nav').default,
    character: require('./Reducers/character').default,
});
const store = createStore(AppReducer);


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
