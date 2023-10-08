
import { mc } from '..';
export default({
    methods: {
       insert_record,
    }
});

//db functions
async function insert_record(table: string,data: object) {
    var status;
    try {
      const db = mc.db();
      const collection = db.collection(table);
      await collection.insertOne(data);
      status = "Record added to the database";
    }catch(error)
    {
      status = error
    }
     finally {
      await mc.close();
    } 
    return status;
  }