import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { orderBy } from 'lodash';
import {
    FlatList,
    Text,
} from 'react-native';

import styles from '../styles';

import {
    loadCharacter,
    setValue,
    ATTRIBUTES,
    STATS,
} from '../Reducers/character';

import { HBox, VBox } from '../Components/Box';
import { EditableListItem } from '../Components/ListItem';
import { EditableStat } from '../Components/Stat';


@connect((state) => ({
    character: state.character.toJS(),
}))
export default class EditCharacterScreen extends React.Component {
    static navigationOptions = {
        title: 'Edit Character',
    };

    static propTypes = {
        character: PropTypes.object,
        dispatch: PropTypes.func,
        navigation: PropTypes.object,
    };

    componentDidMount() {
        const id = this.props.navigation.state.params.id;
        this.props.dispatch(loadCharacter(id));
    }

    onValueChanged(key, value) {
        this.props.dispatch(setValue(key, value));
    }

    render() {
        const char = this.props.character;
        const skills = orderBy(Object.entries(char.skills)
            .map(([key, skill]) => ({ key, ...skill })), 'name');
        // Include character name in the list of editable attributes
        const attributes = [{
            key: 'name',
            name: 'Character Name',
        }].concat(ATTRIBUTES);

        return (
            <HBox style={styles.container}>
                <VBox style={styles.column}>
                    <Text style={styles.sectionHeading}>Attributes</Text>
                    {attributes.map((attr) => (
                        <EditableListItem
                            key={attr.key}
                            label={attr.name}
                            initial={char[attr.key].toString()}
                            onChange={(value) => this.onValueChanged([attr.key], value)}
                            autoCapitalize='words'
                        />
                    ))}
                </VBox>
                <VBox style={styles.column}>
                    <Text style={styles.sectionHeading}>Characteristics</Text>
                    {STATS.map((stat) => (
                        <EditableStat
                            key={stat.key}
                            label={stat.name}
                            initial={char.stats[stat.key]}
                            onChange={(value) => this.onValueChanged(['stats', stat.key], value)}
                        />
                    ))}
                </VBox>
                <VBox style={styles.column}>
                    <Text style={styles.sectionHeading}>Skills</Text>
                    <FlatList
                        data={skills}
                        renderItem={({item}) => (
                            <EditableStat
                                label={item.name}
                                specialization={item.specialization}
                                initial={item.current}
                                onChange={(value) => this.onValueChanged(['skills', item.key, 'current'], value)}
                            />
                        )}
                    />
                </VBox>
            </HBox>
        );
    }
}
