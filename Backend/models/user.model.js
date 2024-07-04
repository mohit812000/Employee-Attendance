import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    
    email:{
        type:String,
        required:true
    },

    password:{
        type:String,
        required:true
    },

    contact:{
        type:Number,
        default:null
    },
    
    role:{
        type:Number,
        default:0

    },
    status:{
        type:Number,
        default:1
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }

}) 

export default mongoose.model("userSchema", userSchema)