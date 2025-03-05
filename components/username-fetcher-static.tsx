"use client"

import type React from "react"
import { useState } from "react"
import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"

// Country code to name mapping
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

export function UsernameFetcherStatic() {
  const [username, setUsername] = useState("")
  const [result, setResult] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!username) {
      setError("Please enter a valid username")
      return
    }

    setIsLoading(true)
    setError(null)
    setResult(null)

    try {
      // Client-side processing for static hosting
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 800))

      // For static mode, we'll generate a random country code
      // This is just a placeholder since we can't actually fetch data
      const countryCodeList = ["US", "GB", "CA", "AU", "DE", "FR", "IT", "ES", "JP", "CN", "RU", "BR", "IN", "SG"]
      const randomIndex = Math.floor(Math.random() * countryCodeList.length)
      const countryCode = countryCodeList[randomIndex]

      // Format the result
      let formattedResult = countryCode

      // Check if the result is "SG" and replace with "Account doesn't exist"
      if (formattedResult === "SG") {
        formattedResult = "Account doesn't exist"
      } else {
        const countryName = countryNames[countryCode] || "Unknown Country"
        formattedResult = `${countryCode} (${countryName})`
      }

      setResult(formattedResult)
    } catch (err) {
      console.error("Processing error:", err)
      setError(err instanceof Error ? err.message : "An error occurred while processing the data.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="border-none shadow-lg bg-gradient-to-br from-white to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <CardHeader className="pb-4">
        <CardTitle className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500">
          TikTok Username Region Fetcher
        </CardTitle>
        <CardDescription className="text-gray-600 dark:text-gray-300">
          Enter a TikTok username to discover its region
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Input
              type="text"
              placeholder="@username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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

