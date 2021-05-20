import { Response } from 'express';
import jwt from 'jsonwebtoken';

export default function(req: any, res: Response, next: Function) {
    const token = req.header("x-access-token");

    if (!token) {
        return res.json({
            res: 98,
            auth: false,
            msg: "Not Token Provided"
        });
    }

    const verify: any = jwt.verify(token, "secret");

    if (!verify || !verify.id) {
        return res.json({
            res: 98,
            auth: false,
            msg: "Invalid Token"
        });
    }

    req.user = verify.id;

    next();
}