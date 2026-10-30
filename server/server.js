import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";
import noteRouter from "./src/routes/GenerateNote.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
app.use(express.json());
app.use("/api", noteRouter);
app.use(express.static(path.join(__dirname, "../client")));
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/pages/index.html"));
})
app.listen(3000, () => {
    console.log("Server running on port 3000");
});