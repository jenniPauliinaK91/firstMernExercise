const mongoose=require('mongoose')

const UserSchema = new mongoose.Schema({
    firstname:{
        type:String, required:true,
    },
    lastname:{
        type:String, required:true,
    },
    email:{
        type:String, required:true,
    },
    age:{
        type:Number ,required:true,
    },
    password:{
        type:String, required:true,
    },
    joindate:{
        type:Date,
        default:Date.now,
    },
    registrations:[{kisaId:{type:String}, regDate:{type:Date, default:Date.now}}]
},{collection:'users'})

const User=mongoose.model('User', UserSchema)
module.exports=User