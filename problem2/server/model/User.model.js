import mongoose from "mongoose";

export const UserSchema = new mongoose.Schema({
    username:{
        type:String,
        required:[true,"Please provide an unique name"],
        unique:[true,"Username exist"]
    },
    password:{
        type:String,
        required:[true,"Password is required"],
        unique: false
    },
    email:{
        type:String,
        required: [ true,"Please provide a email"],
        unique:true
    },
    firstName:{type:String},
    lastName:{type:String},
    mobile:{type:Number},
    address:{type:String},
    profile:{type:String},
})


export default mongoose.model.Users || mongoose.model('User', UserSchema);
