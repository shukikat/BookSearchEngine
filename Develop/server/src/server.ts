import express from 'express';
import path from 'node:path';
import db from './config/connection.js';
//import routes from './routes/index.js';
import type { Request, Response } from 'express';

import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { typeDefs, resolvers } from './schemas/index.js';
import { authenticateToken } from './utils/auth.js';
import { fileURLToPath } from 'url';
import {dirname} from 'path';
const __filename=fileURLToPath(import.meta.url)
const __dirname=dirname(__filename);
const server= new ApolloServer({
  typeDefs, 
  resolvers,
})


const startApolloServer=async () => {
  await server.start();
  await db(); 



const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/graphql', expressMiddleware(server as any, 
  {
    context: authenticateToken as any
  }
));

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  console.log(__dirname)
  app.use(express.static(path.join(__dirname, '../client/dist')));

  app.get('*', (_req: Request, res: Response)=>{
    res.sendFile(path.resolve(__dirname, '../../client/dist/index.html'));
  });
}

//app.use(routes);

app.listen (PORT, () => {
  console.log(`API server running on ${PORT}!`);
  console.log(`Use GraphQL at http://localhost${PORT}/graphql`);
});
};

// db.once('open', () => {
//   app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));
// });

startApolloServer();
