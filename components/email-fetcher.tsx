"use client"

import { CardFooter } from "@/components/ui/card"

import type React from "react"

import { useState } from "react"
import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { makeDecoyRequests } from "@/lib/api-utils"

export function EmailFetcher() {
  const [email, setEmail] = useState("")
  const [result, setResult] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [attempts, setAttempts] = useState(0)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email || !email.includes("@")) {
      setError("Please enter a valid email address")
      return
    }

    setIsLoading(true)
    setError(null)
    setResult(null)

    // Increment attempts counter to help with debugging
    const currentAttempt = attempts + 1
    setAttempts(currentAttempt)

    try {
      // Start making decoy requests to confuse network monitoring
      makeDecoyRequests()

      // Add a cache-busting parameter to avoid cached responses
      const timestamp = new Date().getTime()

      // Add random parameters to obfuscate the actual request
      const randomId = Math.random().toString(36).substring(2, 15)
      const randomParam = Math.random().toString(36).substring(2, 10)

      // The actual request with obfuscated parameters
      const response = await fetch(
        `/api/fetch-email-data?email=${encodeURIComponent(email)}&_=${timestamp}&r=${randomId}&s=${randomParam}`,
      )

      if (!response.ok) {
        const contentType = response.headers.get("content-type") || ""

        if (contentType.includes("application/json")) {
          const errorData = await response.json()
          throw new Error(errorData.error || `Error: ${response.status} ${response.statusText}`)
        } else {
          throw new Error(`Error: ${response.status} ${response.statusText}`)
        }
      }

      // Get the text from the response
      const data = await response.text()

      // Simple check to avoid displaying HTML
      if (data.trim().startsWith("<!DOCTYPE html>") || data.trim().startsWith("<html")) {
        throw new Error("Received HTML instead of expected data. Please try again later.")
      }

      // Format the result to be more user-friendly
      let formattedResult = data.trim()

      // Check if the result is "SG" and replace with "Account doesn't exist"
      if (formattedResult.toUpperCase() === "SG") {
        formattedResult = "Account doesn't exist"
      } else if (formattedResult.length === 2 && /^[A-Z]{2}$/.test(formattedResult)) {
        // If it's a country code, add some context
        const countryNames: Record<string, string> = {
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

        const countryName = countryNames[formattedResult] || "Unknown Country"
        formattedResult = `${formattedResult} (${countryName})`
      }

      setResult(formattedResult)
    } catch (err) {
      console.error("Fetch error:", err)

      // More user-friendly error message
      if (err instanceof Error) {
        if (err.message.includes("Failed to fetch") || err.message.includes("NetworkError")) {
          setError("Network error: Please check your internet connection and try again.")
        } else {
          setError(err.message)
        }
      } else {
        setError("An unexpected error occurred. Please try again later.")
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="border-none shadow-lg bg-gradient-to-br from-white to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <CardHeader className="pb-4">
        <CardTitle className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500">
          TikTok Account Email Region Fetcher
        </CardTitle>
        <CardDescription className="text-gray-600 dark:text-gray-300">
          Enter a TikTok account email to discover its region
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Input
              type="email"
              placeholder="tiktok@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
              className="h-12 px-4 rounded-xl border-gray-300 bg-white dark:bg-gray-800 dark:border-gray-700 focus:ring-2 focus:ring-pink-500 transition-all"
            />
          </div>

          <Button
            type="submit"
            className="w-full h-12 rounded-xl font-medium text-white bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 transition-all duration-300 relative overflow-hidden shine-effect active:scale-95"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Fetching...
              </>
            ) : (
              "Fetch Region"
            )}
            <span className="absolute top-0 left-0 w-full h-full shine-element"></span>
          </Button>
        </form>

        {error && (
          <Alert
            variant="destructive"
            className="mt-6 bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 text-red-800 dark:text-red-300 rounded-xl"
          >
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
      </CardContent>

      {result && (
        <CardFooter className="flex flex-col items-start pt-0">
          <h3 className="font-medium mb-2 text-gray-700 dark:text-gray-300">Region:</h3>
          <div className="w-full p-4 bg-gradient-to-r from-gray-50 to-white dark:from-gray-800 dark:to-gray-700 rounded-xl border border-gray-200 dark:border-gray-700 overflow-x-auto shadow-sm">
            <p className="font-mono text-lg font-semibold text-pink-600 dark:text-pink-400">{result}</p>
          </div>
        </CardFooter>
      )}
    </Card>
  )
}

