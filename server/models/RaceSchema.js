const mongoose=require('mongoose')

const RaceSchema = new mongoose.Schema({
    name:{
        type:String, required:true,
    },
    organization:{
        type:String, required:true,
    },
    address:{
        type:String, required:true,
    },
    city:{
        type:String ,required:true,
    },
    zipcode:{
        type:Number ,required:true,
    },
    distance:{
        type:Number, required:true,
    },
    date:{
        type:Date,required:true
        
    },
    time: {
        type:String, required:true
    },
    owner:
    {
        type:String,
        required: true,
    },
    description:
    {type: String},
    isCancelled:{
        type:Boolean,
        default:false
    },
    url:{
        type:String,
        default:''
    }
},{collection:'races'})

const Race=mongoose.model('Race',RaceSchema)
module.exports=Race