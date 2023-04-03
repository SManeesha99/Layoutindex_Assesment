const mongoose = require("mongoose");
const {Schema, model} = mongoose;
const Joi = require("joi");

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
    locationName:{
        type:String,
        required:true,
    },
    photo:{
        type:String,
        required:true,
    },
    status:{
        type:String,
        default:"active",
    },
});


const Device = mongoose.model("Device",deviceSchema);

const validateDevice = (data)=>{
    const schema = Joi.object({

        serialNo:Joi.string()
        .required(),

        type:Joi.string()
        .required(),

        locationName:Joi.string()
        .required(),

        photo:Joi.string()
        .required(),
        
        
    })
    return schema.validate(data);
}

const validateUpdateDevice = (data)=>{
    const schema = Joi.object({

        serialNo:Joi.string()
        .required(),

        type:Joi.string()
        .required(),

        locationName:Joi.string()
        .required(),

        photo:Joi.string()
        .required(),
        
        status:Joi.string()
        .required(),
        
    })
    return schema.validate(data);
}

module.exports = {Device,validateDevice,validateUpdateDevice};

