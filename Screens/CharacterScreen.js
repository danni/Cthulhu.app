import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
    Card,
    Text,
    List,
    ListItem,
} from 'react-native-elements';

import { toggleSkillUsed, barChanged } from '../Reducers/character';
import { Stat, Bar } from '../Components/Stat';
import { HBox, VBox } from '../Components/Box';


@connect((state) => ({
    character: state.character.toJS(),
}))
export default class CharacterScreen extends React.Component {
    static propTypes = {
        character: PropTypes.object,
        dispatch: PropTypes.func,
    }

    static navigationOptions = (nav) => ({
        title: nav.navigation.character.name,
    });

    render() {
        const char = this.props.character;
        const skills = Object.entries(char.skills);

        return (
            <HBox>
                <VBox flex={2}>
                    <Card>
                        <Text h4>{char.name}</Text>

                        <List>
                            <Bar
                                name="Hit Points"
                                value={char.hp.current}
                                max={char.hp.max}
                                color="darkred"
                                barChanged={(value) => this.props.dispatch(barChanged('hp', value))}
                            />
                            <Bar
                                name="Sanity"
                                value={char.san.current}
                                max={char.san.max}
                                color="purple"
                                barChanged={(value) => this.props.dispatch(barChanged('san', value))}
                            />
                            <Bar
                                name="Luck"
                                value={char.luck.current}
                                max={char.luck.max}
                                color="blue"
                                barChanged={(value) => this.props.dispatch(barChanged('luck', value))}
                            />
                            <Bar
                                name="Magic Points"
                                value={char.mp.current}
                                max={char.mp.max}
                                color="green"
                                barChanged={(value) => this.props.dispatch(barChanged('mp', value))}
                            />

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
