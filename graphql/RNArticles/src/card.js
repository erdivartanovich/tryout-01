import React from 'react';
import {
    View,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';

const Card = (props) =>
    <TouchableOpacity>
        <View style={[styles.card]}>
            {props.children}
        </View>
    </TouchableOpacity>

const styles = StyleSheet.create({
    card: {
        borderWidth: 1,
        borderRadius: 2,
        borderColor: '#ddd',
        borderBottomWidth: 0,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 1,
        marginLeft: 5,
        marginRight: 5,
        marginTop: 10
    }
});

export default Card;

