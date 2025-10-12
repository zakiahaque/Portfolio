// Enhanced Portfolio JavaScript with High-Level Animations

// Initialize AOS
AOS.init({
  duration: 1000,
  easing: "ease-in-out",
  once: true,
  mirror: false,
});

// Particle Background
document.addEventListener("DOMContentLoaded", function () {
  if (typeof particlesJS !== "undefined") {
    particlesJS("particles-js", {
      particles: {
        number: { value: 80, density: { enable: true, value_area: 800 } },
        color: { value: "#3b82f6" },
        shape: { type: "circle" },
        opacity: { value: 0.5, random: false },
        size: { value: 3, random: true },
        line_linked: {
          enable: true,
          distance: 150,
          color: "#3b82f6",
          opacity: 0.4,
          width: 1,
        },
        move: {
          enable: true,
          speed: 2,
          direction: "none",
          random: false,
          straight: false,
          out_mode: "out",
          bounce: false,
        },
      },
      interactivity: {
        detect_on: "canvas",
        events: {
          onhover: { enable: true, mode: "repulse" },
          onclick: { enable: true, mode: "push" },
          resize: true,
        },
      },
      retina_detect: true,
    });
  }
});

// Scroll Progress
function updateScrollProgress() {
  const scrollProgress = document.getElementById("scroll-progress");
  const scrollTop = window.pageYOffset;
  const docHeight = document.body.offsetHeight - window.innerHeight;
  const scrollPercent = (scrollTop / docHeight) * 100;

  if (scrollProgress) {
    scrollProgress.style.transform = `scaleX(${scrollPercent / 100})`;
  }
}

// Back to Top Button
function handleBackToTop() {
  const backToTopBtn = document.getElementById("back-to-top");

  if (window.pageYOffset > 300) {
    backToTopBtn.classList.add("opacity-100", "translate-y-0");
    backToTopBtn.classList.remove("opacity-0", "translate-y-10");
  } else {
    backToTopBtn.classList.remove("opacity-100", "translate-y-0");
    backToTopBtn.classList.add("opacity-0", "translate-y-10");
  }
}
// Dark Mode Toggle
function initDarkMode() {
  const themeToggle = document.getElementById("theme-toggle");
  const html = document.documentElement;

  // Check for saved theme preference or default to light mode
  const currentTheme = localStorage.getItem("theme") || "light";
  html.classList.toggle("dark", currentTheme === "dark");
  updateThemeIcon(currentTheme);

  themeToggle.addEventListener("click", () => {
    const isDark = html.classList.contains("dark");
    html.classList.toggle("dark", !isDark);
    localStorage.setItem("theme", isDark ? "light" : "dark");
    updateThemeIcon(isDark ? "light" : "dark");
  });
}

function updateThemeIcon(theme) {
  const icon = document.querySelector("#theme-toggle i");
  if (theme === "dark") {
    icon.classList.remove("fa-moon");
    icon.classList.add("fa-sun");
  } else {
    icon.classList.remove("fa-sun");
    icon.classList.add("fa-moon");
  }
}

// Enhanced Collapsible Sections
function initCollapsibleSections() {
  const collapsibles = document.querySelectorAll(".collapsible");

  collapsibles.forEach((header) => {
    const content = header.nextElementSibling;

    // Set initial state
    content.style.maxHeight = "0";
    content.style.opacity = "0";

    header.addEventListener("click", () => {
      const isOpen = content.classList.contains("show");

      // Close all other sections
      document.querySelectorAll(".content.show").forEach((openContent) => {
        if (openContent !== content) {
          openContent.classList.remove("show");
          openContent.style.maxHeight = "0";
          openContent.style.opacity = "0";
          openContent.previousElementSibling.classList.remove("active");
        }
      });

      // Toggle current section
      if (isOpen) {
        content.classList.remove("show");
        content.style.maxHeight = "0";
        content.style.opacity = "0";
        header.classList.remove("active");
      } else {
        content.classList.add("show");
        content.style.maxHeight = content.scrollHeight + "px";
        content.style.opacity = "1";
        header.classList.add("active");
      }
    });
  });
}
// Animated Skill Progress Bars
function animateSkillBars() {
  const skillBars = document.querySelectorAll(".skill-progress");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const bar = entry.target;
          const width = bar.getAttribute("data-width");

          setTimeout(() => {
            bar.style.width = width + "%";
          }, 200);
        }
      });
    },
    { threshold: 0.5 }
  );

  skillBars.forEach((bar) => observer.observe(bar));
}

