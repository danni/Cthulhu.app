import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
    Image,
    StyleSheet,
    TouchableOpacity,
    Text,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import uuid from 'uuid/v1';

import styles from '../styles';

import { load } from '../Reducers/home';
import { newCharacter, loadCharacter } from '../Reducers/character';

import { VBox, HBox } from '../Components/Box';


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

    newButton: {
        padding: 10,
    },
});


@connect((state) => ({
    store: state.home.toJS(),
}))
export default class HomeScreen extends React.Component {

    static navigationOptions = ({ navigation }) => ({
        title: 'Characters',
        headerRight: (
            <TouchableOpacity
                style={homeStyles.newButton}
                onPress={() => {
                    const id = uuid();
                    navigation.dispatch(newCharacter(id));
                    navigation.navigate('Character', { id, });
                    navigation.navigate('EditCharacter', { id, });
                }}
            >
                <Icon
                    name="ios-add"
                    color="#037aff"
                    size={30}
                />
            </TouchableOpacity>
        ),
    });

    static propTypes = {
        dispatch: PropTypes.func,
        navigation: PropTypes.object,
        store: PropTypes.object,
    };

    componentDidMount() {
        // FIXME: need to call this when we return back to this page
        this.props.dispatch(load());
    }

    onCharacterPress(id) {
        const { navigate } = this.props.navigation;

        this.props.dispatch(loadCharacter(id));

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
                        <TouchableOpacity
                            key={char.id}
                            onPress={() => this.onCharacterPress(char.id)}
                        >
                            <VBox style={homeStyles.tile}>
                                <Text style={styles.sectionHeading}>{char.name}</Text>
                                <Image style={homeStyles.image}/>
                            </VBox>
                        </TouchableOpacity>
                    ))}
                </HBox>
            </VBox>
        );
    }
}
