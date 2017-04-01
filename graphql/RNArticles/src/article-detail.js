import React from 'react';
import {
    StyleSheet,
    View,
    Text
} from 'react-native';

import Card from './card';
import CardSection from './card-section';

const ArticleDetail = (props) => 
    <Card style={{ paddingLeft: 16 }}>
        <CardSection style={styles.headerSection}>
            <View></View>
            <View style={styles.headerSection}>
                <Text style={{ fontSize: 16 }} > {props.article.id} </Text>
                <Text style={{ fontSize: 16 }} > {props.article.title} </Text>
                <Text style={{ fontSize: 12 }} > {props.article.content} </Text>
                <Text style={{ fontSize: 12 }} > {props.article.author} </Text>
            </View>
        </CardSection>
    </Card>;

const styles = StyleSheet.create({
   headerSection: { 
       flexDirection: 'column',
       justifyContent: 'space-around',    
   } 
});

export default ArticleDetail;

