import React from 'react';
import PropTypes from 'prop-types';
import { ProgressViewIOS, Picker } from 'react-native';
import {
    Text,
    ListItem,
} from 'react-native-elements';
import { range } from 'lodash';

import { HBox, VBox } from './Box';


export class StatBlock extends React.Component {
    static propTypes = {
        value: PropTypes.number,
    };

    render() {
        return (
            <HBox>
                <Text h4>{this.props.value}</Text>
                <VBox marginLeft={8}>
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

        if (this.props.skill) {
            left = {
                name: this.props.used ? 'check-box' : 'check-box-outline-blank',
            };
        }

        const right = (
            <StatBlock value={this.props.value} />
        );

        return (
            <ListItem
                title={this.props.name}
                leftIcon={left}
                rightIcon={right}
                leftIconOnPress={() => this.onLeftPress()}
            />
        );
    }
}


export class Bar extends React.Component {
    static propTypes = {
        barChanged: PropTypes.func,
        color: PropTypes.string,
        max: PropTypes.number,
        name: PropTypes.string,
        value: PropTypes.number,
    };

    constructor(props) {
        super(props);
        this.state = {
            open: false,
        };
    }

    onPress() {
        if (!this.props.barChanged) {
            return;
        }

        this.setState({
            open: !this.state.open,
        });
    }

    onBarChanged(value) {
        this.props.barChanged(value);

        this.setState({ open: false })
    }

    render() {
        return (
            <ListItem
                title={(
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
                )}
                onPress={() => this.onPress()}
                hideChevron
            />
        );
    }

    renderPicker() {
        if (!this.state.open) {
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
