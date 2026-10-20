export function render(jotNotes) {
    const lines = jotNotes.split("\n");
    let html = "";
    let inList = false;

    lines.forEach(line => {
        line = line.trim();
        if (!line) return; // skip empty lines

        // Headings
        if (line.startsWith("## ")) {
            if (inList) { html += "</ul>"; inList = false; }
            html += `<h3 style="margin-top:1em;color:#2c3e50;">${line.slice(3)}</h3>`;
        } else if (line.startsWith("# ")) {
            if (inList) { html += "</ul>"; inList = false; }
            html += `<h2 style="margin-top:1.2em;color:#1a1a1a;">${line.slice(2)}</h2>`;
        }
        // Bullets
        else if (line.startsWith("*") || line.startsWith("-")) {
            if (!inList) { html += "<ul style='margin-left:1.2em;'>"; inList = true; }
            // Inline code/formulas
            line = line.replace(/`([^`]+)`/g, "<code style='background:#f0f0f0;padding:2px 4px;border-radius:3px;'>$1</code>");
            // Bold
            line = line.replace(/\*\*(.*?)\*\*/g, "<b>$1</b>");
            // Italic
            line = line.replace(/\*(.*?)\*/g, "<i>$1</i>");
            html += `<li style="margin:0.3em 0;">${line.slice(1).trim()}</li>`;
        }
        // Plain paragraph
        else {
            if (inList) { html += "</ul>"; inList = false; }
            html += `<p style="margin:0.5em 0;">${line}</p>`;
        }
    });

    if (inList) html += "</ul>";

    return html;
}
