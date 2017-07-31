import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { orderBy } from 'lodash';
import {
    FlatList,
    Image,
    Picker,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    Text,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import SLIcon from 'react-native-vector-icons/SimpleLineIcons';

import styles from '../styles';

import {
    selectCharacter,
    setValue,
    toggleSkillUsed,
    toggleMajorWound,
    ATTRIBUTES,
    BARS,
    STATS,
} from '../Reducers/character';
import { barSetOpen } from '../Reducers/character/ui';

import { HBox, VBox } from '../Components/Box';
import { Stat, Bar } from '../Components/Stat';
import { ListItem } from '../Components/ListItem';


const charStyles = StyleSheet.create({
    editButton: {
        padding: 10,
    },

    image: {
        width: '100%',
        height: 'auto',
        minHeight: 300,
        backgroundColor: 'gray',
    },

    characterName: {
        backgroundColor: '#000000aa',
        bottom: 0,
        color: 'white',
        padding: 2,
        position: 'absolute',
        textAlign: 'center',
        width: '100%',
    },

    iconLabel: {
        marginLeft: 5,
        marginTop: 0,
    },
});


@connect((state) => ({
    character: selectCharacter(state.character).toJS(),
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
            <TouchableOpacity
                style={charStyles.editButton}
                onPress={() => navigation.navigate('EditCharacter', {
                    id: navigation.state.id,
                })}
            >
                <SLIcon
                    name="pencil"
                    color="#037aff"
                    size={25}
                />
            </TouchableOpacity>
        ),
    });

    onBarOpened(key) {
        this.props.dispatch(barSetOpen(key));
    }

    onBarChanged(key, value) {
        this.props.dispatch(setValue([key, 'current'], value))
    }

    toggleSkillUsed(key) {
        this.props.dispatch(toggleSkillUsed(key));
    }

    renderBar(bar) {
        const char = this.props.character;

        return (
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
        );
    }

    renderMajorWound() {
        const char = this.props.character;

        return (
            <TouchableOpacity
                onPress={() => this.props.dispatch(toggleMajorWound())}
            >
                <HBox>
                    <Icon
                        name={char.hp.major_wound ? 'ios-alert' : 'ios-radio-button-off'}
                        size={20}
                        color={char.hp.major_wound ? 'darkred' : null}
                    />
                    <Text style={[styles.label, charStyles.iconLabel]}>
                        {char.hp.major_wound ? 'Major wound' : 'No major wound'}
                    </Text>
                </HBox>
            </TouchableOpacity>
        );
    }

    renderDying() {
        const char = this.props.character;


        if (char.hp.current === 0) {
            return (
                <HBox>
                    <Icon
                        name={char.hp.major_wound ? 'ios-pulse' : 'ios-medkit'}
                        size={20}
                        color="darkred"
                    />
                    <Text style={[styles.label, charStyles.iconLabel]}>
                        {char.hp.major_wound ? 'Dying' : 'Unconscious'}
                    </Text>
                </HBox>
            );
        } else {
            return null;
        }
    }

    renderSanityToday() {
        const char = this.props.character;

        if (char.san.delta > 0) {
            return (
                <HBox expand>
                    <Text>Gained today</Text>
                    <Text>{char.san.delta}</Text>
                </HBox>
            );
        } else {
            return (
                <HBox expand>
                    <Text>Lost today</Text>
                    <Text>{Math.abs(char.san.delta)}/{char.san.threshold}</Text>
                </HBox>
            );
        }
    }

    renderSanity() {
        const char = this.props.character;
        let icon = 'ios-radio-button-off';
        let text = 'Sane';
        let color = 'black';
        let picker = null;
        let touchAction = 'sanStatus';

        if (char.san.current === 0) {
            icon = 'ios-sad';
            text = 'Permanently insane';
            color = 'purple';
        } else if (char.san.status === 'indefinite') {
            icon = 'ios-alert';
            text = 'Indefinitely insane';
            color = 'purple';
        } else if (char.san.status === 'temporary') {
            icon = 'ios-timer';
            text = 'Temporarily insane';
            color = 'purple';
        }

        if (this.props.ui.openBar === 'sanStatus') {
            touchAction = null;
            picker = (
                <Picker
                    selectedValue={char.san.status}
                    onValueChange={(value) => {
                        this.props.dispatch(setValue(['san', 'status'], value));
                        this.onBarOpened(null);
                    }}
                >
                    <Picker.Item value="sane" label="Sane" />
                    <Picker.Item value="temporary" label="Temporarily Insane" />
                    <Picker.Item value="indefinite" label="Indefinitely Insane" />
                </Picker>
            );
        }

        return (
            <TouchableOpacity onPress={() => this.onBarOpened(touchAction)}>
                <VBox>
                    <HBox marginTop={5}>
                        <Icon
                            name={icon}
                            size={20}
                            color={color}
                        />
                        <Text style={[styles.label, charStyles.iconLabel]}>
                            {text}
                        </Text>
                    </HBox>
                    {picker}
                </VBox>
            </TouchableOpacity>
        );
    }

    render() {
        const char = this.props.character;
        const skills = orderBy(Object.entries(char.skills)
            .map(([key, skill]) => ({ key, ...skill })),
            ['name', 'specialization']);

        const [hp, san, luck, mp] = BARS;

        return (
            <HBox style={styles.container}>
                <ScrollView style={styles.column}>
                    <VBox>
                        <VBox center marginBottom={10}>
                            <Image
                                style={charStyles.image}
                                resizeMode="contain"
                            />
                            <Text
                                style={[ styles.characterName, charStyles.characterName]}
                            >
                                {char.name}
                            </Text>
                        </VBox>

                        {this.renderBar(hp)}
                        {this.renderMajorWound()}
                        {this.renderDying()}
                        {this.renderBar(san)}
                        {this.renderSanityToday()}
                        {this.renderSanity()}
                        {this.renderBar(luck)}
                        {this.renderBar(mp)}

                        {ATTRIBUTES.map((attr) => (
                            <ListItem
                                key={attr.key}
                                label={attr.name}
                                value={char[attr.key].toString()}
                            />
                        ))}
                    </VBox>
                </ScrollView>
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
