import { ObjectId } from "mongodb";
import { insert_record, now } from '../database';

const table = "users";
export default class User {

   
    public id?: ObjectId;
    public username?: string;
    public password?: string;
    public repassword?: string;
    public deleted?: number;
    public created_at?: number;
    public updated_at?: number;
    public deleted_at?: number; 

    constructor() {}

    create = async () => {  

         await insert_record(table, {
            username: this.username,
            password: this.password,
            deleted: this.deleted ? this.deleted : 0,
            created_at: this.created_at ? this.created_at : now()
        })
  
    }
}