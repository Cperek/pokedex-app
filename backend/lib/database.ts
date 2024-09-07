
import { uri , database} from '..';
import { MongoClient } from 'mongodb';



function Connect()
{
  const mc = new MongoClient(uri);
  return mc;
}

export async function insert_record(table: string, data: object): Promise<any> {

  let mc = Connect();

  try {
      const db = mc.db(database);
      const collection = db.collection(table);
      const result = await collection.insertOne(data);
  } 
  finally {
      await mc.close();
  }
}


export async function get_record(table: string, where: object,select?: object): Promise<any> {

  let mc = Connect();
  var result = null;
  try {
    const db = mc.db(database);
    const collection = db.collection(table);
     result = await collection.findOne(
      where, 
      {
        projection: select,
      }
    )
  } finally {
    await mc.close();
    return result;
  }
}

export function now(): number {
  return Math.floor(new Date().getTime() / 1000);
}

