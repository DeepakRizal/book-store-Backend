import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import bookRouter from "./routes/bookRoute.js";
import cors from "cors";

const app = express();

//middlewar for parsing reuest body
app.use(express.json());

//Allow all origins with default of cors
app.use(cors());
// app.use(
//   cors({
//     origin: "http://localhost:3000",
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: ["Content-Type"],
//   })
// );

dotenv.config({ path: ".env" });

app.get("/", (req, res) => {
  return res.status(234).send("Welcome to MERN stack Tutorial");
});

app.use("/books", bookRouter);

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("connected to DB!");
    app.listen(process.env.PORT, () => {
      console.log(`App is listening to port: ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log(error.message);
  });
