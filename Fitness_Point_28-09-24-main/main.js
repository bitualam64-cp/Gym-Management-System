// Toggle Menu Button
const menuBtn = document.getElementById("menu-btn");
const navLinks = document.getElementById("nav-links");
const menuBtnIcon = menuBtn.querySelector("i");

menuBtn.addEventListener("click", () => {
  navLinks.classList.toggle("open");
  const isOpen = navLinks.classList.contains("open");
  menuBtnIcon.setAttribute("class", isOpen ? "ri-close-line" : "ri-menu-line");
});

navLinks.addEventListener("click", () => {
  navLinks.classList.remove("open");
  menuBtnIcon.setAttribute("class", "ri-menu-line");
});

// Scroll Reveal Animations
const scrollRevealOption = {
  origin: "bottom",
  distance: "50px",
  duration: 1000,
};

ScrollReveal().reveal(".header__image img", { ...scrollRevealOption, origin: "right" });
ScrollReveal().reveal(".header__content h1", { ...scrollRevealOption, delay: 500 });
ScrollReveal().reveal(".header__content h2", { ...scrollRevealOption, delay: 1000 });
ScrollReveal().reveal(".header__content p", { ...scrollRevealOption, delay: 1500 });
ScrollReveal().reveal(".header__btn", { ...scrollRevealOption, delay: 2000 });

ScrollReveal().reveal(".about__image img", { ...scrollRevealOption, origin: "left" });
ScrollReveal().reveal(".about__content .section__header", { ...scrollRevealOption, delay: 500 });
ScrollReveal().reveal(".about__content p", { ...scrollRevealOption, delay: 1000 });
ScrollReveal().reveal(".about__btn", { ...scrollRevealOption, delay: 1500 });

ScrollReveal().reveal(".service__card", { duration: 1000, interval: 500 });
ScrollReveal().reveal(".facility__content .section__header", { ...scrollRevealOption });
ScrollReveal().reveal(".facility__content p", { ...scrollRevealOption, delay: 500 });
ScrollReveal().reveal(".mentor__card", { ...scrollRevealOption, interval: 500 });
ScrollReveal().reveal(".banner__content h2", { ...scrollRevealOption });
ScrollReveal().reveal(".banner__content p", { ...scrollRevealOption, delay: 500 });

// ✅ Firebase Modular SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-analytics.js";
import { getDatabase, ref, push, set, onValue } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-database.js";

// ✅ Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyBAXUqeubh4p-bRwwdFA0qK_d20Ppe7v1g",
  authDomain: "gym-management-system-302a3.firebaseapp.com",
  databaseURL: "https://gym-management-system-302a3-default-rtdb.firebaseio.com", // ✅ Required for Realtime DB
  projectId: "gym-management-system-302a3",
  storageBucket: "gym-management-system-302a3.firebasestorage.app",
  messagingSenderId: "42006747556",
  appId: "1:42006747556:web:f45e6b2894e65059540931",
  measurementId: "G-K3ZJZQ1CT1"
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app);

// ✅ Form Submission
document.getElementById("addMemberForm")?.addEventListener("submit", function (e) {
  e.preventDefault();

  const fullName = document.getElementById("fullName").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const Package = document.getElementById("package").value;
  const joinedOn = new Date().toLocaleDateString();

  const newMemberRef = push(ref(database, "members"));
  set(newMemberRef, {
    fullName,
    email,
    phone,
    Package,
    joinedOn
  });

  // Show success message
  document.getElementById("successMessage").style.display = "block";
  setTimeout(() => {
    document.getElementById("successMessage").style.display = "none";
  }, 3000);

  // Reset form
  document.getElementById("addMemberForm").reset();
});

// ✅ Fetch and display members
function fetchMembers() {
  const tableBody = document.getElementById("membersTableBody");
  if (!tableBody) return;

  const membersRef = ref(database, "members");

  onValue(membersRef, (snapshot) => {
    tableBody.innerHTML = "";

    if (snapshot.exists()) {
      snapshot.forEach((childSnapshot) => {
        const member = childSnapshot.val();

        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${member.fullName}</td>
          <td>${member.email}</td>
          <td>${member.phone}</td>
          <td>${member.Package}</td>
          <td>${member.joinedOn}</td>
        `;
        tableBody.appendChild(row);
      });
    } else {
      tableBody.innerHTML = "<tr><td colspan='5'>No members found.</td></tr>";
    }
  });
}

