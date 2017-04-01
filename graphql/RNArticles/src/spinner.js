import React from 'react';
import { ActivityIndicator } from 'react-native';

const Spinner = ({ size }) => 
    <ActivityIndicator
        style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            padding: 60,
            backgroundColor: 'silver'
        }}
        size={size || 'large'}
    />;

export default Spinner;
