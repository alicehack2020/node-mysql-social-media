import { db } from "../connect.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
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
export const login = (req, res) => {
  const q = "SELECT * FROM users WHERE username=?";
  const { username } = req.body;

  db.query(q, [username], (err, result) => {
    if (err) {
      res.status(500).json({ message: err.message });
      return;
    }
    if (result.length === 0) {
      res.status(400).json({ message: "User not found" });
      return;
    }

    const checkPassword = bcrypt.compareSync(
      req.body.password,
      result[0].password
    );
    if (!checkPassword) {
      res.status(400).json({ message: "Wrong password or username" });
      return;
    }

    const token = jwt.sign({ id: result[0].id }, "secreatekey");
    const { password, ...data } = result[0];

    res
      .cookie("accessToken", token, {
        httpOnly: true,
      })
      .status(200)
      .json(data);
  });
};
export const logout = (req, res) => {};
