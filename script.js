const startButton = document.getElementById("startButton");
const content = document.getElementById("content");
const letter = document.getElementById("letter");
const surpriseBtn = document.getElementById("surpriseBtn");
const surpriseMessage = document.getElementById("surpriseMessage");

startButton.addEventListener("click", () => {
  startButton.style.display = "none";
  content.classList.remove("hidden");
  typeWriter(letter);
});

surpriseBtn.addEventListener("click", () => {
  surpriseMessage.classList.remove("hidden");
});

function typeWriter(element) {
  const text = element.innerText;
  element.innerText = "";
  let i = 0;
  const interval = setInterval(() => {
    if (i < text.length) {
      element.innerText += text.charAt(i);
      i++;
    } else {
      clearInterval(interval);
    }
  }, 50);
}

// Corações caindo
const canvas = document.getElementById("heartsCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let hearts = [];

for (let i = 0; i < 50; i++) {
  hearts.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    size: Math.random() * 5 + 2,
    speed: Math.random() * 1 + 0.5
  });
}

function drawHearts() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "rgba(255,105,180,0.7)";
  ctx.font = "16px Arial";

  for (let heart of hearts) {
    ctx.fillText("❤", heart.x, heart.y);
    heart.y += heart.speed;
    if (heart.y > canvas.height) {
      heart.y = 0;
      heart.x = Math.random() * canvas.width;
    }
  }

  requestAnimationFrame(drawHearts);
}

drawHearts();