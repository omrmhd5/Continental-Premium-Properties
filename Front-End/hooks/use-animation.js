"use client"

import { useEffect, useRef } from "react"

export function useAnimation() {
  const observerRef = useRef(null)

  useEffect(() => {
    // Initialize Intersection Observer
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible")
          }
        })
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.1,
      },
    )

    // Select all elements with animation classes
    const animatedElements = document.querySelectorAll(".fade-in, .fade-in-up")

    // Observe each element
    animatedElements.forEach((element) => {
      observerRef.current.observe(element)
    })

    // Cleanup
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [])

  return null
}
