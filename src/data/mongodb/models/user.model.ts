
import mongoose ,{Schema} from "mongoose";


const userSchema = new Schema({
    name:{
        type:String,
        required:[true,"name is required"]
    },

    email:{
        type:String,
        required:[true,"email is required"],
        unique:true
    },

    password:{
        type:String,
        required:[true,"password is required"]
    }
    ,

    img:{
        type:String,
    },
    roles:{
        type:[String],
        default:['user_rol'],
        enum:["user_rol","admin"]
    }
})

export const UserModel = mongoose.model("User",userSchema)