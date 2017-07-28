import React from 'react';
import PropTypes from 'prop-types';
import { ListItem } from 'react-native-elements';


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
            <ListItem
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
