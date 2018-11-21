const express = require ('express')
const graphqlHTTP = require('express-graphql')
const { buildSchema } = require('graphql')
const crypto = require ('crypto')

const db = {
    users: [
        { id: '1', email: 'bryan@gmail.com', name: 'Bry', avatarUrl: 'Awyssss' },
        { id: '2', email: 'awyis@gmail.com', name: 'Awyis', avatarUrl: 'Aaweaer'}, 
    ]
}

const schema = buildSchema(`
  type Query {
    users: [User!]!
  }

  type Mutation {
      addUser(email: String!, name: String): User
  }

  type User {
      id: ID!
      email: String!
      name: String
      avatarUrl: String
  }
`);

const rootValue = { 
    users: () => db.users,
    addUser: ({email, name}) => {
        const user = {
            id: crypto.randomBytes(10).toString('hex'),
            email,
            name
        }
        db.users.push(user)
        console.log(db.users)
        return user

    }
};

// graphql(schema, 
//     `
//         { 
//             users {
//                 id
//                 email
//             }     
//         }
//     `,
//     rootValue    
// ).then((response) => {
//   console.dir(response, { depth: null });
// }).catch(
//     console.error
// )

const app = express()

app.use('/graphql', graphqlHTTP({
    schema,
    rootValue,
    graphiql: true
}))

app.listen(3000, () => console.log('Listening on port 3000'))