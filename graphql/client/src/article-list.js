import React, { Component } from 'react';
import {
  View,
} from 'react-native';

import axios from 'axios';

import ArticleDetail from './article-detail';
import Spinner from './spinner';

const getListArticle = new Promise((resolve) => {
    const http = axios.create({
        baseURL: 'http://localhost:4000/',
    });
    const content = "fkasdjfdsjfkldsjkfjdsfkadsjkfjds";
    const author = "harry";
    http.post('graphql', {
    query: `mutation {
            createArticle(input: {content: "${content}", author: "${author}"}) {
            id
            content
            author
            }
        }`,
    }).then(result => console.log(result.data))
    .catch(err => console.log(err.response.data));
});

class ArticleList extends Component {

    state = {
        ListArticle: []
    };

    componentWillMount() {
        getListArticle.then((response => this.setState({ ListArticle: response })));
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
        console.log(this.state);
        return (
            <View style={{ flex: 1 }}>
                {this.renderArticleList()}
            </View>
        );
    }
}

export default ArticleList;

