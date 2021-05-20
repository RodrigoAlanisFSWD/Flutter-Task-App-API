import express, { Request, Response } from 'express';

const app = express();

import morgan from 'morgan';
import Open from './database/mongo';

app.set("port", process.env.PORT || 3000);

app.use(morgan("dev"));
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
    return res.send("Welcome To My Flutter App API")
});

import AuthRouter from './routers/authRouter';

app.use("/api/auth", AuthRouter);

import UserRouter from './routers/userRouter';

app.use("/api/user", UserRouter);

app.listen(app.get("port"), () => {
    console.log(`http://localhost:${app.get("port")}`);
    Open()
})