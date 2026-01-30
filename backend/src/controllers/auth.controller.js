import users from "../models/users.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const register = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        const userExists = await users.findOne({ email });

        if (userExists) {
            return res.status(400).json({
                message: "User already exists!"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await users.create({
            name,
            email,
            password: hashedPassword
        });
        res.status(201).json({
            success: true,
            message: "User created successfully"
        });
    }
    catch (err) {
        next(err);
    }
}

export const login = async (req, res, next) => {
    try {

        const { email, password } = req.body;

        const user = await users.findOne({ email });

        if (!user) {
            return res.status(401).json({
                message: "Invalid creds"
            });
        }

        const isMatched = await bcrypt.compare(password,user.password);

        if (!isMatched) {
            return res.status(401).json({
                message: "Invalid creds"
            });
        }

        const token = await jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN }
        );

        res.status(201).json({
            success: true,
            token
        });
    }
    catch (error) {
        next(error);
    }
}