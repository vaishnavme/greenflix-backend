const { Video } = require("../models/video.models");
const { User } = require("../models/user.model");

const getVideoById = async(req, res, next, ID) => {
    try {
        const video = await Video.findById(ID);
        if(!video) {
            return res.status(400).json({
                success: false,
                message: "error getting video details"
            })
        }
        req.video = video;
        next();
    } catch(err) {
        res.json({
            success: false,
            message: "cannot fetch product"
        })
    }
}

const getUserById = async(req, res, next,id) =>{
    try{
        const user = await User.findById(id)
        if(!user){
            throw Error("No such user found");
        }
        req.user = user;
        next()
    } catch(err) {
        res.status(503).json({ 
            success:false, 
            error: "error occured"
        })
    }
}

module.exports = {
    getVideoById,
    getUserById
}