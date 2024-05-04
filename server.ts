import express, { Express, Request, Response } from "express";
import cors from "cors";
import mysql from "mysql2";

const app: Express = express();
const port = 3001;

app.use(cors());
app.use(express.json());

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Hiroya14110919",
  database: "mydb",
});

// mysql接続
connection.connect((err) => {
  if (err) throw err;
  console.log("Connected");
});

app.get("/sql-data", (req: Request, res: Response) => {
  console.log("getリクエストを受け付けました。");
  const sql = "SELECT * FROM mydb.account";
  connection.query(sql, (error, result) => {
    if (error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(200).json({ account: result });
    }
  });
});

app.get("/login", (req: Request, res: Response) => {
  res.json({ message: "ログイン完了" });
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
