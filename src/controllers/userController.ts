import { Request, Response } from "express";
import User from "../database/models/User";
import path from "path";

class UserController {
    async uploadAvatar(req: Request, res: Response) {
        try {
            const user = await User.findOne({
                _id: req["user"]
            }).exec();

            const file: any = req.files.file;

            user["avatar"] = file.name;

            await file.mv(path.join(__dirname, "../../uploads/" + file.name));

            await user.save();

            return res.json({
                res: 100,
                auth: true,
                msg: "Uploaded"
            })
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                res: 99,
                err: error
            });
        }
    }
}

export default new UserController();