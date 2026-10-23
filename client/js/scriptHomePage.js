//import { GoogleGenAi } from "@google/genai"; Yet to replace

import { response, text } from "express";

const outputEl = document.getElementById("output");
//const initBtn = document.getElementById("initBtn");
const startBtn = document.getElementById("startBtn");
const noteBtn = document.getElementById("noteBtn");
const nb = document.getElementById("notes");

startBtn.addEventListener("click", async () => {
    const pmt = document.getElementById("promptBox").innerHTML;

    const note = await fetch("http://localhost:3000/api/generate", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            input: pmt
        })
    })

    const data = await response.json();

    console.log(data.message);

})