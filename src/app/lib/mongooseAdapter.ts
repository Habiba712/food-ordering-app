
import { MongoClient } from "mongodb";

const uri = process.env.DATABASE_URL;
const options = {};

let client;
let clientPromise;

if (!process.env.DATABASE_URL) {
  throw new Error("Please define the DATABASE_URL environment variable");
}

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;
