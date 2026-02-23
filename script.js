const sidebar = document.getElementById("sidebar");
const collapseBtn = document.getElementById("collapseBtn");
const mobileMenu = document.getElementById("mobileMenu");
const themeToggle = document.getElementById("themeToggle");
const icon = themeToggle.querySelector("i");

/* PAGE LOAD FADE */
window.addEventListener("DOMContentLoaded", () => {
    document.body.classList.add("loaded");
});

/* SIDEBAR */
collapseBtn.addEventListener("click", () => {
    sidebar.classList.toggle("collapsed");
});

mobileMenu.addEventListener("click", () => {
    sidebar.classList.toggle("active");
});

/* Auto close sidebar mobile */
document.querySelectorAll(".sidebar nav a").forEach(link => {
    link.addEventListener("click", () => {
        if (window.innerWidth <= 768) {
            sidebar.classList.remove("active");
        }
    });
});

/* THEME */
if (localStorage.getItem("theme") === "light") {
    document.body.classList.add("light");
    icon.classList.replace("fa-moon", "fa-sun");
}

themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("light");

    if (document.body.classList.contains("light")) {
        icon.classList.replace("fa-moon", "fa-sun");
        localStorage.setItem("theme", "light");
    } else {
        icon.classList.replace("fa-sun", "fa-moon");
        localStorage.setItem("theme", "dark");
    }
});

/* ========================= */
/* Dynamic Project Loading */
/* ========================= */

const projectsContainer = document.getElementById("projectsContainer");

fetch("projects.json")
    .then(res => res.json())
    .then(data => {
        data.forEach(project => {
            const card = document.createElement("a");
            card.className = "card";
            card.href = project.link;

            card.innerHTML = `
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <button>Open</button>
            `;

            projectsContainer.appendChild(card);
        });
    });

/* ========================= */
/* PARTICLES */
/* ========================= */

const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

let particles = [];

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = 2;
        this.speedX = (Math.random() - 0.5);
        this.speedY = (Math.random() - 0.5);
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
    }

    draw() {
        ctx.fillStyle = "rgba(0,255,255,0.7)";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function initParticles() {
    particles = [];
    const count = window.innerWidth < 768 ? 40 : 90;

    for (let i = 0; i < count; i++) {
        particles.push(new Particle());
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
        p.update();
        p.draw();
    });
    requestAnimationFrame(animate);
}

initParticles();
animate();