const User = require('../models/User.js');
const jwt = require('jsonwebtoken');

const createToken = (id) => {
    return jwt.sign({_id: id}, process.env.SECRET, { expiresIn: '3d'});
}

//login user
const loginUser = async (req, res) => {
    res.json({msg: 'login user'});
};

//signup user
const signupUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.signup(email, password);

        //create a token
        const token = createToken(user._id);

        res.status(200).json({email, token});
    }catch(err) {
        res.status(400).json({error: err.message});
    }
};

module.exports = { loginUser, signupUser }