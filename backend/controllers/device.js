const Device = require('../models/device');
const Location = require('../models/location');

const deviceController={

    //add device to the database
    addDevice: async (req, res)=>{
        try{

            const {serialNo, type, location, photo, status, locationId } = req.body;
            //check if the serial number is already in the database
            const existingDevice = await Device.findOne({serialNo:serialNo});
            const existingLocation = await Location.findOne({name:location});
            if(existingDevice)
                    return res.status(400).json({
                    msg:"Device already exists",
            });
            if(!existingLocation)
                    return res.status(400).json({
                    msg:"Location does not exist",
            });

            const newDevice = new Device({
                serialNo, 
                type, 
                location, 
                photo, 
                status,
            });

            await newDevice.save();

            if(res){
                res.json({
                    msg:"Device added successfully",
                    data: newDevice,
                });

                await Location.updateOne(
                    {_id:locationId},
                    {$push:{devices:type}}
                );
            }

        } catch(err){
            return res.status(500).json({message:err.message});
        }
    },

    //get all devices
    getAllDevices : async (req,res)=>{
        try{
            const devices = await Device.find();
            res.json({
                msg:"All devices",
                data: devices,
            });
        } catch(err){
            return res.status(500).json({message:err.message}); 
        }
    },

    //get device by id
    getDeviceById : async (req,res)=>{
        const id = req.params.id;
        try{
            const device = await Device.findOne({_id:id});
            res.json({
                msg:"Device found",
                data: device,
            });
        }catch(err){
            return res.status(500).json({message:err.message});
        }
    },

    //update device
    updateDevice : async (req,res)=>{
        try{

            const id = req.params.id;
            const {serialNo, type, location, photo, status} = req.body;

            const existingDevice =await Device.findOne({
                serialNo:serialNo,
            });
            const existingLocation = await Location.findOne({name:location});
            if(existingDevice)
                return res.status(400).json({
                    msg:"Device already exists",
            });
            if(!existingLocation)
                    return res.status(400).json({
                    msg:"Location does not exist",
            });

            await Device.findByIdAndUpdate(
                {_id:id},
                { type, location, photo, status},
            );

            res.json({
                msg:"Device updated successfully",
                data: {serialNo, type, location, photo, status},
            });


        } catch(err){
            return res.status(500).json({message:err.message});
        }
    },

    //delete device
    deleteDevice : async (req,res)=>{
        try{
            const id = req.params.id;
            await Device.findByIdAndDelete({_id:id});
            res.json({
                msg:"Device deleted successfully",
            });
        } catch(err){
            return res.status(500).json({message:err.message});
        }
    },


};

module.exports = deviceController;