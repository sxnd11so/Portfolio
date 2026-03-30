// Wait for DOM to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
  // Elements
  const navbar = document.getElementById("navbar")
  const hamburger = document.querySelector(".hamburger")
  const navMenu = document.querySelector(".nav-menu")
  const navLinks = document.querySelectorAll(".nav-link")
  const backToTop = document.querySelector(".back-to-top")
  const sections = document.querySelectorAll("section")
  const revealElements = document.querySelectorAll(".reveal-left, .reveal-right, .reveal-up")
  const contactForm = document.getElementById("contact-form")

  // Toggle mobile menu
  hamburger.addEventListener("click", () => {
    navMenu.classList.toggle("active")
    hamburger.classList.toggle("active")

    // Change hamburger icon
    if (hamburger.classList.contains("active")) {
      hamburger.innerHTML = '<i class="fas fa-times"></i>'
    } else {
      hamburger.innerHTML = '<i class="fas fa-bars"></i>'
    }
  })

  // Close mobile menu when clicking a nav link
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("active")
      hamburger.classList.remove("active")
      hamburger.innerHTML = '<i class="fas fa-bars"></i>'
    })
  })

  // Sticky navbar & Back to top button visibility
  window.addEventListener("scroll", () => {
    // Sticky navbar with background change
    if (window.scrollY > 50) {
      navbar.style.padding = "0.5rem 0"
      navbar.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.1)"
    } else {
      navbar.style.padding = "1rem 0"
      navbar.style.boxShadow = "none"
    }

    // Back to top button
    if (window.scrollY > 300) {
      backToTop.classList.add("active")
    } else {
      backToTop.classList.remove("active")
    }

    // Reveal elements on scroll
    revealOnScroll()
  })

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()

      const targetId = this.getAttribute("href")
      if (targetId === "#") return

      const targetElement = document.querySelector(targetId)
      if (targetElement) {
        const navbarHeight = navbar.offsetHeight
        const targetPosition = targetElement.offsetTop - navbarHeight

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        })
      }
    })
  })

  // Reveal elements on scroll
  function revealOnScroll() {
    revealElements.forEach((element) => {
      const elementTop = element.getBoundingClientRect().top
      const windowHeight = window.innerHeight

      if (elementTop < windowHeight - 100) {
        element.classList.add("active")
      }
    })
  }

  // Initial reveal check
  revealOnScroll()

  // Form submission
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault()

      // Get form data
      const name = document.getElementById("name").value
      const email = document.getElementById("email").value
      const message = document.getElementById("message").value

      // Simple form validation
      if (!name || !email || !message) {
        alert("Please fill in all fields")
        return
      }

      // Here you would typically send the form data to a server
      // For now, we'll just show a success message
      alert("Thank you for your message! I will get back to you soon.")
      contactForm.reset()
    })
  }

  // Project image hover effect for touch devices
  const projectCards = document.querySelectorAll(".project-card")

  projectCards.forEach((card) => {
    card.addEventListener(
      "touchstart",
      function () {
        this.querySelector(".project-overlay").style.opacity = "1"
      },
      { passive: true },
    )

    card.addEventListener(
      "touchend",
      function () {
        setTimeout(() => {
          this.querySelector(".project-overlay").style.opacity = "0"
        }, 1000)
      },
      { passive: true },
    )
  })
})
