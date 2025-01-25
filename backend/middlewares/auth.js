import jwt from "jsonwebtoken";

const authMiddleware = async(req, res, next) => {
    const { token } = req.headers;
    if (!token) {
        return res
            .status(401)
            .json({ success: false, message: "Not Authorized Login Again" });
    }
    try {
        const token_decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.body.userId = token_decode.id;
        next();
    } catch (error) {
        console.log(error);
        res.status(400).json({
            success: false,
            message: "error in user auth token",
        });
    }
};
export default authMiddleware;