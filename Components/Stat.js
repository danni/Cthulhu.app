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
    TouchableHighlight,
} from 'react-native';

import { HBox, VBox } from './Box';


const styles = StyleSheet.create({
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
});


export class StatBlock extends React.Component {
    static propTypes = {
        value: PropTypes.number,
    };

    render() {
        return (
            <HBox margin={4}>
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
        let style = styles.statLabel;

        if (this.props.skill) {
            left = {
                name: this.props.used ? 'check-box' : 'check-box-outline-blank',
            };
        }

        if (this.props.specialization) {
            style = styles.statLabelSpecialization;
        }

        return (
            <HBox expand center>
                <VBox>
                    <Text style={style}>{this.props.name}</Text>
                    {this.props.specialization
                            ? <Text style={styles.statLabel}>{this.props.specialization}</Text>
                            : null}
                </VBox>
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
            ...rest
        } = this.props;

        let value = this.state.value;
        if (Number.isInteger(value)) {
            value = value.toString();
        } else {
            value = '';
        }

        const style = this.props.specialization
            ? styles.statLabelSpecialization
            : styles.statLabel;

        return (
            <HBox expand center>
                <VBox>
                    {this.props.label
                        ? <Text style={style}>{this.props.label}</Text>
                        : null}
                    {this.props.specialization
                        ? <Text style={styles.statLabel}>{this.props.specialization}</Text>
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
            <TouchableHighlight
                onPress={() => this.onPress()}
            >
                <VBox marginTop={4} marginBottom={4}>
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
            </TouchableHighlight>
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
