import jwt from 'jsonwebtoken';
import { createError } from './error.js';

export const verifyToken = (req, res, next) => {
    const token = req.cookies['access token'];
    if (!token) { return next(createError(401, "You are not authenticated!"));}
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) { return next(createError(403, "Invalid Token!"));}
        req.user = user;
        next();
    });
}

export const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, next, () => {
        if(req.user.role == "admin") {
            next();
        } else {
            return next(createError(403, "You are not allowed to perform this action!"));
        }
    });
}

export const verifyUser = (req, res, next) => {
    verifyToken(req, res, next,  () => {
        if(req.user.id === req.params.id || req.user.role == "admin") {
            next();
        } else {
            return next(createError(403, "You are not allowed to perform this action!"));
        }
    });
}