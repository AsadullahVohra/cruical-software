import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import App from "./App"

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

// Initialize AOS-like functionality after render
document.addEventListener("DOMContentLoaded", () => {
  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.1,
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("aos-animate")
      }
    })
  }, observerOptions)

  document.querySelectorAll("[data-aos]").forEach((element) => {
    observer.observe(element)
  })
})
