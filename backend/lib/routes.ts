import express, { Express, Request, Response } from 'express';
import UserController from './controllers/UserController';

module.exports = (app :Express) => {
  
    app.post('/register', (req: Request, res: Response) => {
    
        const controller = new UserController();
        const result = controller.validate_and_register_user(req.body);
  
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

