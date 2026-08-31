/* ==========================================================================
   RED STRING THEORY — script.js
   Edit the CONFIG and MEMORIES sections below to personalize everything.
   You should not need to touch anything past "DO NOT EDIT BELOW THIS LINE"
   unless you want to change how the site behaves.
   ========================================================================== */

/* ---------------------------------------------------------------------
   CONFIG — personalize the site here
--------------------------------------------------------------------- */
const CONFIG = {
  USERNAME: "STARLIGHT",      // case-insensitive
  PASSWORD: "ILOVEYOU",       // case-sensitive, exact match
  SITE_TITLE: "For You",
  SONG_PATH: "audio/our-song.mp3",
  VOLUME: 0.2,                // 0.0 - 1.0, kept low by default
  WRONG_LOGIN_MESSAGES: [
    "Hmm… I don't think the stars recognize you yet ✨",
    "The red string is looking for the right person ♥",
    "Not quite… try again? ✨",
  ],
};

/* ---------------------------------------------------------------------
   MEMORIES — edit / add / remove your photos & messages here.
   image : path to your photo (drop files into /images)
   text  : the caption beside the photo
   date  : optional, small handwritten-style date
   note  : optional tiny annotation, e.g. "favorite ♥"
   frame : "cream" | "rose" | "tape"  (visual frame style, mix them up)
   flower: an emoji used as a small decorative flower on the photo (optional)
--------------------------------------------------------------------- */
const memories = [
  {
    image: "images/IMG_1508.jpg",
    text: "You somehow make ordinary moments feel like memories worth keeping.",
    date: "",
    note: "",
    frame: "cream",
    flower: "🌸",
  },
  {
    image: "images/IMG_9887.jpg",
    text: "This picture makes me smile every single time.",
    date: "",
    note: "favorite ♥",
    frame: "tape",
    flower: "",
  },
  {
    image: "images/IMG_8780.jpg",
    text: "I don't know if you realize it, but your smile has rescued more of my days than you'll probably ever know.",
    date: "",
    note: "",
    frame: "rose",
    flower: "🌼",
  },
  {
    image: "images/instc 2026-06-05 2143016136D159487F.jpg",
    text: "I think my camera likes you almost as much as I do.",
    date: "",
    note: "this one :)",
    frame: "cream",
    flower: "",
  },
  {
    image: "images/IMG_1244.jpg",
    text: "Somewhere between all the jokes, conversations, and random little moments… you definetly are my favorite person.",
    date: "",
    note: "",
    frame: "tape",
    flower: "🌿",
  },
  {
    image: "images/IMG_0096.jpg",
    text: "10/10 memory. Would absolutely experience again.",
    date: "",
    note: "",
    frame: "cream",
    flower: "",
  },
  {
    image: "images/IMG_0357.jpg",
    text: "There's something about being around you that makes life feel a little less complicated.",
    date: "",
    note: "still makes me smile",
    frame: "rose",
    flower: "🌷",
  },
  {
    image: "images/672d2fc6-73b8-43ce-8000-d1e1162ccc39.jpg",
    text: "With you around, this special day felt even more special.",
    date: "",
    note: "",
    frame: "cream",
    flower: "",
  },
];

/* ==========================================================================
   DO NOT EDIT BELOW THIS LINE (unless you know what you're doing)
   ========================================================================== */

/* ---------------------------------------------------------------------
   LOGIN
--------------------------------------------------------------------- */
const loginScreen = document.getElementById("login-screen");
const loginForm = document.getElementById("login-form");
const loginMessage = document.getElementById("login-message");
const mainSite = document.getElementById("main-site");
const loginThreadPath = document.getElementById("login-thread-path");

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const user = document.getElementById("username").value.trim();
  const pass = document.getElementById("password").value;

  const userOk = user.toUpperCase() === CONFIG.USERNAME.toUpperCase();
  const passOk = pass === CONFIG.PASSWORD;

  if (userOk && passOk) {
    handleLoginSuccess();
  } else {
    const msgs = CONFIG.WRONG_LOGIN_MESSAGES;
    loginMessage.textContent = msgs[Math.floor(Math.random() * msgs.length)];
  }
});

function handleLoginSuccess() {
  loginMessage.textContent = "";
  loginThreadPath.classList.add("drawing");

  // reveal main site underneath while the login screen dissolves
  mainSite.hidden = false;
  document.body.style.overflow = "hidden"; // hold scroll during transition

  setTimeout(() => {
    loginScreen.classList.add("dissolving");
  }, 500);

  setTimeout(() => {
    loginScreen.remove();
    document.body.style.overflow = "";
    initMusic(); // try to start music now that we have a user gesture
    initTimelineThread();
    revealObserver(); // (re)check reveals now visible in viewport
  }, 1900);
}

/* ---------------------------------------------------------------------
   MUSIC CONTROL
--------------------------------------------------------------------- */
const audio = document.getElementById("bg-audio");
const musicToggle = document.getElementById("music-toggle");
audio.volume = CONFIG.VOLUME;

