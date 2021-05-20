import { Request, Response } from "express";
import User from "../database/models/User";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

class AuthController {
    async register(req: Request, res: Response) {
        try {
            const { username, password } = req.body;

            const isUsed = await User.findOne({
                username,
            }).exec();

            if (isUsed) {
                return res.json({
                    res: 101
                })
            }

            const user = await User.create({
                username,
                password
            });

            const token = jwt.sign({id: user._id}, "secret", {
                expiresIn: 60 * 60 * 24
            });

            return res.json({
                res: 100,
                token: token,
                auth: true
            })
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                res: 99,
                err: error
            })
        }
    }

    async login(req: Request, res: Response) {
        try {
            const { username, password } = req.body;

            const user = await User.findOne({
                username,
            }).exec();

            if (user["username"] != username) {
                return res.json({
                    res: 101
                })
            }

            const verify = await bcrypt.compare(password, user["password"]);

            if (!verify) {
                return res.json({
                    res: 102
                })
            }

            const token = jwt.sign({id: user._id}, "secret", {
                expiresIn: 60 * 60 * 24
            });

            return res.json({
                res: 100,
                token: token,
                auth: true
            })
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                res: 99,
                err: error
            })
        }
    }
}

export default new AuthController();