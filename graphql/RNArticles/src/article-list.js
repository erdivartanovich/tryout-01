import React, { Component } from 'react';
import {
  View,
  Button,
  ScrollView,
  Text,
  TextInput,
} from 'react-native';

import axios from 'axios';

import ArticleDetail from './article-detail';
import Spinner from './spinner';
import WithLabel from './labeled-text-input';

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
                createArticle(input: {title: "${ArticleTitle}", content: "${ArticleContent}", author: "${ArticleAuthor}"}) {
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
                <View style={{flex: 7}}>
                    <ScrollView >
                        {this.renderArticleList()}
                    </ScrollView>
                </View>
                <View style={{flex: 3}}>
                    <View style={{backgroundColor: 'gray', alignItems: 'center'}}>
                        <Text style={{color: 'white', fontWeight: 'bold', fontSize: 18}}>
                            ADD NEW ARTICLE
                        </Text>
                    </View>
                    <View>
                        <WithLabel label="Title:">
                            <TextInput placeholder="title" onChangeText={(value) => this.setState({ArticleTitle: value})}/>
                        </WithLabel>
                        <WithLabel label="Content:">
                            <TextInput placeholder="content" multiline = {true} onChangeText={(value) => this.setState({ArticleContent: value})}/>
                        </WithLabel>
                        <WithLabel label="Author:">
                            <TextInput placeholder="author" onChangeText={(value) => this.setState({ArticleAuthor: value})}/>
                        </WithLabel>
                    </View>
                    <View style ={{backgroundColor: "red"}}>
                        <Button title="Add New" onPress={this.addNew}/>
                    </View>
                </View>
            </View>
            
        );
    };
}

export default ArticleList;

