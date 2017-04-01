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
  constructor({id, title, content, author}) {
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
    getArticles: [Article]
  }
  type Mutation {
    createArticle(input: ArticleInput): Article
    updateArticle(id: ID!, input: ArticleInput): Boolean
  }
`);


// init fake database, no need to use persistance storage right?
var database = [];

var root = {
  getArticle: function ({id}) {
    const cb = (item) => {
      return item.id = id;
    }
    const res = database.filter(cb);
    if (!res) {
      throw new Error('no Article exists with id ' + id);
    }
    return new Article({id: id, title: res.title, content: res.content, author: res.author});
  },

  getArticles: function () {
    return database;
  },

  createArticle: function ({input}) {
    // Create a random id for our "database".
    var id = require('crypto').randomBytes(10).toString('hex');
    var title = input.title;
    var content = input.content;
    var author = input.author;
    var article = new Article({id, title, content, author}); 
    database.push(article);
    console.log('article created:', article);
    console.log('db', database);
    return article;
  },
  updateArticle: function ({id, input}) {
    new_db = database.map(item => {
      if (item.id = id) {
        item.title = input.title
        item.content = input.content
        item.author = input.author
      }
    });
    database = new_db;
    return true;
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
