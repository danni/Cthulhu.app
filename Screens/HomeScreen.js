import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Image, TouchableHighlight } from 'react-native';
import { Card } from 'react-native-elements';

import { VBox, HBox } from '../Components/Box';
import { load } from '../Reducers/home';


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
            <VBox>
                <HBox>
                    {characters.map((char) => (
                        <Card
                            title={char.name}
                            key={char.id}
                        >
                            <TouchableHighlight
                                onPress={() => this.onCharacterPress(char.id)}
                            >
                                <Image style={{ width: 200, height: 200 }}/>
                            </TouchableHighlight>
                        </Card>
                    ))}
                </HBox>
            </VBox>
        );
    }
}
