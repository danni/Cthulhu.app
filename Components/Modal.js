import React from 'react';
import PropTypes from 'prop-types';
import {
    Button,
    StyleSheet,
    Text,
} from 'react-native';
import RNModal from 'react-native-modal';

import { HBox, VBox } from './Box';


const styles = StyleSheet.create({
    modalContent: {
        backgroundColor: 'darkgreen',
        borderColor: 'rgba(0, 0, 0, 0.1)',
        borderRadius: 10,
        width: '33%',
        marginLeft: 'auto',
        marginRight: 'auto',
    },

    modalHeader: {
        backgroundColor: 'transparent',
        color: 'white',
        fontSize: 22,
        fontWeight: '500',
        textAlign: 'center',
        padding: 10,
    },

    modalBody: {
        backgroundColor: 'white',
        padding: 15,
    },

    modalButtons: {
        backgroundColor: 'white',
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        padding: 5,
    },

    modalButton: {
        color: '#037aff',
    }
});


export class Modal extends React.Component {

    static propTypes = {
        action: PropTypes.string,
        children: PropTypes.node,
        onCancel: PropTypes.func,
        onSave: PropTypes.func,
        title: PropTypes.string,
        visible: PropTypes.bool,
    };

    render() {
        return (
            <RNModal
                isVisible={this.props.visible}
            >
                <VBox style={styles.modalContent}>
                    <Text style={styles.modalHeader}>{this.props.title}</Text>
                    <VBox style={styles.modalBody}>
                        {this.props.children}
                    </VBox>
                    <HBox style={styles.modalButtons} expand>
                        <Button
                            style={styles.modalButton}
                            title="Cancel"
                            onPress={() => this.props.onCancel()}
                        />
                        <Button
                            style={styles.modalButton}
                            title={this.props.action}
                            onPress={() => this.props.onSave()}
                        />
                    </HBox>
                </VBox>
            </RNModal>
        );
    }
}
