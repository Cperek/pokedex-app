import User from "../models/User";
import { Request, Response } from 'express';
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
        }

        this.user.username = userData.username;
        this.user.password = userData.password;
        
       
        try {
            await this.user.create().then()
            {
                res.send(JSON.stringify(this.user))
            }   

        } catch (error) {

            // res.status(500).send({
            //     error: "Error occured while adding account to database"
            // });

        }
    }
}


