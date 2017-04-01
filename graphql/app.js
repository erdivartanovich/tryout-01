/**
 * REFACTORY TRY-OUT 01
 * GRAPHQL SERVER
 * author: Erdiansyah 
 */

import express from 'express';
import graphqlHTTP from 'express-graphql';
import { buildSchema } from 'graphql';

//define data class
class Article {
  constructor(id, {title, content, author}) {
    //i destructure the three paramater into one object wrapper so it would be easily to use
    //as the input parameter
    this.id = id; //this should be auto generated value
    this.title = title;
    this.content = content;
    this.author = author;
  }
}

// define the graphQL scheme based on the class Article
var schema = buildSchema(`
  input ArticleInput {
    title: String
    content: String
    author: String
  }
  type Article {
    id: ID!
    title: String
    content: String
    author: String
  }
  type Query {
    getArticle(id: ID!): Article
  }
  type Mutation {
    createArticle(input: ArticleInput): Article
    updateArticle(id: ID!, input: ArticleInput): Article
  }
`);


// init fake database, no need to use persistance storage right?
var database = {};

var root = {
  getArticle: function ({id}) {
    if (!database[id]) {
      throw new Error('no Article exists with id ' + id);
    }
    return new Article(id, database[id]);
  },
  createArticle: function ({input}) {
    // Create a random id for our "database".
    var id = require('crypto').randomBytes(10).toString('hex');

    database[id] = input;
    var article = new Article(id, input); 
    console.log('article created', article);
    return article;
  },
  updateArticle: function ({id, input}) {
    if (!database[id]) {
      throw new Error('no Article exists with id ' + id);
    }
    // This replaces all old data
    database[id] = input;
    var article = new Article(id, input); 
    console.log('article updated', article);
    return article;
  },
}


//expose graphql server use express
var app = express();

app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));

app.listen(4000, () => {
  console.log('Running a GraphQL API server at localhost:4000/graphql');
});
