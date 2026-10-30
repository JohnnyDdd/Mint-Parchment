import express from "express";
import { generateNote } from "../services/noteService.js";

const router = express.Router();

router.post("/generate", async (req, res) => {
    try {
        const { input } = req.body;

        const notes = await generateNote(input);

        console.log(notes);

        res.json({ notes });
    } catch (error) {
        console.error("GENERATION ERROR:", error);
        res.status(500).json({
            error: error.message
        });
    }
});

export default router;