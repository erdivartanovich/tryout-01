import React from 'react';
import {
    View,
    StyleSheet,
} from 'react-native';

const CardSection = (props) =>
    <View style={[styles.card]}>
        {props.children}
    </View>;

const styles = StyleSheet.create({
    card: {
        borderWidth: 1,
        padding: 5,
        backgroundColor: '#fff',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        borderColor: '#ddd',
        position: 'relative'
    }
});

export default CardSection;