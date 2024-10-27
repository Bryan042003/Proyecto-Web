const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const {body,validationResult} = require('express-validator');

//Midleware to validate authentication data
const validateLogin = [
    body('email')
    .isEmail().withMessage('Invalid email'),
    body('password')
    .isString().withMessage('Password must be a string'),
    (req, res, next) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()});
        }
        next();
    }
]

const login = async (req, res) => {
    const {email, password} = req.body;

    try{
        
        const user = await User.findOne({where: {email}});
        if(!user){
            return res.status(400).json({message: 'Invalid email or password'});
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if(!validPassword){
            return res.status(400).json({message: 'Invalid email or password'});
        }

        const token = jwt.sign({id: user.id,email:user.email,role:user.role}, 
            process.env.JWT_SECRET_KEY, {expiresIn: '1h'});
        res.status(200).json({token});

    }catch(error){
        console.log(error);
        res.status(500).json({message: 'There was an error trying to log in'});
    }
};

module.exports = {
    validateLogin,
    login
}