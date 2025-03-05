/**
 * Makes several decoy API requests to confuse anyone monitoring the network tab
 */
export function makeDecoyRequests() {
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
        // Add cache: 'no-store' to prevent caching
        cache: "no-store",
      }).catch(() => {
        // Silently ignore errors for decoy requests
      })
    }, Math.random() * 1000) // Random delay up to 1 second
  }

  // Also make a few POST requests to further confuse monitoring
  const postEndpoints = ["/api/events/log", "/api/telemetry/report", "/api/activity/record", "/api/feedback/submit"]

  for (let i = 0; i < 2; i++) {
    const endpoint = postEndpoints[Math.floor(Math.random() * postEndpoints.length)]

    setTimeout(() => {
      fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Request-ID": Math.random().toString(36).substring(2, 15),
        },
        body: JSON.stringify({
          timestamp: Date.now(),
          sessionId: Math.random().toString(36).substring(2, 15),
          eventType: ["pageview", "click", "interaction", "navigation"][Math.floor(Math.random() * 4)],
          data: {
            page: ["home", "search", "results", "profile"][Math.floor(Math.random() * 4)],
            referrer: ["direct", "search", "social", "email"][Math.floor(Math.random() * 4)],
            duration: Math.floor(Math.random() * 60),
          },
        }),
        mode: "no-cors",
        cache: "no-store",
      }).catch(() => {
        // Silently ignore errors
      })
    }, Math.random() * 1500) // Random delay up to 1.5 seconds
  }
}