// Enhanced Contact Form
function initContactForm() {
  const contactForm = document.getElementById("contactForm");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Add loading state
      const submitBtn = this.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;

      submitBtn.innerHTML =
        '<i class="fas fa-spinner fa-spin mr-2"></i>Sending...';
      submitBtn.disabled = true;

      // Simulate form submission
      setTimeout(() => {
        submitBtn.innerHTML =
          '<i class="fas fa-check mr-2"></i>Sent Successfully!';
        submitBtn.style.background =
          "linear-gradient(to right, #10b981, #059669)";

        setTimeout(() => {
          submitBtn.innerHTML = originalText;
          submitBtn.disabled = false;
          submitBtn.style.background = "";
          this.reset();
        }, 2000);

        // Show success message
        showNotification("Message sent successfully!", "success");
      }, 1500);
    });
  }
}

// Notification System
function showNotification(message, type = "info") {
  const notification = document.createElement("div");
  notification.className = `fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 transform translate-x-full transition-transform duration-300`;
  notification.style.background = type === "success" ? "#10b981" : "#3b82f6";
  notification.style.color = "white";
  notification.innerHTML = `
    <div class="flex items-center">
      <i class="fas fa-${
        type === "success" ? "check-circle" : "info-circle"
      } mr-2"></i>
      ${message}
    </div>
  `;

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.classList.remove("translate-x-full");
  }, 100);

  setTimeout(() => {
    notification.classList.add("translate-x-full");
    setTimeout(() => {
      notification.remove();
    }, 300);
  }, 3000);
}

// Smooth Scrolling for Internal Links
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });
}

// Parallax Effect for Sidebar
function initParallax() {
  const sidebar = document.querySelector(".sidebar");

  if (sidebar) {
    window.addEventListener("scroll", () => {
      const scrolled = window.pageYOffset;
      const rate = scrolled * -0.5;
      sidebar.style.transform = `translateY(${rate}px)`;
    });
  }
}

// Intersection Observer for Animations
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate-in");
      }
    });
  }, observerOptions);

  // Observe elements for scroll animations
  document
    .querySelectorAll(".section, .project-card, .experience-card")
    .forEach((el) => {
      observer.observe(el);
    });
}
// Magnetic Button Effect
function initMagneticButtons() {
  const buttons = document.querySelectorAll(".btn");

  buttons.forEach((button) => {
    button.addEventListener("mousemove", (e) => {
      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const deltaX = (x - centerX) / centerX;
      const deltaY = (y - centerY) / centerY;

      button.style.transform = `translate(${deltaX * 5}px, ${
        deltaY * 5
      }px) scale(1.05)`;
    });

    button.addEventListener("mouseleave", () => {
      button.style.transform = "translate(0, 0) scale(1)";
    });
  });
}

// Counter Animation for Stats
function animateCounters() {
  const counters = document.querySelectorAll("[data-count]");

  counters.forEach((counter) => {
    const target = parseInt(counter.getAttribute("data-count"));
    const increment = target / 100;
    let current = 0;

    const updateCounter = () => {
      if (current < target) {
        current += increment;
        counter.textContent = Math.ceil(current);
        requestAnimationFrame(updateCounter);
      } else {
        counter.textContent = target;
      }
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          updateCounter();
          observer.unobserve(entry.target);
        }
      });
    });

    observer.observe(counter);
  });
}

// Initialize All Features
document.addEventListener("DOMContentLoaded", function () {
  // Initialize all interactive features
  initDarkMode();
  initCollapsibleSections();
  animateSkillBars();
  initContactForm();
  initSmoothScroll();
  initParallax();
  initScrollAnimations();
  initMagneticButtons();
  animateCounters();

  // Event listeners
  window.addEventListener("scroll", () => {
    updateScrollProgress();
    handleBackToTop();
  });

  // Add loading animation
  document.body.classList.add("loaded");
});

// Preloader
window.addEventListener("load", function () {
  document.body.classList.add("loaded");
});

// Keyboard Navigation
document.addEventListener("keydown", function (e) {
  if (e.key === "Tab") {
    document.body.classList.add("keyboard-navigation");
  }
});

document.addEventListener("mousedown", function () {
  document.body.classList.remove("keyboard-navigation");
});

// Performance Optimization
let ticking = false;

function updateAnimations() {
  updateScrollProgress();
  handleBackToTop();
  ticking = false;
}

window.addEventListener("scroll", () => {
  if (!ticking) {
    requestAnimationFrame(updateAnimations);
    ticking = true;
  }
});

// Error Handling
window.addEventListener("error", function (e) {
  console.error("Portfolio Error:", e.error);
});

// Console Easter Egg
console.log(`
  🚀 Enhanced Portfolio Loaded!
  ✨ Features: Particle Background, Dark Mode, Smooth Animations
  📱 Responsive Design with Mobile-First Approach
  🎨 High-Level Interactive Elements
  🎯 Performance Optimized
`);
