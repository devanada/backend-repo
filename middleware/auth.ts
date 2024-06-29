import { Request, Response, NextFunction } from "express";

function checkUserSession(req: Request, res: Response, next: NextFunction) {
  const user_session = req.cookies.user_session;

  if (!req.cookies || !user_session) {
    return res
      .status(401)
      .json({ message: "Unauthorized: Missing user session cookie" });
  }

  return next();
}

export default checkUserSession;
