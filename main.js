const header = document.querySelector(".site-header");

window.addEventListener("scroll", () => {
  if (window.scrollY > 60) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});




const gallery = document.getElementById("gallery");
const modal = document.getElementById("modal");
const artHistory = document.getElementById("artHistory");
const closeBtn = document.getElementById("close");
const loadMoreBtn = document.getElementById("loadMore");

let page = 1;
const limit = 9;
async function fetchArtworks() {
  const url = `https://api.artic.edu/api/v1/artworks?page=${page}&limit=${limit}&fields=id,title,image_id,artist_display`;

  const res = await fetch(url);
  const data = await res.json();

  data.data.forEach(art => {
    if (!art.image_id) return;

    const imgUrl = `https://www.artic.edu/iiif/2/${art.image_id}/full/600,/0/default.jpg`;

    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `<img src="${imgUrl}" alt="${art.title}">`;

card.onclick = () => {
  window.location.href = `artwork.html?id=${art.id}`;
};


    gallery.appendChild(card);
  });

  page++; // IMPORTANT: move to next page
}




// LOAD FIRST SET AUTOMATICALLY
fetchArtworks();

// LOAD MORE ADDS MORE (NOT REPLACE)
loadMoreBtn.onclick = fetchArtworks;

// CLOSE MODAL
closeBtn.onclick = () => (modal.style.display = "none");
window.onclick = e => {
  if (e.target === modal) modal.style.display = "none";
};

const gradients = [
  "linear-gradient(180deg, #e9fddf 0%, #ffffff 65%)",
  "linear-gradient(180deg, #d8f3dc 0%, #ffffff 65%)",
  "linear-gradient(180deg, #f1f3f5 0%, #ffffff 65%)",
  "linear-gradient(180deg, #e5e7eb 0%, #ffffff 65%)",
  "linear-gradient(180deg, #e0f2fe 0%, #ffffff 65%)",
  "linear-gradient(180deg, #f7efe5 0%, #ffffff 65%)",
  "linear-gradient(180deg, #fde2e4 0%, #ffffff 65%)",
  "linear-gradient(180deg, #e2ece9 0%, #ffffff 65%)",
  "linear-gradient(180deg, #edf6f9 0%, #ffffff 65%)",
  "linear-gradient(180deg, #fefae0 0%, #ffffff 65%)",
  "linear-gradient(180deg, #ede9fe 0%, #ffffff 65%)"
];

let index = 0;
const topSection = document.querySelector(".top-gradient");

setInterval(() => {
  index = (index + 1) % gradients.length;
  topSection.style.background = gradients[index];
}, 15000); // 15 seconds (luxury pacing)

// HERO IMAGES FADE IN SMOOTHLY
window.addEventListener("load", () => {
  document.querySelectorAll(".float").forEach((img, i) => {
    setTimeout(() => {
      img.style.opacity = "1";
    }, i * 300);
  });
});

const heroImages = document.querySelectorAll(".float");

document.addEventListener("mousemove", (e) => {
  const x = (window.innerWidth / 2 - e.clientX) / 60;
  const y = (window.innerHeight / 2 - e.clientY) / 60;

  heroImages.forEach((img, i) => {
    const speed = (i + 1) * 0.4;
    img.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
  });
});
/* ============================= */
/* SCROLL REVEAL (REPLAY ON UP) */
/* ============================= */

const revealItems = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      } else {
        entry.target.classList.remove("show");
      }
    });
  },
  {
    threshold: 0.2,
    rootMargin: "0px 0px -50px 0px"
  }
);

revealItems.forEach(item => observer.observe(item));

document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");

  if (!hamburger || !navLinks) return;

  hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    document.body.classList.toggle("menu-active");
  });
});




