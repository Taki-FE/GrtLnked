document.addEventListener("DOMContentLoaded", () => {

  // Code for Typewriter Effect
  const text = document.querySelector("#igniting-text");
  const typingSpeed = 100;
  const typewriterText = document.getElementById("igniting-text");

  function simulateTypingText() {
    let firstCharacter = 0;
    const textLength = text.length;

    const typingInterval = setInterval(() => {
      typewriterText.textContent += text.charAt(firstCharacter);
      firstCharacter++;

      if (firstCharacter === textLength) {
        clearInterval(typingInterval);
      };
    }, typingSpeed);
  };

  window.addEventListener("load", () => {
    simulateTypingText();
  });


  let sections = document.querySelectorAll('section');
  let navLinks = document.querySelectorAll('header nav a');

  window.onscroll = () => {
    sections.forEach(sec => {
      let top = window.scrollY;
      let offset = sec.offsetTop - 100;
      let height = sec.offsetHeight;
      let id = sec.getAttribute('id');

      if (top >= offset && top < offset + height) {
        navLinks.forEach(links => {
          links.classList.remove('active');
          document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
        });
      };
    });
  };

});

