import { StackNavigator } from 'react-navigation';


export default StackNavigator({
    Home: { screen: require('./Screens/HomeScreen').default, },
    Character: { screen: require('./Screens/CharacterScreen').default, },
});
