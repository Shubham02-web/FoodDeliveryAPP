import UserModel from "../models/UserModels.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";
import userModel from "../models/UserModels.js";

// creating Token
const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET_KEY);
};

// login User
const loginUser = async(req, res) => {
    const { email, password } = req.body;
    if (!email)
        return res.json({ success: false, message: "Please Enter email " });
    if (!password)
        return res.json({ success: false, message: "please enter password" });
    try {
        const user = await userModel.findOne({ email });
        if (!user)
            return res.status(404).json({
                success: false,
                message: "user not found for these email",
            });
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch)
            return res.status(401).json({
                success: false,
                message: "Wrong Password",
            });
        const token = createToken(user._id);
        return res.status(200).json({
            success: true,
            user,
            token,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error in Login API",
        });
    }
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