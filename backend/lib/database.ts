
import { uri , database } from '..';
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

export function now(): number {
  return Math.floor(new Date().getTime() / 1000);
}