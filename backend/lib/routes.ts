import express, { Express, Request, Response } from 'express';
import User from '../models/User';

module.exports = (app :Express) => {
  
    app.post('/register', (req: Request, res: Response) => {
    
        const result = new User(
        undefined,
        `${req.body.username}`,
        `${req.body.password}`,
        `${req.body.repassword}`  
        ).create();

        
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
}