function initMusic() {
  audio.play()
    .then(() => {
      musicToggle.classList.add("playing");
      musicToggle.setAttribute("aria-label", "Pause our soundtrack");
    })
    .catch(() => {
      // autoplay blocked — that's fine, the button below still works
      musicToggle.classList.remove("playing");
    });
}

musicToggle.addEventListener("click", () => {
  if (audio.paused) {
    audio.play().catch(() => {
      musicToggle.querySelector(".music-label").textContent = "audio unavailable";
    });
    musicToggle.classList.add("playing");
    musicToggle.setAttribute("aria-label", "Pause our soundtrack");
  } else {
    audio.pause();
    musicToggle.classList.remove("playing");
    musicToggle.setAttribute("aria-label", "Play our soundtrack");
  }
});

/* ---------------------------------------------------------------------
   BUILD TIMELINE FROM `memories`
--------------------------------------------------------------------- */
const track = document.getElementById("timeline-track");

memories.forEach((m, i) => {
  const side = i % 2 === 0 ? "side-left" : "side-right";
  const tilt = (Math.random() * 3 - 1.5).toFixed(2) + "deg";
  const frameClass = "frame-" + (m.frame || "cream");

  const row = document.createElement("div");
  row.className = `memory ${side} reveal`;
  row.style.setProperty("--tilt", tilt);

  row.innerHTML = `
    <div class="memory-photo-wrap">
      <div class="memory-photo ${frameClass}">
        <img src="${m.image}" alt="A memory of us" loading="lazy"
             onerror="this.style.background='linear-gradient(135deg,#e6d7c3,#e8c4c4)'; this.alt='';">
        ${m.flower ? `<span class="memory-flower" style="${flowerPosition(i)}">${m.flower}</span>` : ""}
      </div>
      ${m.note ? `<span class="memory-annotation">${m.note}</span>` : ""}
    </div>
    <div class="memory-text">
      ${m.date ? `<p class="memory-date">${m.date}</p>` : ""}
      <p class="memory-caption">${m.text}</p>
    </div>
  `;
  track.appendChild(row);
});

function flowerPosition(i) {
  const positions = [
    "top:-10px; right:-10px;",
    "bottom:-8px; left:-8px;",
    "top:-8px; left:-10px;",
    "bottom:-10px; right:-8px;",
  ];
  return positions[i % positions.length];
}

/* ---------------------------------------------------------------------
   RED STRING — SVG path connecting every photo, drawn on scroll
--------------------------------------------------------------------- */
const svg = document.getElementById("thread-svg");
const threadPath = document.getElementById("thread-path");
const threadProgress = document.getElementById("thread-path-progress");

function initTimelineThread() {

    /* Build once initially */
    requestAnimationFrame(() => {
        buildThreadPath();
    });

    /* Rebuild when window size changes */
    window.addEventListener(
        "resize",
        debounce(buildThreadPath, 200)
    );

    /* Update drawing while scrolling */
    window.addEventListener(
        "scroll",
        updateThreadProgress,
        { passive: true }
    );

    /*
     * Rebuild after every image loads,
     * because loading an image can change
     * the vertical layout.
     */
    const images = document.querySelectorAll(".memory-photo");

    images.forEach((img) => {
        if (!img.complete) {
            img.addEventListener(
                "load",
                buildThreadPath,
                { once: true }
            );
        }
    });

    /* One final rebuild after everything loads */
    window.addEventListener("load", () => {
        setTimeout(buildThreadPath, 100);
    });

    updateThreadProgress();
}

function buildThreadPath() {
    const section = document.querySelector(".timeline-section");
    const rows = [...document.querySelectorAll(".memory")];

    if (!section || !rows.length) return;

    const sectionRect = section.getBoundingClientRect();
    const sectionTop = sectionRect.top + window.scrollY;

    const points = [];

    rows.forEach((row) => {
        const photo = row.querySelector(".memory-photo");
        if (!photo) return;

        const r = photo.getBoundingClientRect();

        const x =
            r.left +
            r.width / 2 -
            sectionRect.left;

        const y =
            r.top +
            window.scrollY -
            sectionTop +
            r.height / 2;

        points.push({ x, y });
    });

    if (points.length < 2) return;

    /*
     * IMPORTANT:
     * Don't rely only on section.offsetHeight.
     * Make sure the SVG is tall enough to contain the final photo.
     */
    const lastPoint = points[points.length - 1];

    const svgHeight = Math.max(
        section.scrollHeight,
        section.offsetHeight,
        lastPoint.y + 250
    );

    const svgWidth = sectionRect.width;

    svg.setAttribute("width", svgWidth);
    svg.setAttribute("height", svgHeight);
    svg.setAttribute(
        "viewBox",
        `0 0 ${svgWidth} ${svgHeight}`
    );

    /* Start at first photo */
    let d = `M ${points[0].x} ${points[0].y}`;

    for (let i = 1; i < points.length; i++) {
        const prev = points[i - 1];
        const curr = points[i];

        const midY = (prev.y + curr.y) / 2;

        /*
         * Small alternating wobble gives the thread
         * an organic appearance.
         */
        const wobble = (i % 2 === 0 ? 1 : -1) * 18;

        d += `
            C
            ${prev.x + wobble},${midY}
            ${curr.x - wobble},${midY}
            ${curr.x},${curr.y}
        `;
    }

    threadPath.setAttribute("d", d);
    threadProgress.setAttribute("d", d);

    const length = threadProgress.getTotalLength();

    threadProgress.style.strokeDasharray = length;
    threadProgress.style.strokeDashoffset = length;

    threadProgress._length = length;

    updateThreadProgress();
}

