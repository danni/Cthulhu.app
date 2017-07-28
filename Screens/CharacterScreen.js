import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { orderBy } from 'lodash';
import {
    FlatList,
    Text,
    StyleSheet,
} from 'react-native';
import {
    Button,
} from 'react-native-elements';

import {
    setValue,
    loadCharacter,
    toggleSkillUsed,
    ATTRIBUTES,
    BARS,
    STATS,
} from '../Reducers/character';
import { barSetOpen } from '../Reducers/character/ui';

import { HBox, VBox } from '../Components/Box';
import { Stat, Bar } from '../Components/Stat';
import { ListItem } from '../Components/ListItem';


const styles = StyleSheet.create({
    column: {
        flex: 2,
        backgroundColor: 'white',
        margin: 8,
        padding: 8,
    },

    characterName: {
        fontSize: 28,
        fontWeight: '300',
    },

    sectionHeading: {
        fontSize: 22,
        fontWeight: '300',
    }
})


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

    static navigationOptions = ({ navigation }) => ({
        title: 'Character',  // FIXME
        headerRight: (
            <Button
                icon={{ name: 'mode-edit', color: '#037aff' }}
                backgroundColor="transparent"
                onPress={() => navigation.navigate('EditCharacter', {
                    id: navigation.state.id,
                })}
            />
        ),
    });

    componentDidMount() {
        const id = this.props.navigation.state.params.id;
        this.props.dispatch(loadCharacter(id));
    }

    onBarOpened(key) {
        this.props.dispatch(barSetOpen(key));
    }

    onBarChanged(key, value) {
        this.props.dispatch(setValue([key, 'current'], value))
    }

    toggleSkillUsed(key) {
        this.props.dispatch(toggleSkillUsed(key));
    }

    render() {
        const char = this.props.character;
        const skills = orderBy(Object.entries(char.skills)
            .map(([key, skill]) => ({ key, ...skill })), 'name');

        return (
            <HBox>
                <VBox style={styles.column}>
                    <Text style={styles.characterName}>{char.name}</Text>

                    {BARS.map((bar) => (
                        <Bar
                            key={bar.key}
                            name={bar.name}
                            value={char[bar.key].current}
                            max={char[bar.key].max}
                            color={bar.color}
                            open={this.props.ui.openBar === bar.key}
                            setOpen={(value) => this.onBarOpened(value ? bar.key : null)}
                            onChange={(value) => this.onBarChanged(bar.key, value)}
                    />
                    ))}
                    {ATTRIBUTES.map((attr) => (
                        <ListItem
                            key={attr.key}
                            label={attr.name}
                            value={char[attr.key].toString()}
                        />
                    ))}
                </VBox>
                <VBox style={styles.column}>
                    <Text style={styles.sectionHeading}>Characteristics</Text>
                    {STATS.map((stat) => (
                        <Stat
                            key={stat.key}
                            name={stat.name}
                            value={char.stats[stat.key]}
                        />
                    ))}
                </VBox>
                <VBox style={styles.column}>
                    <Text style={styles.sectionHeading}>Skills</Text>
                    <FlatList
                        data={skills}
                        renderItem={({item}) => (
                            <Stat
                                name={item.name}
                                specialization={item.specialization}
                                value={item.current}
                                used={item.used}
                                skill
                                toggleSkillUsed={() => this.toggleSkillUsed(item.key)}
                            />
                        )}
                    />
                </VBox>
            </HBox>
        );
    }
}
