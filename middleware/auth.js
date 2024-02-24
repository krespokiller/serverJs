import jwt from 'jsonwebtoken'
import prisma from '../prisma/db.js'

export const verifyToken = async (req,res,next) => {
    const authorization = req.headers['authorization'];
    const token = authorization.split(" ")[1];
    if (!token) {
        return res.status(403).send({ auth: false, message: 'No token provided.' });
    }
    jwt.verify(token, process.env.SECRET_KEY, async (err, decoded) => {
        if (err) {
        return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
        }
        req.user = await prisma.user.findUnique({
            where:{
                email:decoded.email
            }
        })
        next();
    });
}

export const isAdmin = (user) => user.role=="ADMIN"
