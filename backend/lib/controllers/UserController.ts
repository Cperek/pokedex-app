import User from "../models/User";
import { Request, Response } from 'express';
import { get_record } from '../database';
export default class UserController {
    private user: User;

    constructor() {
        this.user = new User();
    }

    async validate_and_register_user(req: Request, res: Response) {

        const userData: { 
             username: string;
             password: string;
             repassword: string 
        } = req.body;
        
        // Validate user data
        if (!userData.username || !userData.password || !userData.repassword) {
            res.status(403).send({
                error: "All input fields are requiered!"
            });
            return;
        }

        if(userData.password !== userData.repassword)
        {
            res.status(403).send({
                error: "Passwords don't match"
            });
            return;
        }

        
        
        const userExist = await get_record(
            'users', //table
            {username:userData.username, deleted: 0 }, //where
            {_id: 0, username: 1}) //select
            .then()
            {
                if(userExist !== null)
                {
                    res.status(403).send({
                        error: "Account already exists!"
                    });
                    return;
                }

                //Setting data for User.ts
                this.user.username = userData.username;
                this.user.password = userData.password;

                try{
                    await this.user.create().then()
                    {
                        res.send(JSON.stringify(this.user)) 
                    }

                } catch(err)
                {
                    res.status(500).send({
                        error: "Database connection failed!"
                    });
                }
            }

 
     
    }
}


