import express from "express"
import { loginRoute } from "./routes/loginRoute";
import cors from "cors"
import cookieParser from "cookie-parser"
import * as dotenv from 'dotenv';
import { notesRoute } from "./routes/notesRoute";
dotenv.config();

const frontendUrl = process.env.FRONTEND_URL;

const app = express();
app.use(express.json())
app.use(cookieParser())
app.use(cors({
  origin:"http://localhost:3000",
  credentials: true
}))

app.use("/user",loginRoute)
app.use("/notes",notesRoute)

const port =8080;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});


