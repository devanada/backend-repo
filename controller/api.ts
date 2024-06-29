import { doc, getDoc, updateDoc } from "firebase/firestore";
import { Request, Response } from "express";

import { userSchema } from "../utils/types/user";
import { firebaseDB } from "../config/firebase";
import ApiError from "../utils/api-error";
import zParse from "../utils/z-parse";

export const fetchUserData = async (req: Request, res: Response) => {
  try {
    const docRef = await getDoc(
      doc(firebaseDB, "users", req.cookies.user_session)
    );

    return res.status(200).json({
      message: "User found",
      data: docRef.data(),
    });
  } catch (err) {
    if (err instanceof ApiError) {
      res.status(err.statusCode).json({ message: err.message });
    } else {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
  }
};

export const updateUserData = async (req: Request, res: Response) => {
  try {
    const body = await zParse(userSchema, req);

    await updateDoc(doc(firebaseDB, "users", req.cookies.user_session), {
      displayName: body.displayName,
      phoneNumber: body.phoneNumber,
    });

    return res.status(200).json({
      message: "Update user successfully",
      data: body,
    });
  } catch (err) {
    if (err instanceof ApiError) {
      res.status(err.statusCode).json({ message: err.message });
    } else {
      res.status(500).json({ message: "Internal server error" });
    }
  }
};
