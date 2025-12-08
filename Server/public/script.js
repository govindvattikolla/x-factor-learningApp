


const toggleBtn = document.getElementById("menu-toggle");
  const navLinks = document.getElementById("nav-links");

  toggleBtn.addEventListener("click", () => {
    navLinks.classList.toggle("show");
  });
// hero section
 const words = ["path", "pace", "potential","XFACTOR"];
  let i = 0;
  const wordElement = document.getElementById("changing-word");

  setInterval(() => {
    i = (i + 1) % words.length;
    wordElement.classList.remove("fade-in");
    void wordElement.offsetWidth; // Reset animation
    wordElement.textContent = words[i];
    wordElement.classList.add("fade-in");
  }, 2000);

  // services
  const timeline = document.getElementById("timeline");
  const items = document.querySelectorAll('.timeline-item');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        timeline.classList.add('animate-line');
      }
    });
  }, { threshold: 0.75 });

  items.forEach(item => observer.observe(item));
