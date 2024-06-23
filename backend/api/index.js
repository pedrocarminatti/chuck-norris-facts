const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const axios = require('axios');
const express = require('express');
const cors = require('cors');

const app = express();

const schema = buildSchema(`
  type Query {
    chuckNorrisFact: Fact
  }

  type Fact {
    fact: String
    icon_url: String
  }
`);

const root = {
  chuckNorrisFact: async () => {
    const response = await axios.get('https://api.chucknorris.io/jokes/random');
    return {
      fact: response.data.value,
      icon_url: response.data.icon_url
    };
  }
};

app.use(cors());
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));

module.exports = app;
