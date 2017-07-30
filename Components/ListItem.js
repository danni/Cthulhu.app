import React from 'react';
import PropTypes from 'prop-types';
import {
    StyleSheet,
    Text,
    TextInput,
} from 'react-native';

import { VBox } from './Box';


const styles = StyleSheet.create({
    main: {
        fontSize: 17,
        fontWeight: 'normal',
    },
    label: {
        fontSize: 12,
        fontWeight: '300',
        color: '#555',
    },
    input: {
        height: 40,
    },
});


export class ListItem extends React.Component {
    static propTypes = {
        label: PropTypes.string,
        value: PropTypes.string,
    };

    render() {
        return (
            <VBox marginTop={4} marginBottom={4}>
                {this.props.label
                        ? <Text style={styles.label}>{this.props.label}</Text>
                        : null}
                <Text style={styles.main}>{this.props.value}</Text>
            </VBox>
        );
    }
}


export class EditableListItem extends React.Component {
    static propTypes = {
        label: PropTypes.string,
        initial: PropTypes.string,
        onChange: PropTypes.func,
    };

    constructor(props) {
        super(props);

        this.state = {
            value: props.initial,
        }
    }

    editingDone() {
        if (this.props.onChange) {
            this.props.onChange(this.state.value);
        }
    }

    getValue() {
        return this.state.value;
    }

    render() {
        const { 
            initial,
            onChange,
            ...rest
        } = this.props;

        return (
            <VBox marginTop={4} marginBottom={4}>
                {this.props.label
                        ? <Text style={styles.label}>{this.props.label}</Text>
                        : null}
                <TextInput
                    value={this.state.value}
                    style={styles.input}
                    onChangeText={(value) => this.setState({ value })}
                    onEndEditing={() => this.editingDone()}
                    {...rest}
                />
            </VBox>
        );
    }
}
