import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const WithLabel = (props) => 
    <View style={styles.labelContainer}>
        <View>
            <Text style={styles.label}>
                {props.label}
            </Text>
        </View>
        {props.children}
    </View>


const styles = StyleSheet.create({
    label: {
        fontWeight: 'bold',
        fontSize: 16
    },
})

export default WithLabel;

