import AppNavigator from '../routes';

const initial = AppNavigator.router.getStateForAction(
    AppNavigator.router.getActionForPathAndParams('Home')
);

export default (state = initial, action) => {
    const nextState = AppNavigator.router.getStateForAction(action, state);

    return nextState || state;
};
