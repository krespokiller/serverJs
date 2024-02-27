import jwt from 'jsonwebtoken'
import { findUserByEmail } from '../services/index.js';

export const verifyToken = async (req,res,next) => {
    const authorization = req.headers['authorization'];
    const token = authorization?.split(" ")[1]||undefined;
    if (!token) {
        return res.status(403).send({ auth: false, message: 'No token provided.' });
    }
    jwt.verify(token, process.env.SECRET_KEY, async (err, decoded) => {
        if (err) {
        return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
        }
        req.user = await findUserByEmail(decoded.email)
        next();
    });
}

export const isAdmin = (user) => user.role=="ADMIN"
