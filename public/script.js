document.addEventListener("DOMContentLoaded", () => {
  // Email form
  const emailForm = document.getElementById("email-form")
  const emailInput = document.getElementById("email-input")
  const emailSubmitButton = document.getElementById("email-submit-button")
  const emailLoading = document.getElementById("email-loading")
  const emailErrorMessage = document.getElementById("email-error-message")
  const emailResultContainer = document.getElementById("email-result-container")
  const emailResultContent = document.getElementById("email-result-content")

  // Username form
  const usernameForm = document.getElementById("username-form")
  const usernameInput = document.getElementById("username-input")
  const usernameSubmitButton = document.getElementById("username-submit-button")
  const usernameLoading = document.getElementById("username-loading")
  const usernameErrorMessage = document.getElementById("username-error-message")
  const usernameResultContainer = document.getElementById("username-result-container")
  const usernameResultContent = document.getElementById("username-result-content")

  // Country code to name mapping
  const countryNames = {
    US: "United States",
    GB: "United Kingdom",
    CA: "Canada",
    AU: "Australia",
    DE: "Germany",
    FR: "France",
    IT: "Italy",
    ES: "Spain",
    JP: "Japan",
    CN: "China",
    RU: "Russia",
    BR: "Brazil",
    IN: "India",
    MX: "Mexico",
    KR: "South Korea",
    CH: "Switzerland",
    BE: "Belgium",
    // Add more as needed
  }

  // Function to make decoy requests to obfuscate the real API call
  function makeDecoyRequests() {
    // List of decoy endpoints that look legitimate
    const decoyEndpoints = [
      "/api/analytics/track",
      "/api/user/preferences",
      "/api/metrics/event",
      "/api/session/heartbeat",
      "/api/config/fetch",
      "/api/data/lookup",
      "/api/stats/record",
      "/api/auth/verify",
      "/api/region/detect",
      "/api/system/status",
    ]

    // Make 3-7 decoy requests with random delays
    const numRequests = 3 + Math.floor(Math.random() * 5)

    for (let i = 0; i < numRequests; i++) {
      // Pick a random endpoint
      const endpoint = decoyEndpoints[Math.floor(Math.random() * decoyEndpoints.length)]

      // Add random parameters
      const randomParams = new URLSearchParams({
        t: Date.now().toString(),
        sid: Math.random().toString(36).substring(2, 15),
        v: (Math.floor(Math.random() * 100) + 1).toString(),
        r: Math.random().toString(36).substring(2, 10),
      }).toString()

      // Make the decoy request with a random delay
      setTimeout(() => {
        // Use fetch with catch to silently handle any errors
        fetch(`${endpoint}?${randomParams}`, {
          method: "GET",
          headers: {
            Accept: "application/json",
            "X-Request-ID": Math.random().toString(36).substring(2, 15),
          },
          // Set mode to no-cors to prevent CORS errors for these fake endpoints
          mode: "no-cors",
        }).catch(() => {
          // Silently ignore errors for decoy requests
        })
      }, Math.random() * 1000) // Random delay up to 1 second
    }
  }

  // Email form submission handler
  emailForm.addEventListener("submit", async (e) => {
    e.preventDefault()

    const email = emailInput.value.trim()

    if (!email || !email.includes("@")) {
      showEmailError("Please enter a valid email address")
      return
    }

    // Show loading state
    emailSubmitButton.style.display = "none"
    emailLoading.classList.remove("hidden")
    emailErrorMessage.classList.add("hidden")
    emailResultContainer.classList.add("hidden")

    try {
      // Make decoy requests to obfuscate the real API call
      makeDecoyRequests()

      // Add a cache-busting parameter and random parameters to obfuscate the request
      const timestamp = new Date().getTime()
      const randomId = Math.random().toString(36).substring(2, 15)
      const randomParam = Math.random().toString(36).substring(2, 10)

      // Call the worker endpoint
      const response = await fetch(
        `/api/process?email=${encodeURIComponent(email)}&_=${timestamp}&r=${randomId}&s=${randomParam}`,
      )

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`)
      }

      // Get the text from the response
      const data = await response.text()

      // Format the result to be more user-friendly
      let formattedResult = data.trim()

      // Check if the result is "SG" and replace with "Account doesn't exist"
      if (formattedResult.toUpperCase() === "SG") {
        formattedResult = "Account doesn't exist"
      } else if (formattedResult.length === 2 && /^[A-Z]{2}$/.test(formattedResult)) {
        // If it's a country code, add some context
        const countryName = countryNames[formattedResult] || "Unknown Country"
        formattedResult = `${formattedResult} (${countryName})`
      }

      // Display the result
      emailResultContent.textContent = formattedResult
      emailResultContainer.classList.remove("hidden")
    } catch (error) {
      showEmailError(error.message || "An error occurred while processing your request")
    } finally {
      // Hide loading state
      emailSubmitButton.style.display = "block"
      emailLoading.classList.add("hidden")
    }
  })

  // Username form submission handler
  usernameForm.addEventListener("submit", async (e) => {
    e.preventDefault()

    const username = usernameInput.value.trim()

    if (!username) {
      showUsernameError("Please enter a valid username")
      return
    }

    // Show loading state
    usernameSubmitButton.style.display = "none"
    usernameLoading.classList.remove("hidden")
    usernameErrorMessage.classList.add("hidden")
    usernameResultContainer.classList.add("hidden")

    try {
      // Make decoy requests to obfuscate the real API call
      makeDecoyRequests()

      // Add a cache-busting parameter and random parameters to obfuscate the request
      const timestamp = new Date().getTime()
      const randomId = Math.random().toString(36).substring(2, 15)
      const randomParam = Math.random().toString(36).substring(2, 10)

      // Call the worker endpoint
      const response = await fetch(
        `/api/process?email=${encodeURIComponent(username)}&_=${timestamp}&r=${randomId}&s=${randomParam}`,
      )

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`)
      }

      // Get the text from the response
      const data = await response.text()

      // Format the result to be more user-friendly
      let formattedResult = data.trim()

      // Check if the result is "SG" and replace with "Account doesn't exist"
      if (formattedResult.toUpperCase() === "SG") {
        formattedResult = "Account doesn't exist"
      } else if (formattedResult.length === 2 && /^[A-Z]{2}$/.test(formattedResult)) {
        // If it's a country code, add some context
        const countryName = countryNames[formattedResult] || "Unknown Country"
        formattedResult = `${formattedResult} (${countryName})`
      }

      // Display the result
      usernameResultContent.textContent = formattedResult
      usernameResultContainer.classList.remove("hidden")
    } catch (error) {
      showUsernameError(error.message || "An error occurred while processing your request")
    } finally {
      // Hide loading state
      usernameSubmitButton.style.display = "block"
      usernameLoading.classList.add("hidden")
    }
  })

  function showEmailError(message) {
    emailErrorMessage.textContent = message
    emailErrorMessage.classList.remove("hidden")
  }

  function showUsernameError(message) {
    usernameErrorMessage.textContent = message
    usernameErrorMessage.classList.remove("hidden")
  }
})

