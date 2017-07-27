import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
    Card,
    Text,
    List,
    ListItem,
} from 'react-native-elements';

import {
    barChanged,
    loadCharacter,
    toggleSkillUsed,
} from '../Reducers/character';
import { barSetOpen } from '../Reducers/character/ui';

import { Stat, Bar } from '../Components/Stat';
import { HBox, VBox } from '../Components/Box';


@connect((state) => ({
    character: state.character.toJS(),
    ui: state.character_ui.toJS(),
}))
export default class CharacterScreen extends React.Component {
    static propTypes = {
        character: PropTypes.object,
        dispatch: PropTypes.func,
        navigation: PropTypes.object,
        ui: PropTypes.object,
    }

    static navigationOptions = (nav) => ({
        title: nav.navigation.character.name,
    });

    componentDidMount() {
        const id = this.props.navigation.state.params.id;
        this.props.dispatch(loadCharacter(id));
    }

    render() {
        const char = this.props.character;
        const skills = Object.entries(char.skills);
        const attributes = [{
            key: 'occupation',
            name: 'Occupation',
        }, {
            key: 'age',
            name: 'Age',
        }, {
            key: 'sex',
            name: 'Sex',
        }, {
            key: 'birthplace',
            name: 'Birthplace',
        }, {
            key: 'residence',
            name: 'Residence',
        }];

        const bars = [{
            key: 'hp',
            name: 'Hit Points',
            color: 'darkred',
        }, {
            key: 'san',
            name: 'Sanity',
            color: 'purple',
        }, {
            key: 'luck',
            name: 'Luck',
            color: 'blue',
        }, {
            key: 'mp',
            name: 'Magic Points',
            color: 'green',
        }];

        const stats = [{
            key: 'str',
            name: 'Strength',
        }, {
            key: 'con',
            name: 'Constitution',
        }, {
            key: 'siz',
            name: 'Size',
        }, {
            key: 'dex',
            name: 'Dexterity',
        }, {
            key: 'app',
            name: 'Appearance',
        }, {
            key: 'edu',
            name: 'Education',
        }, {
            key: 'pow',
            name: 'Power',
        }];

        return (
            <HBox>
                <VBox flex={2}>
                    <Card>
                        <Text h4>{char.name}</Text>

                        <List>
                            {bars.map((bar) => (
                                <Bar
                                    key={bar.key}
                                    name={bar.name}
                                    value={char[bar.key].current}
                                    max={char[bar.key].max}
                                    color={bar.color}
                                    open={this.props.ui.openBar === bar.key}
                                    setOpen={(value) => this.props.dispatch(barSetOpen(value ? bar.key : null))}
                                    barChanged={(value) => this.props.dispatch(barChanged(bar.key, value))}
                            />
                            ))}
                            {attributes.map((attr) => (
                                <ListItem
                                    key={attr.key}
                                    rightTitle={attr.name}
                                    title={char[attr.key]}
                                    hideChevron
                                />
                            ))}
                        </List>

                    </Card>
                </VBox>
                <VBox flex={2}>
                    <Card title="Characteristics">
                        {stats.map((stat) => (
                            <Stat
                                key={stat.key}
                                name={stat.name}
                                value={char.stats[stat.key]}
                            />
                        ))}
                    </Card>
                </VBox>
                <VBox flex={2}>
                    <Card title="Skills">
                        {skills.map(([key, skill]) => (
                            <Stat
                                key={key}
                                name={skill.name}
                                value={skill.current}
                                used={skill.used}
                                skill
                                toggleSkillUsed={() => this.props.dispatch(toggleSkillUsed(key))}
                            />
                        ))}
                    </Card>
                </VBox>
            </HBox>
        );
    }
}
