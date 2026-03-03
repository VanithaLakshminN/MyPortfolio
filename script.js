const textElement = document.getElementById('typewriter');
const phrases = ["PASSIONATE ABOUT DATA ANALYTICS", "PASSIONATE ABOUT WEB DEVELOPMENT", "A CSE ENGINEER", "READY TO SOLVE REAL-WORLD PROBLEMS"];
let phraseIndex = 0; let charIndex = 0; let isDeleting = false;

function typeEffect() {
    if (!textElement) return;
    const currentPhrase = phrases[phraseIndex];
    textElement.textContent = isDeleting ? currentPhrase.substring(0, charIndex - 1) : currentPhrase.substring(0, charIndex + 1);
    charIndex = isDeleting ? charIndex - 1 : charIndex + 1;
    let typeSpeed = isDeleting ? 50 : 100;
    if (!isDeleting && charIndex === currentPhrase.length) { isDeleting = true; typeSpeed = 2000; }
    else if (isDeleting && charIndex === 0) { isDeleting = false; phraseIndex = (phraseIndex + 1) % phrases.length; typeSpeed = 500; }
    setTimeout(typeEffect, typeSpeed);
}

const pingForm = document.getElementById('pingForm');
if (pingForm) {
    pingForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const data = { name: document.getElementById('userName').value, email: document.getElementById('userEmail').value, message: document.getElementById('userMsg').value };
        const btn = e.target.querySelector('button');
        btn.innerText = "Sending..."; btn.disabled = true;
        try {
            const response = await fetch('http://localhost:3000/send-ping', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
            if (response.ok) { alert("Ping sent!"); e.target.reset(); }
        } catch (error) { alert("Connection failed!"); }
        finally { btn.innerText = "Send Ping"; btn.disabled = false; }
    });
}

function reveal() {
    const reveals = document.querySelectorAll(".reveal");
    reveals.forEach(el => {
        if (el.getBoundingClientRect().top < window.innerHeight - 150) el.classList.add("active");
    });
}

window.addEventListener("scroll", reveal);
window.onload = () => { typeEffect(); reveal(); };

const glow = document.createElement('div');
glow.className = 'cursor-glow';
document.body.appendChild(glow);
document.addEventListener('mousemove', (e) => {
    glow.style.left = e.clientX + 'px'; glow.style.top = e.clientY + 'px';
});