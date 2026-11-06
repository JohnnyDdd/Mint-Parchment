const outputEl = document.getElementById("output");
//const initBtn = document.getElementById("initBtn");
const startBtn = document.getElementById("startBtn");
const noteBtn = document.getElementById("noteBtn");
const nb = document.getElementById("notes");

startBtn.addEventListener("click", async () => {
    const input = document.getElementById("promptBox").value;

    const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ input })
    })
    const data = await response.json();

    if (!response.ok) {
        console.error("Generate failed:", data.error);
        return;
    }
    outputEl.textContent = data.notes;
})
