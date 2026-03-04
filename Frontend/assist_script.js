let currentLang = "hi-IN";
let selectedVoice = null;
let lastClickTime = 0;

// Create popup dynamically
const voicePopup = document.createElement("div");
voicePopup.id = "voicePopup";
voicePopup.style.cssText = `
position:fixed; inset:0;
background:rgba(0,0,0,0.5);
display:none;
align-items:center;
justify-content:center;
z-index:9999;
`;

const voiceBox = document.createElement("div");
voiceBox.style.cssText = `
background: rgba(255,255,255,0.1);
backdrop-filter: blur(12px);
padding: 20px 30px;
border-radius: 16px;
text-align:center;
color:white;
min-width:350px;
box-shadow: 0 10px 30px rgba(0,0,0,0.6);
display:flex;
flex-direction:column;
gap:20px;
`;

const heading = document.createElement("h3");
heading.textContent = "Select Language & Voice 🎤";
heading.style.marginBottom = "10px";
voiceBox.appendChild(heading);

// --- Language Part ---
const langContainer = document.createElement("div");
langContainer.style.cssText = "display:flex; justify-content:space-around;";

const languages = [
    { name: "English", code: "en-US" },
    { name: "Hindi", code: "hi-IN" },
    { name: "Marathi", code: "mr-IN" }
];

// --- Voice Part ---
const voiceContainer = document.createElement("div");
voiceContainer.style.cssText = "display:flex; flex-direction:column; gap:8px; margin-top:10px;";

const customVoices = [
    { name: "Alex (Female)", lang: "en-US" },
    { name: "Emma (Female)", lang: "en-US" },
    { name: "Liam (Male)", lang: "en-US" },
    { name: "Aarav (Male)", lang: "hi-IN" }
];

// Render Buttons function (with highlight)
function renderPopup() {
    langContainer.innerHTML = "";
    voiceContainer.innerHTML = "";

    languages.forEach(lang => {
        const btn = document.createElement("button");
        btn.textContent = lang.name;
        btn.style.cssText = `
            padding:8px 12px; border:none; border-radius:8px;
            cursor:pointer; font-weight:bold; color:white;
            background: ${currentLang === lang.code ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.2)"};
        `;
        btn.onmouseover = () => btn.style.background = "rgba(255,255,255,0.35)";
        btn.onmouseout = () => {
            btn.style.background = currentLang === lang.code ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.2)";
        };
        btn.onclick = () => {
            currentLang = lang.code;
            renderPopup();
            alert("Language changed ✅ " + lang.name);
        };
        langContainer.appendChild(btn);
    });

    customVoices.forEach(voice => {
        const btn = document.createElement("button");
        btn.textContent = voice.name;
        btn.style.cssText = `
            padding:8px 12px; border:none; border-radius:8px;
            cursor:pointer; font-weight:bold; color:white;
            background: ${selectedVoice && selectedVoice.name === voice.name ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.2)"};
        `;
        btn.onmouseover = () => btn.style.background = "rgba(255,255,255,0.35)";
        btn.onmouseout = () => {
            btn.style.background = selectedVoice && selectedVoice.name === voice.name ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.2)";
        };
        btn.onclick = () => {
            selectedVoice = voice;
            currentLang = voice.lang;
            renderPopup();
            alert("Voice changed ✅ " + voice.name);
        };
        voiceContainer.appendChild(btn);
    });
}

voiceBox.appendChild(langContainer);
voiceBox.appendChild(voiceContainer);

// Close Button
const closeBtn = document.createElement("button");
closeBtn.textContent = "Close";
closeBtn.style.cssText = `
margin-top:15px; padding:8px 0; width:100%;
border:none; border-radius:8px; cursor:pointer;
background:crimson; color:white; font-weight:bold;
`;
closeBtn.onclick = () => { voicePopup.style.display = "none"; };

voiceBox.appendChild(closeBtn);
voicePopup.appendChild(voiceBox);
document.body.appendChild(voicePopup);

// --- Main Mic Function ---
function micAction() {
    const now = new Date().getTime();
    const timeDiff = now - lastClickTime;

    if (timeDiff < 300) { // double click → open popup
        renderPopup();
        voicePopup.style.display = "flex";
        lastClickTime = 0;
        return;
    }

    lastClickTime = now;

    setTimeout(() => {
        if (lastClickTime !== 0) speakText();
    }, 300);
}

// --- Speak Function ---
function speakText() {
    const input = document.getElementById("inputMessage");
    const message = input.value.trim();
    if (!message) return;

    const speech = new SpeechSynthesisUtterance(message);

    if (selectedVoice) {
        const voices = speechSynthesis.getVoices();
        const match = voices.find(v => v.lang === selectedVoice.lang);
        if (match) speech.voice = match;
        speech.lang = selectedVoice.lang;
    } else {
        speech.lang = currentLang;
    }

    speech.rate = 0.9;
    speech.pitch = 1;

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(speech);

    lastClickTime = 0;
}

// Load voices properly
window.speechSynthesis.onvoiceschanged = function() {
    speechSynthesis.getVoices();
};