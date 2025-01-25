import UserModel from "../models/UserModels.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";
import userModel from "../models/UserModels.js";

// login User
const loginUser = async(req, res) => {};

// creating Token
const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET_KEY);
};

// Register User
const registerUser = async(req, res) => {
    const { name, password, email } = req.body;
    if (!name || !password || !email)
        return res
            .status(401)
            .json({ success: false, message: "Please Enter all the field" });
    try {
        const exists = await UserModel.findOne({ email });
        if (exists)
            return res.status(401).json({
                success: false,
                message: "User allready exists",
            });
        if (!validator.isEmail(email))
            return res.status(401).json({
                success: false,
                message: "Please Enter a valid email",
            });
        if (password.length < 8)
            return res.status(401).json({
                success: false,
                message: "please enter a strong password",
            });
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(password, salt);
        const newUser = await new userModel({
            name: name,
            password: hashedPass,
            email: email,
        });

        const user = await newUser.save();
        const token = createToken(user._id);
        res.status(200).json({
            success: true,
            token,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error in register UPI",
        });
    }
};

export { loginUser, registerUser };