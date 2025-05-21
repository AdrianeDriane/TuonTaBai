import { Request, Response } from "express";
import User from "../models/User";

export const getData = async (req: Request, res: Response) => {
  res.json({ message: "Hello from TuonTaBai API!" });
};

export const addUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const newUser = new User({ email, password });
    await newUser.save();
    res.status(201).json({ message: "User added successfully!" });
  } catch (error) {
    console.error("Error adding user:", error);
    res.status(500).json({ error: "Failed to add user" });
  }
};

export const getAllUsers = async (_req: Request, res: Response) => {
  try {
    const users = await User.find().select("email _id");
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
};
