window.onload = function () {
  // scroll header script here
  window.onscroll = function () {
    scrollHeader();
  };
  // Get the header
  const header = document.querySelector(".navbar-bottom-menu");
  const body = document.querySelector("body");
  function scrollHeader() {
    // adding sticky class
    if (window.pageYOffset > 105) {
      header.classList.add("sticky");
    } else {
      // removing sticky class
      header.classList.remove("sticky");
    }
  }

  // navbar toggler script
  const navbarToggler = document.querySelector(".navbar-toggler");
  navbarToggler.addEventListener("click", function () {
    const collapse = document.querySelector(".collapse");
    collapse.classList.toggle("show");
    body.classList.toggle("layer-open");
    // header.classList.toggle("sticky-not");
    const navbarClose = document.querySelector(".navbar-close");
    navbarClose.style.display = "block";
  });

  const navbarClose = document.querySelector(".navbar-close");
  navbarClose.addEventListener("click", function () {
    const collapse = document.querySelector(".collapse");
    collapse.classList.toggle("show");
    navbarClose.style.display = "none";
    body.classList.toggle("layer-open");
  });
};

// Display Date
const displayDate = $(".display-date");
const options = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
};
const date = new Date();
displayDate.text(date.toLocaleDateString("en-US", options));

// Text to Speach

setTimeout(() => {
  const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');

  headings.forEach(heading => {
    const utterance = new SpeechSynthesisUtterance(heading.textContent);
    utterance.rate = 0.6

    heading.addEventListener('mouseover', () => {
      window.speechSynthesis.speak(utterance);
    });

    heading.addEventListener('mouseout', () => {
      window.speechSynthesis.cancel();
    });
  });
}, 10000)