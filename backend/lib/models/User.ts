import { ObjectId } from "mongodb";
import { insert_record, now } from '../database';
import bcrypt from "bcrypt";
import { string } from "joi";

const table = "users";
const saltRounds = 10;
export default class User {

   
    public id?: ObjectId;
    public username?: string;
    public password?: string;
    public repassword?: string;
    public deleted?: number;
    public created_at?: number;
    public updated_at?: number;
    public deleted_at?: number; 
    public token?: string;
    

    constructor() {}

    create = async () => {  

        if(typeof this.password === 'string')
        {

        const hashedPassword = await bcrypt.hash(this.password, saltRounds)

        await insert_record(table, {
            username: this.username,
            password: hashedPassword,
            deleted: this.deleted ? this.deleted : 0,
            created_at: this.created_at ? this.created_at : now()
        })

        }else
        {
            throw new Error("Password has to be string!");
        }
    }
    
    unhash = async (Text: string, Hash: string): Promise<boolean> =>
    {
        let result = false;
        result = await bcrypt.compare(Text, Hash);
        return result;
    }

}
