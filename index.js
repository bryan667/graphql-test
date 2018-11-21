var { graphql, buildSchema } = require('graphql');

const db = {
    users: [
        { id: '1', email: 'bryan@gmail.com', name: 'Bry'},
        { id: '2', email: 'awyis@gmail.com', name: 'Awyis'},
    ]
}

const schema = buildSchema(`
  type Query {
    users: [User!]!
  }

  type User {
      id: ID!
      email: String!
      name: String
      avatarUrl: String
  }
`);

var rootValue = { 
    users: () => db.users
};

graphql(schema, 
    `
        { 
            users {
                id
                email
            }     
        }
    `,
    rootValue    
).then((response) => {
  console.dir(response, { depth: null });
}).catch(
    console.error
)