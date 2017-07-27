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
    ATTRIBUTES,
    BARS,
    STATS,
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

        return (
            <HBox>
                <VBox flex={2}>
                    <Card>
                        <Text h4>{char.name}</Text>

                        <List>
                            {BARS.map((bar) => (
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
                            {ATTRIBUTES.map((attr) => (
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
                        {STATS.map((stat) => (
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
