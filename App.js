import React from 'react';
import { StackNavigator } from 'react-navigation';


const App = StackNavigator({
    Character: { screen: require('./Screens/CharacterScreen').default },
});

export default App;
