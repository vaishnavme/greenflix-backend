const { User } = require("../models/user.model");

const createNewUser = async(req, res) => {
    try {
        const user = req.body;
        const NewUser = new User(user);
        const createdUser = await NewUser.save();

        res.json({
            user: createdUser,
            success: true
        })
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: `unable to create user ERROR: ${err}`
        })
    }
}

const getUserLogin = async(req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({
            email: email,
            password: password
        }) 
        if(!user) {
            res.status(200).json({
                message: "Invalid emailID or password",
                success: false
            })
        } else {
            res.status(200).json({
                data: user,
                success: true
            })
        } 
    } 
    catch (err) {
        res.status(500).json({
            message: "some error occured",
            message: false
        })
    }
}

module.exports = {
    createNewUser,
    getUserLogin
}