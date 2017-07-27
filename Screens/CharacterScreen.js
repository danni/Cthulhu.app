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
        ui: PropTypes.object,
    }

    static navigationOptions = (nav) => ({
        title: nav.navigation.character.name,
    });

    componentDidMount() {
        this.props.dispatch(loadCharacter(1));
    }

    render() {
        const char = this.props.character;
        const skills = Object.entries(char.skills);
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

                            <ListItem
                                rightTitle="Occupation"
                                title={char.occupation}
                                hideChevron
                            />
                            <ListItem
                                rightTitle="Age"
                                title={char.age}
                                hideChevron
                            />
                            <ListItem
                                rightTitle="Sex"
                                title={char.sex}
                                hideChevron
                            />
                            <ListItem
                                rightTitle="Birthplace"
                                title={char.birthplace}
                                hideChevron
                            />
                            <ListItem
                                rightTitle="Residence"
                                title={char.residence}
                                hideChevron
                            />
                        </List>

                    </Card>
                </VBox>
                <VBox flex={2}>
                    <Card title="Characteristics">
                        <Stat
                            name="Strength"
                            value={char.stats.str}
                        />
                        <Stat
                            name="Constitution"
                            value={char.stats.con}
                        />
                        <Stat
                            name="Size"
                            value={char.stats.siz}
                        />
                        <Stat
                            name="Dexterity"
                            value={char.stats.dex}
                        />
                        <Stat
                            name="Appearance"
                            value={char.stats.app}
                        />
                        <Stat
                            name="Education"
                            value={char.stats.edu}
                        />
                        <Stat
                            name="Intelligence"
                            value={char.stats.int}
                        />
                        <Stat
                            name="Power"
                            value={char.stats.pow}
                        />
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
