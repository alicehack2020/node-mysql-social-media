import { db } from "../connect.js";
import bcrypt from "bcryptjs";
export const register = (req, res) => {
  //CHECK USER IF EXISTS
  const q = "SELECT * FROM users WHERE username=?";
  db.query(q, [req.body.username], (err, result) => {
    if (err) {
      res.status(500).json({ message: err.message });
      return;
    }
    if (result.length > 0) {
      res.status(400).json({ message: "User already exists" });
      return;
    }

    //CREATE A NEW USER
    const q =
      "INSERT INTO users(username,email,password,name) VALUES(? , ? , ? , ?)";

    const { username, email, password, name } = req.body;

    //HASH THE PASSWORD
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    db.query(q, [username, email, hashedPassword, name], (err, result) => {
      if (err) {
        res.status(500).json({ message: err.message });
        return;
      }
      res.status(201).json({ message: "User created" });
    });
  });
};
export const login = (req, res) => {};
export const logout = (req, res) => {};