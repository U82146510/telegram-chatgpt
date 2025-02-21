import mongoose, { Schema,type Document,model } from "mongoose";


export interface IUser extends Document{
    name:number;
    logs:mongoose.Types.ObjectId[];
};

interface ILogs extends Document{
    log:string;
}

const logs_schema = new Schema<ILogs>({
    log: { type: String}
});

const user_schema = new Schema<IUser>({
    name:{type:Number,required:true,unique:true},
    logs: [{ type: Schema.Types.ObjectId, ref: 'Log',default:[] }]
});

export const primary_db = model<IUser>("User",user_schema);
export const logs = model<ILogs>("Log",logs_schema);