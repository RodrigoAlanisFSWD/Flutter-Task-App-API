import { Request, Response } from "express";
import Category from "../database/models/Category";
import Task from "../database/models/Task";
import User from "../database/models/User";

class TaskController {
    async create(req: Request, res: Response) {
        try {
            const { name } = req.body;

            const task = await Task.create({
                name,
                author: req["user"],
                category: req.params.category
            });

            const category = await Category.findById(req.params.category);
            category["tasks"].push(task._id);
            await category.save();

            const user = await User.findById(req["user"]);
            user["tasks"].push(task._id);
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

    async getAll(req: Request, res: Response) {
        try {
            const data = await Category.find({
                author: req["user"]
            }).populate('tasks')

            return res.status(500).json({
                res: 100,
                auth: true,
                data,
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                res: 99,
                err: error
            });
        }
    }

    async doneTask(req: Request, res: Response) {
        try {
            const task = await Task.findById(req.params.task);
            task["done"] = true;
            task.save();

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

    async deleteTask(req: Request, res: Response) {
        try {
            const task = await Task.deleteOne({
                "_id": req.params.task
            });

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

export default new TaskController();