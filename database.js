import { MongoClient, ObjectId } from 'mongodb';
import dotenv from 'dotenv';







dotenv.config();

const uri = `mongodb://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_HOST}:${process.env.MONGODB_PORT}`;

export default class Database {
    constructor() {
        this.client = new MongoClient(uri);
    }

    async collection(collection) {
        return this.client.db(process.env.MONGODB_DATABASE).collection(collection);
    }

    async findById(id) {
        const collection = await this.collection('movies');
        return collection.findOne({ _id: new ObjectId(id) });

    }

    async findBy(filter) {
        const collection = await this.collection('movies');
        return collection.findOne(filter);
    }

    async all() {
        const collection = await this.collection('movies');
        return collection.find().toArray();
    }

    async create(payload) {
        const collection = await this.collection('movies');
        return collection.insertOne(payload);
    }

    async update(filter, updatePayload) {
        const collection = await this.collection('movies');
        return collection.updateOne(filter, updatePayload);
    }

    async delete(filter) {
        const collection = await this.collection('movies');
        return collection.deleteOne(filter);
    }
}
