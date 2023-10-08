import { ObjectId } from "mongodb";
import dbengine from '../lib/database';

export default class User {

    public db = dbengine.methods;
    public table = "users";

    constructor(
        public id?: ObjectId,
        public username?: string,
        public password?: string,
        public repassword?: string,
        public deleted?: number,
        public created_at?: number,
        public updated_at?: number,
        public deleted_at?: number    
        ) 
        {

        }

    public create = () => {  
    if(this.username && this.password)    
    { 
      this.db.insert_record(this.table,
        {
            username: this.username,
            password: this.password,
            deleted: this.deleted ? this.deleted : 0,
            created_at: this.created_at ? this.created_at : this.db.now()
        })  
        return 'User created succesfully!';
    }
    return 'Error occured!';
    }

        
}