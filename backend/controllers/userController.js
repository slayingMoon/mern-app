const User = require('../models/User.js');

//login user
const loginUser = async (req, res) => {
    res.json({msg: 'login user'});
};

//signup user
const signupUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.signup(email, password);

        res.status(200).json({email, user});
    }catch(err) {
        res.status(400).json({error: err.message});
    }
};

module.exports = { loginUser, signupUser }