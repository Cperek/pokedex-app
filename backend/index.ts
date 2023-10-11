import express, {Express} from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import { table } from 'console';


//get configuration properties
require('dotenv').config()
const config = process.env;
const uri = config.MONGO_DB_URI ? config.MONGO_DB_URI : '';
const database = config.DB_NAME ? config.DB_NAME : '';
const port = config.PORT;



export { uri, database };



//declare express app
const app: Express = express();
app.use(morgan('combined'));
app.use(bodyParser.json())
app.use(cors());




//request handler
require('./lib/routes')(app);


//listener
app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

