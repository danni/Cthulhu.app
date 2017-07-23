import React from 'react';
import { View } from 'react-native';

export class Box extends React.Component {
    render() {
        const props = {
            direction,
            ...rest
        } = this.props;

        const style = {
            flexDirection: direction,
            ...rest
        };

        if (this.props.expand) {
            style.justifyContent = 'space-between';
        }

        return (
            <View style={style}>
                {this.props.children}
            </View>
        );
    }
}


export class HBox extends Box {
    static defaultProps = {
        direction: 'row',
    }
}


export class VBox extends Box {
    static defaultProps = {
        direction: 'column',
    }
}
