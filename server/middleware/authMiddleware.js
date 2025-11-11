import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const verifyUser = async (req, res, next) => {
    try {
        // Check that Authorization header exists
        const authHeader = req.headers && (req.headers.authorization || req.headers.Authorization);
        if (!authHeader) {
            return res.status(401).json({ success: false, error: "Authorization header missing" });
        }

        const parts = authHeader.split(" ");
        if (parts.length !== 2 || parts[0] !== 'Bearer') {
            return res.status(401).json({ success: false, error: "Malformed authorization header" });
        }

        const token = parts[1];
        if (!token) {
            return res.status(401).json({ success: false, error: "No token provided" });
        }

        const decoded = jwt.verify(token, process.env.JWT_KEY);
        if (!decoded) {
            return res.status(401).json({ success: false, error: "Invalid token" });
        }

        const user = await User.findById({ _id: decoded._id }).select("-password");
        if (!user) {
            return res.status(404).json({ success: false, error: "User not found" });
        }

        req.user = user;
        return next();
    } catch (error) {
        // Log actual error for debugging and return a clearer message
        console.error('authMiddleware error:', error && error.message ? error.message : error);
        return res.status(500).json({ success: false, error: "Authentication Server Error" });
    }
}

export default verifyUser;