import React from 'react';
import PropTypes from 'prop-types';
import { combineReducers, createStore } from 'redux';
import { Provider, connect } from 'react-redux';
import { addNavigationHelpers } from 'react-navigation';

import AppNavigator from './routes';


// All reducers in the store
const AppReducer = combineReducers({
    nav: require('./Reducers/nav').default,
});
const store = createStore(AppReducer);


// A component containing the navigation stack that will be connected to a
// Redux container.
class App extends React.Component {
    static mapStateToProps = (state) => ({
        nav: state.nav,
    });

    static propTypes = {
        dispatch: PropTypes.func,
        nav: PropTypes.object,
    };

    render() {
        return (
            <AppNavigator
                navigation={addNavigationHelpers({
                    dispatch: this.props.dispatch,
                    state: this.props.nav,
                })}
            />
        );
    }
}

const AppContainer = connect(App.mapStateToProps)(App);


// Redux provider, and navigation container, everything needed to make
// the app run.
export default class Root extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <AppContainer />
            </Provider>
        );
    }
}
