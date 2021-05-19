import express, { Request, Response } from 'express';

const app = express();

import morgan from 'morgan';

app.set("port", process.env.PORT || 3000);

app.use(morgan("dev"))

app.get("/", (req: Request, res: Response) => {
    return res.send("Welcome To My Flutter App API")
})

app.listen(app.get("port"), () => {
    console.log(`http://localhost:${app.get("port")}`);
})