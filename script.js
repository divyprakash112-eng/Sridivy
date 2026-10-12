
const grid = document.getElementById("websiteGrid");
const count = document.getElementById("siteCount");
const emptyMessage = document.getElementById("emptyMessage");
const toast = document.getElementById("toast");

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");

  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => {
    toast.classList.remove("show");
  }, 2600);
}

function isRealWebsiteUrl(value) {
  if (typeof value !== "string") return false;

  try {
    const url = new URL(value);

    return (
      (url.protocol === "https:" || url.protocol === "http:") &&
      !value.includes("PASTE-") &&
      url.hostname.includes(".")
    );
  } catch {
    return false;
  }
}

function createCard(site, index) {
  const card = document.createElement("article");
  card.className = "surprise-card";

  const art = document.createElement("div");
  art.className = "card-art";

  if (site.theme === "wishes") {
    art.classList.add("art-wishes");
  } else if (site.theme === "memories") {
    art.classList.add("art-memories");
  } else {
    art.classList.add("art-default");
  }

  const starOne = document.createElement("span");
  starOne.className = "card-mini-star one";
  starOne.textContent = "✦";

  const starTwo = document.createElement("span");
  starTwo.className = "card-mini-star two";
  starTwo.textContent = "✧";

  const starThree = document.createElement("span");
  starThree.className = "card-mini-star three";
  starThree.textContent = "⋆";

  const emoji = document.createElement("span");
  emoji.className = "card-emoji";
  emoji.textContent = site.icon || "♡";
  emoji.setAttribute("aria-hidden", "true");

  art.append(starOne, starTwo, starThree, emoji);

  const content = document.createElement("div");
  content.className = "card-content";

  const category = document.createElement("span");
  category.className = "card-category";
  category.textContent = site.category || "A LITTLE SURPRISE";

  const title = document.createElement("h3");
  title.textContent = site.title || "A Little Surprise";

  const description = document.createElement("p");
  description.textContent = site.description || "Something special for you. ♡";

  const link = document.createElement("a");
  link.className = "card-link";

  const ready = isRealWebsiteUrl(site.url);

  link.href = ready ? site.url : "#";
  link.target = ready ? "_blank" : "_self";
  link.rel = "noopener noreferrer";

  const linkText = document.createElement("span");
  linkText.textContent = ready ? "Open this surprise" : "Link coming soon";

  const arrow = document.createElement("span");
  arrow.textContent = ready ? "↗" : "♡";

  link.append(linkText, arrow);

  if (!ready) {
    link.setAttribute("aria-label", `${site.title}: website link not added yet`);

    link.addEventListener("click", (event) => {
      event.preventDefault();
      showToast("Is surprise ka actual link abhi add karna hai. ♡");
    });
  }

  content.append(category, title, description, link);
  card.append(art, content);

  card.style.animationDelay = `${index * 100}ms`;

  return card;
}

async function loadWebsites() {
  try {
    const response = await fetch("websites.json", {
      cache: "no-store"
    });

    if (!response.ok) {
      throw new Error("Could not load websites.json");
    }

    const websites = await response.json();

    if (!Array.isArray(websites)) {
      throw new Error("Website list must be an array");
    }

    grid.replaceChildren();

    websites.forEach((site, index) => {
      grid.appendChild(createCard(site, index));
    });

    count.textContent =
      `♡ ${websites.length} little ${websites.length === 1 ? "world" : "worlds"}`;

    emptyMessage.hidden = websites.length !== 0;

    if (websites.length === 0) {
      grid.hidden = true;
    } else {
      grid.hidden = false;
    }
  } catch (error) {
    console.error("Website list error:", error);

    grid.replaceChildren();

    const message = document.createElement("p");
    message.className = "loading-card";
    message.textContent =
      "Oops! Surprises load nahi ho paayi. Please check websites.json and try again. ♡";

    grid.appendChild(message);
    count.textContent = "♡ Your little worlds";
  }
}

// Mobile navigation
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");

  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.textContent = isOpen ? "✕" : "☰";
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.textContent = "☰";
  });
});

// Cozy mode toggle
const cozyToggle = document.getElementById("cozyToggle");

cozyToggle.addEventListener("click", () => {
  const enabled = document.body.classList.toggle("cozy-mode");

  cozyToggle.setAttribute("aria-pressed", String(enabled));
  showToast(
    enabled
      ? "Extra cozy vibes activated! ✨"
      : "Back to our dreamy colours. ♡"
  );
});

// Start loading the website directory
loadWebsites();
