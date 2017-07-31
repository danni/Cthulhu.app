import { StyleSheet } from 'react-native';


export default StyleSheet.create({
    container: {
        position: 'absolute',
        top: 10,
        bottom: 10,
        left: 10,
        right: 10,
    },

    column: {
        flex: 1,
        backgroundColor: 'white',
        marginLeft: 4,
        marginRight: 4,
        padding: 10,
        maxWidth: 400,
    },

    characterName: {
        fontSize: 28,
        fontWeight: '300',
    },

    sectionHeading: {
        fontSize: 22,
        fontWeight: '300',
    },

    label: {
        fontSize: 17,
        fontWeight: 'normal',
    },

})
