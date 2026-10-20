//import { GoogleGenAi } from "@google/genai"; Yet to replace
import { render } from "../../server/src/services/noteRender.js";
import { availability, createSession, handleSubmit } from "../../server/src/services/noteService.js";

const outputEl = document.getElementById("output");
const initBtn = document.getElementById("initBtn");
const startBtn = document.getElementById("startBtn");
const pmt = document.getElementById("promptBox");

const noteBtn = document.getElementById("noteBtn");
const nb = document.getElementById("notes");

function initHistory() {

    userData = JSON.parse(localStorage.getItem("userData")) || {
        Topics: [],
        UserNotes: [],
        JN: []
    };

    const sideNav = document.getElementById("mySidenav");
    const sideBottom = document.getElementById("appIcon");

    const start = Math.max(0, userData.Topics.length - 5);

    for (let i = start; i < userData.Topics.length; i++) {
        const link = document.createElement("a");
        link.href = "javascript:void(0)";
        link.textContent = userData.Topics[i];
        link.onclick = () => navHistory(i);
        sideNav.appendChild(link);
    }
    if (userData.Topics.length > 5) {
        userData.Topics.splice(0, userData.Topics.length - 5);
        userData.UserNotes.splice(0, userData.UserNotes.length - 5);
        userData.JN.splice(0, userData.JN.length - 5);
    }

    // Restore saved note text if you have a noteBox
    if (typeof nb !== "undefined" && nb !== null) {
        nb.value = userData.UserNotes || "";
    }

    console.log("History restored:", userData);
}


init = false;
userTopics = [];
let session = null;
let jotNotes = null;
let userData = JSON.parse(localStorage.getItem("userData")) || {
    Topics: [],
    UserNotes: [],
    JN: []
};

initBtn.addEventListener("click", async () => {
    const a = await availability();
    outputEl.textContent = "Prompt API available. Creating session..."
    // Create session with output language
    init = createSession(a);
    if (init) {
        outputEl.textContent = "Session Created! \nWrite down topics you want to explore :)";
        initBtn.style.display = "none";
        pmt.placeholder = "Your topic goes here :)";
        return;
    }
})



function navHistory(index) {
    console.log("clicked", index);
    console.log("rendered:", render(userData.JN[index]));
    outputEl.innerHTML = `<ul>${render(userData.JN[index])}</ul>`;
    nb.innerHTML = userData.UserNotes[index];
}

startBtn.addEventListener("click", handleSubmit);

pmt.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        e.preventDefault(); // Prevent form submission if inside a form
        handleSubmit();
    }
});

noteBtn.addEventListener("click", () => {
    // Show the notebox with initial text
    if (nb.style.display == "flex") {
        noteBtn.innerHTML = "Open Notes";
        nb.style.display = "none";
        return;
    }
    else {
        nb.style.display = "flex";
        noteBtn.innerHTML = "Save Notes and Close";
        noteBtn.onclick = () => {
            userData.UserNotes.push(nb.innerHTML);
        }
        if (nb.value === "") {
            nb.value = "Type your notes here...";
            nb.style.color = "#aaa"; // grey for placeholder effect
        }
    }

});



window.addEventListener("load", initHistory);

nb.addEventListener("focus", () => {
    if (nb.value === "Type your notes here...") {
        nb.value = "";
        nb.style.color = "#fff"; // normal text color
    }
});

pmt.addEventListener("focus", () => {
    if (pmt.value === "Provide your prompt here...") {
        pmt.value = "";
        pmt.style.color = "#fff";
    }
})