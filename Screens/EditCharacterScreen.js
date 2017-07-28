import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { orderBy } from 'lodash';
import { FlatList } from 'react-native';
import { Card } from 'react-native-elements';

import {
    loadCharacter,
    setValue,
    ATTRIBUTES,
    BARS,
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
        const skills = orderBy(Object.entries(char.skills), '1.name');
        // Include character name in the list of editable attributes
        const attributes = [{
            key: 'name',
            name: 'Character Name',
        }].concat(ATTRIBUTES);

        return (
            <HBox>
                <VBox flex={2}>
                    <Card title="Attributes">
                        {attributes.map((attr) => (
                            <EditableListItem
                                key={attr.key}
                                title={attr.name}
                                initialValue={char[attr.key].toString()}
                                onChange={(value) => this.onValueChanged([attr.key], value)}
                            />
                        ))}
                    </Card>
                </VBox>
                <VBox flex={2}>
                    <Card title="Characteristics">
                        {STATS.map((stat) => (
                            <EditableStat
                                key={stat.key}
                                title={stat.name}
                                initialValue={char.stats[stat.key]}
                                onChange={(value) => this.onValueChanged(['stats', stat.key], value)}
                            />
                        ))}
                    </Card>
                </VBox>
                <VBox flex={2}>
                    <Card title="Skills">
                        <FlatList
                            data={skills}
                            renderItem={({item}) => (
                                <EditableStat
                                    key={item[0]}
                                    title={item[1].name}
                                    subtitle={item[1].specialization}
                                    initialValue={item[1].current}
                                    onChange={(value) => this.onValueChanged(['skills', item[0], 'current'], value)}
                                />
                            )}
                        />
                    </Card>
                </VBox>
            </HBox>
        );
    }
}
