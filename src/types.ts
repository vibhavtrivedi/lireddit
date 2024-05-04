import { Request, Response } from "express";
import { SessionOptions  } from "express-session";
interface CustomSession extends SessionOptions  {
  user?: { id: string, username: string }; // Adjust the structure according to your actual user data
}

export type MyContext = {
  req: Request & { session:  CustomSession };
  res: Response;
};