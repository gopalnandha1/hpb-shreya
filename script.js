const wishForm = document.getElementById("wishForm");
const nameInput = document.getElementById("name");
const messageInput = document.getElementById("message");
const wishesList = document.getElementById("wishesList");

function loadWishes() {
  const wishes = JSON.parse(localStorage.getItem("wishes")) || [];
  wishesList.innerHTML = "";
  wishes.forEach(wish => {
    const div = document.createElement("div");
    div.className = "wish";
    div.innerHTML = `<strong>${wish.name}</strong><p>${wish.message}</p>`;
    wishesList.appendChild(div);
  });
}

wishForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = nameInput.value.trim();
  const message = messageInput.value.trim();
  if (!name || !message) return;

  const newWish = { name, message };
  const wishes = JSON.parse(localStorage.getItem("wishes")) || [];
  wishes.push(newWish);
  localStorage.setItem("wishes", JSON.stringify(wishes));

  nameInput.value = "";
  messageInput.value = "";
  loadWishes();
});

window.onload = loadWishes;
// Live Message Update
function generateCard() {
  const message = document.getElementById("messageInput").value;
  const output = document.getElementById("messageOutput");
  output.textContent = message || "Your message will appear here...";
  launchConfetti();
}

// Download as Image
function downloadAsImage() {
  html2canvas(document.getElementById("card")).then(canvas => {
    const link = document.createElement("a");
    link.download = "birthday_card.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  });
}

// Download as PDF
function downloadAsPDF() {
  html2canvas(document.getElementById("card")).then(canvas => {
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jspdf.jsPDF();
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    pdf.addImage(imgData, 'PNG', 0, 10, pdfWidth, pdfHeight);
    pdf.save("birthday_card.pdf");
  });
}

// Confetti Animation 🎊
function launchConfetti() {
  const canvas = document.getElementById("confetti-canvas");
  const confetti = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const particles = Array.from({ length: 100 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height - canvas.height,
    size: Math.random() * 6 + 4,
    color: `hsl(${Math.random() * 360}, 70%, 60%)`,
    speed: Math.random() * 3 + 2,
    rotation: Math.random() * 360
  }));

  function draw() {
    confetti.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      confetti.fillStyle = p.color;
      confetti.beginPath();
      confetti.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      confetti.fill();
      p.y += p.speed;
      p.rotation += 5;
      if (p.y > canvas.height) p.y = -10;
    });
    requestAnimationFrame(draw);
  }
  draw();

  setTimeout(() => confetti.clearRect(0, 0, canvas.width, canvas.height), 6000);
}
