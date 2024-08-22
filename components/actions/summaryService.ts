// Define the function to generate a summary
export async function generateSummaryService(data: {
  prompt: string
  model: string
  context: any
}) {
  // Replace this with the actual API request or service call
  const response = await fetch("/api/generate-summary", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })

  if (!response.ok) {
    throw new Error("Failed to generate summary")
  }

  const result = await response.json()
  return result.summaryContent // Assuming the API returns the summary content
}
