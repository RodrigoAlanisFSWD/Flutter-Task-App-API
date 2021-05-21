import { Request, Response } from "express";
import Category from "../database/models/Category";
import User from "../database/models/User";

class CategoryController {
    async create(req: Request, res: Response) {
        try {
            const { name } = req.body;

            const category = await Category.create({
                name,
                author: req["user"]
            })

            const user = await User.findById(req["user"]);
            user["categories"].push(category._id);
            await user.save();

            return res.status(500).json({
                res: 100,
                auth: true,
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                res: 99,
                err: error
            });
        }
    }
}

export default new CategoryController()