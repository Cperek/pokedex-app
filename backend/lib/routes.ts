import express, { Express, Request, Response } from 'express';
import UserController from './controllers/UserController';

module.exports = (app :Express) => {
  
    app.post('/register', async (req: Request, res: Response) => {
    
        const controller = new UserController();
        await controller.validate_and_register_user(req,res);
    });
    
    app.post('/login', async (req: Request, res: Response) => {
            const controller = new UserController();
            await controller.log_in(req,res);
    });
}

