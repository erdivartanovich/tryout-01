import React from 'react';
import { View, } from 'react-native';

import ArticleList from './article-list';

const Dashboard = () =>
    <View style={{ flex: 1 }}>
        <ArticleList />
    </View>;

export default Dashboard;
