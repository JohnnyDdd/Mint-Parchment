export function availability() {
    let a = LanguageModel.availability();
    if (a == "unavailable") { return a }
    a = LanguageModel.availability()
    return a
}

export function createSession(a) {
    if (a !== "available") {
        console.log("API is not ready yet");
        return false;
    }
    session = LanguageModel.create({
        initialPrompts: [
            {
                role: 'system',
                content: 'You are a knowledgable researcher',
            },
            {
                role: 'assistant',
                content: 'In a short jot note,search and give a list of key subtopics related to the topic that I want to explore. Use bullet points and single-colored text, short phrases only, include only short definitions. Ignore minor details and examples.',
            },
        ],
        expectedInputs: [
            { type: "text", languages: ["en"] }
        ],
        expectedOutputs: [
            { type: "text", languages: ["en"] }
        ]
    });
    return true
}

export function handleSubmit(reply) {
    userData.Topics.push(pmt.value);
    jotNotes = reply.content || reply;
    userData.JN.push(jotNotes);

    const formatted = render(jotNotes);
    outputEl.innerHTML = formatted;
    const chatHistory = document.createElement('a');
    chatHistory.href = "#";
    chatHistory.textContent = pmt.value;

    const sidenav = document.getElementById("mySidenav");
    const chatHead = document.getElementById("chatHeader");

    const index = userData.Topics.length - 1;
    chatHistory.onclick = () => navHistory(index);
    sidenav.insertBefore(chatHistory, chatHead.nextSibling);

    localStorage.setItem("userData", JSON.stringify(userData))
    console.log("Current userData:", userData);
}