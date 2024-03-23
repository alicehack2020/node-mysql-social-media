import { db } from "../connect.js";

export const getUser = (req, res) => {};
export const getUserList = (req, res) => {
  const q = "SELECT * FROM users";
  db.query(q, (err, result) => {
    if (err) {
      res.status(500).json({ message: err.message });
      return;
    }
    if (result.length === 0) {
      res.status(404).json({ message: "No user found" });
      return;
    }
    if (result.length > 0) {
      res.status(200).json(result);
    }
  });
};
