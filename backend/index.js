import express, { request, response } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";
import booksRoute from "./routes/booksRoute.js";
import cors from "cors";

const app = express();

dotenv.config();

// Middleware for parsing request body
app.use(express.json());

// Middleware for handling CORS POLICY
app.use(cors());
// app.use(
//   cors({
//     origin: "https://localhost:3000",
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: ["Content-Type"],
//   })
// );

app.get("/", (request, response) => {
  console.log(request);
  return response.status(234).send("Welcome to MERN Stack Book Shop");
});

app.use("/books", booksRoute);

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("App connected to db");
    app.listen(process.env.PORT, () => {
      console.log(`App listening on port ${process.env.PORT}!`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
