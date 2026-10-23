import express from "express";
import noteRouter from "./src/routes/GenerateNote.js";

const app = express();

app.use(express.json());

app.use("/api", noteRouter);

app.listen(3000, () => {
    console.log("Server running on port 3000");
});