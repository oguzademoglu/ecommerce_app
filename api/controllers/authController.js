import User from '../models/User.js';
import { comparePassword, hashPassword } from '../helpers/authHelper.js';
import { createError } from '../utils/error.js';
import jwt from 'jsonwebtoken';

export const register = async (req, res, next) => {
    const hash = await hashPassword(req.body.password);
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: hash,
    });
    try {
        const existingUser = await User.findOne({email: req.body.email});
        if (existingUser) {
            return res.status(400).json({message: "Email already exists!"});
        }
        const savedUser = await newUser.save();
        res.status(200).json(savedUser);
    } catch (error) {
        next(error);
    }
}

export const login = async (req, res, next) => {
    try {
        const user = await User.findOne({email: req.body.email});
        if (!user) { return res.status(400).json({message: "Email is not registered!"});}
        const comparedPassword = await comparePassword(req.body.password, user.password);
        if (!comparedPassword) { next(createError(400, "Password is incorrect!"));}

        const token = jwt.sign({id: user._id, user: user.role}, process.env.JWT_SECRET, {expiresIn: '1d'});

        const { password, role, ...otherDetails } = user._doc;
        res.cookie('access token', token, {
            httpOnly: true, // client side cannot access the cookie 
        }).status(200).json({...otherDetails});
    } catch (error) {
        next(error);
    }
    
}

export const logout = async (req, res, next) => {
    try {
        res.clearCookie('access token').status(200).json({message: "Logged out!"});
    } catch (error) {
        next(error);
    }
}