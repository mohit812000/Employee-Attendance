import jwt from 'jsonwebtoken';
import userModel from '../models/user.model';
 

const authMiddleware = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        if (!token) {
            return res.status(401).json({ message: "Access Denied. No token provided." });
        }

        const decoded = jwt.verify(token, process.env.TOKEN_SECRET_KEY);
        const user = await userModel.findById(decoded._id);
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        req.existUser = user; // Attach user to request
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        return res.status(400).json({ message: "Invalid token." });
    }
};

export default authMiddleware;
