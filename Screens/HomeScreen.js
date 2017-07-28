import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
    Image,
    StyleSheet,
    TouchableHighlight,
    Text,
} from 'react-native';

import styles from '../styles';
import { VBox, HBox } from '../Components/Box';
import { load } from '../Reducers/home';


const homeStyles = StyleSheet.create({
    tile: {
        backgroundColor: 'white',
        margin: 20,
        padding: 10,
    },

    image: {
        width: 200,
        height: 200,
        marginTop: 10,
        backgroundColor: 'lightgray',
    },
});


@connect((state) => ({
    store: state.home.toJS(),
}))
export default class HomeScreen extends React.Component {
    static navigationOptions = {
        title: 'Characters',
    };

    static propTypes = {
        dispatch: PropTypes.func,
        navigation: PropTypes.object,
        store: PropTypes.object,
    };

    componentDidMount() {
        this.props.dispatch(load());
    }

    onCharacterPress(id) {
        const { navigate } = this.props.navigation;

        navigate('Character', {
            id,
        });
    }

    render() {
        const characters = this.props.store.characters;

        return (
            <VBox style={styles.container}>
                <HBox>
                    {characters.map((char) => (
                        <TouchableHighlight
                            key={char.id}
                            onPress={() => this.onCharacterPress(char.id)}
                        >
                            <VBox style={homeStyles.tile}>
                                <Text style={styles.sectionHeading}>{char.name}</Text>
                                <Image style={homeStyles.image}/>
                            </VBox>
                        </TouchableHighlight>
                    ))}
                </HBox>
            </VBox>
        );
    }
}
