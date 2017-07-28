import React from 'react';
import PropTypes from 'prop-types';
import {
    StyleSheet,
    Text,
} from 'react-native';
import { ListItem as RNEListItem } from 'react-native-elements';

import { HBox, VBox } from './Box';


const styles = StyleSheet.create({
    main: {
        fontSize: 17,
        fontWeight: '300',
    },
    label: {
        fontSize: 12,
        fontWeight: '300',
        color: '#555',
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
                <Text style={styles.value}>{this.props.value}</Text>
            </VBox>
        );
    }
}


export class EditableListItem extends React.Component {
    static propTypes = {
        initialValue: PropTypes.string,
        onChange: PropTypes.func,
    };

    constructor(props) {
        super(props);

        this.state = {
            value: props.initialValue,
        }
    }

    onBlur() {
        if (this.props.onChange) {
            this.props.onChange(this.state.value);
        }
    }

    render() {
        const { 
            initialValue,
            onChange,
            ...rest
        } = this.props;
        return (
            <RNEListItem
                textInputValue={this.state.value}
                textInputOnChangeText={(value) => this.setState({ value })}
                textInputOnBlur={() => this.onBlur()}
                textInputAutoCapitalize="words"
                textInput
                hideChevron
                {...rest}
            />
        );
    }
}
