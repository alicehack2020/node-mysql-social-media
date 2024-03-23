import mysql from "mysql";
import dotenv from "dotenv";
dotenv.config();
const host = process.env.host;
const user = process.env.user;
const password = process.env.password;
const database = process.env.database;

export const db = mysql.createConnection({
  host: host,
  user: user,
  password: password,
  database: database,
});

db.connect(function (err) {
  if (err) throw err;
  console.log("Database Connected!");
});
