import { MongoClient, MongoClientOptions } from 'mongodb';

const uri: string = process.env.MONGODB_URI as string;
const options: MongoClientOptions = {};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (!process.env.MONGODB_URI) {
  throw new Error('Please add your Mongo URI to .env.local');
}

declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

if (typeof window === 'undefined') {
  if (process.env.NODE_ENV === 'development') {
    if (!globalThis._mongoClientPromise) {
      client = new MongoClient(uri, options);
      globalThis._mongoClientPromise = client
        .connect()
        .then((connectedClient) => {
          console.log('Connected to MongoDB successfully');
          return connectedClient;
        })
        .catch((err) => {
          console.error('Failed to connect to MongoDB:', err);
          process.exit(1);
        });
    }
    clientPromise = globalThis._mongoClientPromise;
  } else {
    client = new MongoClient(uri, options);
    clientPromise = client
      .connect()
      .then((connectedClient) => {
        console.log('Connected to MongoDB successfully');
        return connectedClient;
      })
      .catch((err) => {
        console.error('Failed to connect to MongoDB:', err);
        process.exit(1);
      });
  }
} else {
  clientPromise = Promise.reject(
    new Error('MongoDB can only be initialized on the server side.')
  );
}

export default clientPromise;
