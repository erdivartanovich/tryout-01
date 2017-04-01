import React, { Component } from 'react';
import {
  View,
} from 'react-native';

import axios from 'axios';

import ArticleDetail from './article-detail';
import Spinner from './spinner';

const server = 'http://192.168.40.5:4000'; //change this ip base on your environment

const getListArticle = () => {
    return fetch(server + '/graphql', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/graphql',
        },
        body: `{
            getArticles{
                id
                title
                content
                author
            }
        }`
    })
}

class ArticleList extends Component {

    state = {
        ListArticle: []
    };

    componentWillMount() {
        getListArticle().then((response => {
            var result = JSON.parse(response._bodyText);
            result = result.data.getArticles;
            this.setState({ ListArticle: result })
        }))
        .catch(err => console.log(err));
    }
    renderArticleList() {
        return (this.state.ListArticle.length > 0
            //if data not empty display the data
            ? this.state.ListArticle.map(article => 
              <ArticleDetail key={article.id} article={article} />)               
            : 
            <Spinner />
        );    
    }
    render() {
        return (
            <View style={{ flex: 1 }}>
                {this.renderArticleList()}
            </View>
        );
    }
}

export default ArticleList;

