const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const axios = require('axios');
const cors = require('cors');

const schema = buildSchema(`
  type ChuckNorrisFact {
    fact: String
    icon_url: String
  }

  type Query {
    chuckNorrisFact: ChuckNorrisFact
  }
`);

const root = {
  chuckNorrisFact: async () => {
    try {
      const response = await axios.get('https://api.chucknorris.io/jokes/random');
      const fact = response.data.value;
      const iconUrl = response.data.icon_url;
      return { fact, icon_url: iconUrl };
    } catch (err) {
      throw new Error('Failed to fetch Chuck Norris fact');
    }
  }
};

const app = express();
app.use(cors());
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));

app.listen(4000, () => console.log('Server Running On localhost:4000/graphql'));
