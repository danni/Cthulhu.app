import React from 'react';
import PropTypes from 'prop-types';
import { range } from 'lodash';
import {
    LayoutAnimation,
    Picker,
    ProgressViewIOS,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import SLIcon from 'react-native-vector-icons/SimpleLineIcons';
import Swipeable from 'react-native-swipeable';

import { HBox, VBox } from './Box';


const styles = StyleSheet.create({
    row: {
        padding: 5,
    },

    statLabel: {
        fontSize: 17,
        fontWeight: 'normal',
    },

    statLabelSpecialization: {
        fontSize: 12,
        fontWeight: '300',
        color: '#555',
    },

    statBlock: {
        fontSize: 28,
        fontWeight: '300',
    },

    input: {
        height: 40,
        width: 40,
    },

    bar: {
        paddingTop: 10,
        paddingBottom: 10,
    },

    editSwipe: {
        backgroundColor: 'rgb(0, 122, 255)',
        padding: 12,
        paddingTop: 13,
        paddingLeft: 18,
    },

    deleteSwipe: {
        backgroundColor: 'rgb(255, 59, 48)',
        padding: 10,
        paddingLeft: 20,
    },
});


export class StatBlock extends React.Component {
    static propTypes = {
        value: PropTypes.number,
    };

    render() {
        return (
            <HBox margin={5}>
                <Text style={styles.statBlock}>{this.props.value}</Text>
                <VBox marginLeft={8} width={20} center>
                    <Text>{Math.floor(this.props.value / 2)}</Text>
                    <Text>{Math.floor(this.props.value / 5)}</Text>
                </VBox>
            </HBox>
        );
    }
}


export class Stat extends React.Component {
    static propTypes = {
        name: PropTypes.string,
        specialization: PropTypes.string,
        skill: PropTypes.bool,
        toggleSkillUsed: PropTypes.func,
        used: PropTypes.bool,
        value: PropTypes.number,
    };

    onLeftPress() {
        if (this.props.skill && this.props.toggleSkillUsed) {
            this.props.toggleSkillUsed();
        }
    }

    render() {
        let left = null;
        let style = [styles.statLabel, { marginTop: 4 }];

        if (this.props.used === null) {
            left = (<HBox width={26} />);
        } else if (this.props.skill) {
            left = (
                <TouchableOpacity
                    onPress={() => this.onLeftPress()}
                >
                    <Icon
                        name={this.props.used ? 'ios-checkmark-circle' : 'ios-radio-button-off'}
                        size={30}
                        color={'#212141'}
                    />
                </TouchableOpacity>
            );
        }

        if (this.props.specialization) {
            style = [styles.statLabelSpecialization, { marginTop: -4 }];
        }

        return (
            <HBox expand center>
                <HBox>
                    {left}
                    <VBox expand marginLeft={10}>
                        <Text style={style}>{this.props.name}</Text>
                        {this.props.specialization
                            ? <Text style={[styles.statLabel, { top: -3 }]}>{this.props.specialization}</Text>
                            : null}
                        </VBox>
                </HBox>
                <StatBlock value={this.props.value} />
            </HBox>
        );
    }
}


export class EditableStat extends React.Component {
    static propTypes = {
        initial: PropTypes.number,
        label: PropTypes.string,
        onChange: PropTypes.func,
        onDelete: PropTypes.func,
        onEdit: PropTypes.func,
        specialization: PropTypes.string,
    };

    constructor(props) {
        super(props);

        this.state = {
            value: props.initial || 0,
        }
    }

    onChange(value) {
        value = parseInt(value, 10);
        value = Math.min(value, 99);
        value = Math.max(value, 0);

        this.setState({ value })
    }

    editingDone() {
        if (this.props.onChange && Number.isInteger(this.state.value)) {
            this.props.onChange(this.state.value);
        }
    }

    render() {
        const {
            initial,
            onChange,
            onDelete,
            onEdit,
            label,
            specialization,
            ...rest
        } = this.props;

        let value = this.state.value;

        if (Number.isInteger(value)) {
            value = value.toString();
        } else {
            value = '';
        }

        const style = specialization
            ? styles.statLabelSpecialization
            : styles.statLabel;

        const row = (
            <HBox style={styles.row} expand center>
                <VBox>
                    {label
                        ? <Text style={style}>{label}</Text>
                        : null}
                    {specialization
                        ? <Text style={styles.statLabel}>{specialization}</Text>
                        : null}
                </VBox>
                <TextInput
                    value={value}
                    style={styles.input}
                    maxLength={2}
                    keyboardType="numeric"
                    onChangeText={(value) => this.onChange(value)}
                    onEndEditing={() => this.editingDone()}
                    {...rest}
                />
            </HBox>
        );

        const buttons = [];

        if (onEdit) {
            buttons.push(
                <TouchableOpacity
                    onPress={() => {
                        this._swipeable.recenter();
                        onEdit();
                    }}
                    style={styles.editSwipe}
                >
                    <SLIcon
                        name="pencil"
                        size={25}
                        color="white"
                    />
                </TouchableOpacity>
            );
        }

        if (onDelete) {
            buttons.push(
                <TouchableOpacity
                    onPress={() => {
                        this._swipeable.recenter();
                        onDelete();
                    }}
                    style={styles.deleteSwipe}
                >
                    <Icon
                        name="ios-trash-outline"
                        size={30}
                        color="white"
                    />
                </TouchableOpacity>
            );
        }

        if (buttons.length > 0) {
            return (
                <Swipeable
                    ref={(ref) => {this._swipeable = ref}}
                    rightButtonWidth={60}
                    rightButtons={buttons}
                >
                    {row}
                </Swipeable>
            );
        } else {
            return row;
        }
    }
}


export class Bar extends React.Component {
    static propTypes = {
        onChange: PropTypes.func,
        color: PropTypes.string,
        max: PropTypes.number,
        name: PropTypes.string,
        open: PropTypes.bool,
        setOpen: PropTypes.func,
        value: PropTypes.number,
    };

    onPress() {
        if (!this.props.onChange || !this.props.setOpen) {
            return;
        }

        this.props.setOpen(!this.props.open);
    }

    onBarChanged(value) {
        this.props.onChange(value);
        this.props.setOpen(false);
    }

    render() {
        return (
            <TouchableOpacity
                onPress={() => this.onPress()}
                style={styles.bar}
            >
                <VBox>
                    <HBox expand marginBottom={8}>
                        <Text>{this.props.name}</Text>
                        <Text>{this.props.value}/{this.props.max}</Text>
                    </HBox>
                    <ProgressViewIOS
                        progress={this.props.value / this.props.max}
                        progressTintColor={this.props.color}
                    />
                    {this.renderPicker()}
                </VBox>
            </TouchableOpacity>
        );
    }

    renderPicker() {
        LayoutAnimation.easeInEaseOut();

        if (!this.props.open) {
            return;
        }

        return (
            <Picker
                onValueChange={(value) => this.onBarChanged(value)}
                selectedValue={this.props.value}
            >
                {range(0, this.props.max + 1).map((value) => (
                    <Picker.Item
                        value={value}
                        key={value}
                        label={value.toString()}
                    />
                ))}
            </Picker>
        );
    }
}
