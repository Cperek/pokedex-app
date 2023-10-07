import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import morgan from 'morgan';

dotenv.config();

const app: Express = express();
app.use(morgan('combined'));;
app.use(bodyParser.json())
app.use(cors());

const port = process.env.PORT || 4000;

app.get('/', (req: Request, res: Response) => {
  res.send(
    {
    message: 'Express + TypeScript Server'
    }
    );
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});