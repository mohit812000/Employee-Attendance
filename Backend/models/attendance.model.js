import mongoose from "mongoose";

const Schema = mongoose.Schema;

const attendanceSchema = new Schema({
    userID:{
        type: Schema.Types.ObjectId,
        default:null

    },
    
    date:{
        type: String,
        default:null
    },

    signIn:{
        type:String,
        default:null
    },
    
    signOut:{
        type:String,
        default:null
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

export default mongoose.model("attendance", attendanceSchema)