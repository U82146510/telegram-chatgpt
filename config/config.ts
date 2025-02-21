import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();


const atlas_mongodb = process.env.atlas_mongodb;


if(!atlas_mongodb ){
    throw new Error('connection string is missing');
}

export const connect_to_mongo = ()=>{
    try {
        const first_db = mongoose.connect(atlas_mongodb);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};


const db = mongoose.connection;

db.on('error',(error:unknown)=>{
    console.error(error);
});

db.on('connected',()=>{
    console.log('firs_db connected');
});

