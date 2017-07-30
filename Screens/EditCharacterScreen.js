import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { orderBy } from 'lodash';
import {
    FlatList,
    Text,
    TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import styles from '../styles';

import {
    addSkill,
    editSkill,
    deleteSkill,
    loadCharacter,
    setValue,
    ATTRIBUTES,
    STATS,
} from '../Reducers/character';

import { HBox, VBox } from '../Components/Box';
import { EditableListItem } from '../Components/ListItem';
import { EditableStat } from '../Components/Stat';
import { Modal } from '../Components/Modal';


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

    constructor(props) {
        super(props);

        this.state = {
            showSkillModal: false,
            selectedSkill: null,
        };
    }

    componentDidMount() {
        const id = this.props.navigation.state.params.id;
        this.props.dispatch(loadCharacter(id));
    }

    onValueChanged(key, value) {
        this.props.dispatch(setValue(key, value));
    }

    onDeleteSkill(key) {
        this.props.dispatch(deleteSkill(key));
    }

    onAddSkill() {
        this.setState({
            showSkillModal: true,
            selectedSkill: null,
        });
    }

    onEditSkill(key) {
        this.setState({
            showSkillModal: true,
            selectedSkill: key,
        });
    }

    onCancelSaveSkill() {
        this.setState({
            showSkillModal: false,
            selectedSkill: null,
        });
    }

    onSaveSkill() {
        const name = this._skillModalSkill.getValue();
        const specialization = this._skillModalSpecialization.getValue();

        if (this.state.selectedSkill) {
            this.props.dispatch(editSkill(this.state.selectedSkill,
                                          name, specialization));
        } else {
            this.props.dispatch(addSkill(name, specialization));
        }

        this.setState({
            showSkillModal: false,
            selectedSkill: null,
        });
    }

    render() {
        const char = this.props.character;
        const skills = orderBy(Object.entries(char.skills)
            .map(([key, skill]) => ({ key, ...skill })),
            ['name', 'specialization']);
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
                    <HBox expand marginRight={10}>
                        <Text style={styles.sectionHeading}>Skills</Text>
                        <TouchableOpacity onPress={() => this.onAddSkill()}>
                            <Icon name="ios-add" size={30} />
                        </TouchableOpacity>
                    </HBox>
                    <Modal
                        visible={this.state.showSkillModal}
                        title={this.state.selectedSkill ? "Edit Skill" : "Add Skill"}
                        action={this.state.selectedSkill ? "Save" : "Add"}
                        onCancel={() => this.onCancelSaveSkill()}
                        onSave={() => this.onSaveSkill()}
                    >
                        <EditableListItem
                            label="Skill"
                            ref={(elem) => {this._skillModalSkill = elem}}
                            initial={this.state.selectedSkill ? char.skills[this.state.selectedSkill].name : null}
                        />
                        <EditableListItem
                            label="Specialization (Optional)"
                            ref={(elem) => {this._skillModalSpecialization = elem}}
                            initial={this.state.selectedSkill ? char.skills[this.state.selectedSkill].specialization : null}
                        />
                    </Modal>

                    <FlatList
                        data={skills}
                        renderItem={({item}) => (
                            <EditableStat
                                label={item.name}
                                specialization={item.specialization}
                                initial={item.current}
                                onChange={(value) => this.onValueChanged(['skills', item.key, 'current'], value)}
                                onEdit={() => this.onEditSkill(item.key)}
                                onDelete={() => this.onDeleteSkill(item.key)}
                            />
                        )}
                    />
                </VBox>
            </HBox>
        );
    }
}
