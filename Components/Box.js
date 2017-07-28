import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';

export class Box extends React.Component {
    static propTypes = {
        center: PropTypes.bool,
        children: PropTypes.node,
        direction: PropTypes.string,
        expand: PropTypes.bool,
        style: View.propTypes.style,
    };

    setNativeProps(props) {
        this._view.setNativeProps(props);
    }

    render() {
        const {
            center,
            direction,
            expand,
            children,
            style: styleProp,
            ...rest
        } = this.props;

        const style = {
            flexDirection: direction,
        };

        if (center) {
            style.alignItems = 'center';
        }

        if (expand) {
            style.justifyContent = 'space-between';
        }

        return (
            <View ref={(ref) => {this._view = ref}} style={[style, styleProp, rest]}>
                {children}
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
