import React, { Component } from 'react';
import {
  View,
  Button,
  ScrollView,
  TextInput,
} from 'react-native';

import axios from 'axios';

import ArticleDetail from './article-detail';
import Spinner from './spinner';

const server = 'http://10.0.2.2:4000/'; //change this ip base on your environment

const getListArticle = () => {
    var http =  axios.create({
        baseURL: server,
    });

    return http.post('graphql', {
        query: `{
                        getArticles{
                            id
                            title
                            content
                            author
                        }
                }`,
    });
};

class ArticleList extends Component {

    state = {
        ListArticle: [],
        ArticleTitle: '',
        ArticleContent: '',
        ArticleAuthor: '',
    };

    constructor() {
        super();
    }

    componentWillMount() {
        getListArticle().then(response => {
            const result =  response.data.data.getArticles;
            this.setState({ListArticle: result})
        });
    };

    addNew = () => {
        var http =  axios.create({
          baseURL: server,
        });

        const {ArticleTitle, ArticleContent, ArticleAuthor} = this.state;

        http.post('graphql', {
            query: `mutation {
                createArticle(input: {title: ${ArticleTitle}, content: ${ArticleContent}, author: ${ArticleAuthor}}) {
                    id title content author
                }
            }`,
        }).then(() => {
            return getListArticle();
        }).then(resp => resp.data.data.getArticles)
        .then(result => this.setState({ListArticle: result})) 
        .catch(err => console.log(err))           
    };

    renderArticleList() {
        return (this.state.ListArticle.length > 0
            //if data not empty display the data
            ? this.state.ListArticle.map(article => 
              <ArticleDetail key={article.id} article={article} />)               
            : 
            <Spinner />
        );    
    };

    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={{flex: 9}}>
                    <ScrollView >
                        {this.renderArticleList()}
                    </ScrollView>
                </View>
                <View style={{flex: 1}}>
                    <View>
                        <TextInput placeholder="title:" onChangeText={(value) => this.setState({ArticleTitle: value})}/>
                        <TextInput placeholder="content:" onChangeText={(value) => this.setState({ArticleContent: value})}/>
                        <TextInput placeholder="author:" onChangeText={(value) => this.setState({ArticleAuthor: value})}/>
                    </View>
                    <View style ={{backgroundColor: "red"}}>
                        <Button title="Add New" onPress={this.addNew()}/>
                    </View>
                </View>
            </View>
            
        );
    };
}

export default ArticleList;

