import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Image, TouchableHighlight } from 'react-native';

import { VBox, HBox } from '../Components/Box';
import {
    Card,
} from 'react-native-elements';


@connect((state) => ({
}))
export default class HomeScreen extends React.Component {
    static navigationOptions = {
        title: 'Characters',
    };

    static propTypes = {
        navigation: PropTypes.object,
    };

    onCharacterPress(id) {
        const { navigate } = this.props.navigation;

        navigate('Character',{
            id,
        });
    }

    render() {
        const characters = [{
            name: 'Maddy Tillinghast',
            id: 1,
        }];

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
