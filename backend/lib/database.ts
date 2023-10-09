
import { mc } from '..';



export async function insert_record(table: string, data: object): Promise<string> {
  try {
      const db = mc.db();
      const collection = db.collection(table);
      await collection.insertOne(data);
      return "Record added to the database";
  } catch (error) {
      throw error;
  } finally {
      await mc.close();
  }
}

export function now(): number {
  return Math.floor(new Date().getTime() / 1000);
}