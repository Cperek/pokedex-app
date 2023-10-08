import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import { MongoClient } from 'mongodb';
import { table } from 'console';
import dbengine from './database';

//get configuration properties
require('dotenv').config()
const config = process.env;
const uri = config.MONGO_DB_URI ? config.MONGO_DB_URI : '';
const port = config.PORT;

//get MongoCilent and export it for database.ts usage
const mc = new MongoClient(uri);
export { mc };

//get database methods
const db = dbengine.methods;

//declare express app
const app: Express = express();
app.use(morgan('combined'));;
app.use(bodyParser.json())
app.use(cors());




//request handler
app.get('/', (req: Request, res: Response) => {
  res.send(
    {
    message: 'Express + TypeScript Server'
    }
    );
});

app.post('/register', (req: Request, res: Response) => {
    // {
    // username: `${req.body.username}`,
    // password: `${req.body.password}`,
    // repassword: `${req.body.repassword}`,
    // }

    const result = db.insert_record('users',{
      username: req.body.username,
      password: req.body.password,
      created_at: now()
    })
    res.send(
      {
        result: result
      }
    );
  });

app.post('/login', (req: Request, res: Response) => {
  res.send(
    {
    username: `${req.body.username}`,
    password: `${req.body.password}`,
    }
    );
});

//listener
app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

// other methods
function now()
{
  return Math.floor(new Date().getTime() / 1000);
}