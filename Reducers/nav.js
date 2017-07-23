import AppNavigator from '../routes';

const initial = AppNavigator.router.getStateForAction(
    AppNavigator.router.getActionForPathAndParams('Character')
);

export default (state = initial, action) => {
    const nextState = AppNavigator.router.getStateForAction(action, state);

    return nextState || state;
};
