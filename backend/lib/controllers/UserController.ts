import User from "../models/User";
import { Request, Response } from 'express';
import { get_record } from '../database';
import Joi, { array, object } from 'joi';
import { error } from "console";

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


        const schema = Joi.object({
            username: Joi.string()
                .alphanum()
                .min(3)
                .max(30)
                .required()
                .messages({
                    'string.base': `The username should be a type of text`,
                    'string.empty': `The username cannot be an empty field`,
                    'string.min': `The username should have a minimum length of {#limit}`,
                    'any.required': `The username is a required field`,
                    'string.alphanum': `The must only contain alpha-numeric characters`,
                  }),
        
            password: Joi.string()
                .pattern(new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$'))
                .min(8)
                .max(30)
                .required()
                .messages({
                    'string.base': `The password should be a type of text`,
                    'string.empty': `The password cannot be an empty field`,
                    'string.min': `The password should have a minimum length of {#limit}`,
                    'any.required': `The password is a required field`,
                    'string.pattern.base': `A password have to contain at least eight characters,
                    including at least one number and both lower and uppercase letters and one special characters`
                  })
        })
        
        try {
            const validation = await schema.validateAsync({ username: userData.username, password: userData.password });
        }
        catch (err) { 
            
            let message = 'Unknown Error'
            if (Joi.isError(err))
            {
                console.log(err)
                message = err.message
            } 

            res.status(403).send({
                error: message
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


