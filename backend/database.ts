
import {mc} from "./index";
export default({
    methods: {
       insert_record,
    }
});


//db functions
async function insert_record(table: string,data: object) {
    try {
      const db = mc.db();
      const collection = db.collection(table);
      const result = await collection.insertOne(data);
      return result;
    }catch(error)
    {
      console.error(error)
    }
     finally {
      await mc.close();
    } 
  }