function updateThreadProgress() {
    if (!threadProgress._length) return;

    const section = document.querySelector(".timeline-section");
    const rect = section.getBoundingClientRect();

    const svgHeight =
        Number(svg.getAttribute("height")) ||
        section.scrollHeight;

    /*
     * How far we've travelled through the timeline.
     */
    const scrolled = window.innerHeight * 0.7 - rect.top;

    const total = svgHeight;

    let ratio = scrolled / total;

    ratio = Math.max(0, Math.min(1, ratio));

    const length = threadProgress._length;

    threadProgress.style.strokeDashoffset =
        length * (1 - ratio);
}

function debounce(fn, wait) {
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...args), wait);
  };
}

/* ---------------------------------------------------------------------
   SCROLL REVEALS (IntersectionObserver)
--------------------------------------------------------------------- */
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
let io;

function revealObserver() {
  const targets = document.querySelectorAll(".reveal:not(.is-visible)");
  if (prefersReducedMotion) {
    targets.forEach((el) => el.classList.add("is-visible"));
    return;
  }
  if (!io) {
    io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
  }
  targets.forEach((el) => io.observe(el));
}
revealObserver();

/* ---------------------------------------------------------------------
   CLICK / TAP HEART EFFECT
--------------------------------------------------------------------- */
const heartColors = ["#a3222f", "#c98f8f", "#e8c4c4", "#6e1f2a"];

function spawnHeart(x, y) {
  const heart = document.createElement("div");
  heart.className = "click-heart";
  heart.textContent = "♥";
  heart.style.left = x - 8 + "px";
  heart.style.top = y - 8 + "px";
  heart.style.color = heartColors[Math.floor(Math.random() * heartColors.length)];
  heart.style.fontSize = 0.9 + Math.random() * 0.9 + "rem";
  heart.style.setProperty("--drift", (Math.random() * 50 - 25) + "px");
  heart.style.setProperty("--spin", (Math.random() * 40 - 20) + "deg");
  document.body.appendChild(heart);
  setTimeout(() => heart.remove(), 1500);

  if (Math.random() < 0.4) {
    const sparkle = document.createElement("div");
    sparkle.className = "click-sparkle";
    sparkle.textContent = "✦";
    sparkle.style.left = x + (Math.random() * 30 - 15) + "px";
    sparkle.style.top = y + (Math.random() * 30 - 15) + "px";
    sparkle.style.color = "#b78a4a";
    document.body.appendChild(sparkle);
    setTimeout(() => sparkle.remove(), 1000);
  }
}

function handlePointerEffect(e) {
  const target = e.target;
  // skip interactive elements so we don't interfere with usability
  if (target.closest("button, a, input, label, #login-form")) return;
  const point = e.touches ? e.touches[0] : e;
  spawnHeart(point.clientX, point.clientY);
}

mainSite.addEventListener("click", handlePointerEffect);
mainSite.addEventListener("touchstart", handlePointerEffect, { passive: true });

/* ---------------------------------------------------------------------
   SMALL SECRETS
--------------------------------------------------------------------- */
const secretToast = document.createElement("div");
secretToast.className = "secret-toast";
document.body.appendChild(secretToast);

function showSecretToast(text) {
  secretToast.textContent = text;
  secretToast.classList.add("show");
  clearTimeout(showSecretToast._t);
  showSecretToast._t = setTimeout(() => secretToast.classList.remove("show"), 2400);
}

document.addEventListener("click", (e) => {
  const secret = e.target.closest("[data-secret]");
  if (secret) {
    showSecretToast(secret.dataset.secret);
  }
});

/* ---------------------------------------------------------------------
   ENDING SECTION — heart path draw-in + easter egg
--------------------------------------------------------------------- */
const endingHeartPath = document.getElementById("ending-heart-path");
const endingHeartBtn = document.getElementById("ending-heart");
const easterEggText = document.getElementById("easter-egg-text");

const endingObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        endingHeartPath.classList.add("drawn");
        endingObserver.disconnect();
      }
    });
  },
  { threshold: 0.3 }
);
endingObserver.observe(document.querySelector(".ending-section"));

const heartHint = document.getElementById("heart-hint");

let heartClicks = 0;

endingHeartBtn.addEventListener("click", () => {
    heartClicks++;

    // Hide the little hint after she discovers the heart
    if (heartHint) {
        heartHint.classList.add("hide");
    }

    if (heartClicks === 5) {
        easterEggText.textContent =
            "Okay okay, since you keep clicking it…";

        easterEggText.classList.add("show");

    } else if (heartClicks === 8) {
        easterEggText.textContent =
            "yes, I love you. A lot. ♥";

    } else if (heartClicks > 8) {
        easterEggText.textContent =
            "yes, I love you. A lot. ♥";
    }
});
