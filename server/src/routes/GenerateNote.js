import express from "express";
import { generateNote } from "../services/noteService.js";

const router = express.Router();

router.get("/generate", (req, res) => {
    const { prompt } = req.body();

    const notes = generateNote(prompt);

    console.log(result);

    res.json({ result });
});

export default router;