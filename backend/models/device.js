import mongoose from "mongoose";
const {Schema, model} = mongoose;

const deviceSchema = new Schema({
    serialNo:{
        type:String,
        required:true,
        unique:true,
    },
    type:{
        type:String,
        enum:['pos','kiosk','signage'],
        required:true,
    },
    location:{
        type:String,
        required:true,
    },
    photo:{
        type:String,
        // required:true,
    },
    status:{
        type:String,
        enum:['active','inactive'],
        default:'active',
    },
});

export default model("Device",deviceSchema);