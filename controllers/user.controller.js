const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secret = process.env.SECRET_KEY;
const { User } = require('../models/user.model');

const createNewUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const alreadyExistUser = await User.findOne({ email: email });

        if (alreadyExistUser)
            return res.json({
                success: false,
                message: 'Email id already exist, Try login'
            });

        try {
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = new User({ name, email, password: hashedPassword });
            const savedUser = await newUser.save();

            const token = jwt.sign({ userId: savedUser._id }, secret);
            res.json({
                success: true,
                user: {
                    _id: savedUser._id,
                    name: savedUser.name,
                    email: savedUser.email
                },
                token,
                message: 'Account created successfully!'
            });
        } catch (err) {
            res.json({
                success: false,
                message: 'Something went wrong!'
            });
        }
    } catch (err) {
        res.status(500).json({
            success: false,
            message: `unable to create user ERROR: ${err}`
        });
    }
};

const getUserLogin = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });

    if (user) {
        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (isPasswordCorrect) {
            const token = jwt.sign({ userId: user._id }, secret);
            return res.json({
                success: true,
                user: { _id: user._id, name: user.name, email: user.email },
                token,
                message: 'Login Successfully!'
            });
        }
        return res.json({
            success: false,
            user: null,
            message: 'Invalid passowrd!'
        });
    }
    return res.json({
        success: false,
        user: null,
        message: 'No user found with this email'
    });
};

module.exports = {
    createNewUser,
    getUserLogin
};
