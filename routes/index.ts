import express, { Request, Response, NextFunction } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import { fetchUserData, updateUserData } from "../controller/api";
import checkUserSession from "../middleware/auth";

const app = express();
const corsOptions = {
  origin: "*",
  methods: ["GET", "POST", "DELETE", "PUT"],
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  return res.status(200).json({
    message: "Welcome",
  });
});
app.get("/fetch-user-data", checkUserSession, fetchUserData);
app.put("/update-user-data", checkUserSession, updateUserData);

app.use((req: Request, res: Response, next: NextFunction) => {
  return res.status(404).json({
    message: "No such route exists",
  });
});

export default app;
