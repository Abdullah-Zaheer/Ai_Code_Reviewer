
import { GoogleGenAI } from "@google/genai";

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable is not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const getReviewPrompt = (code: string): string => `
Please act as an expert senior software engineer. I need you to perform a thorough code review of the following code snippet.

Your review should be comprehensive and provide actionable feedback. Structure your response in Markdown format.

Please cover the following points:
1.  **Overall Assessment**: Start with a brief, high-level summary of the code's quality, purpose, and structure.
2.  **Correctness & Bugs**: Identify any potential logical errors, off-by-one errors, race conditions, or unhandled edge cases.
3.  **Best Practices & Readability**: Comment on adherence to language-specific best practices, code style, naming conventions, and overall code clarity. Is the code easy to understand and maintain?
4.  **Performance**: Analyze the code for potential performance bottlenecks. Suggest more efficient algorithms or data structures if applicable.
5.  **Security**: Highlight any potential security vulnerabilities, such as injection flaws, cross-site scripting (XSS), insecure handling of secrets, etc.
6.  **Suggestions for Improvement**: Provide concrete, actionable suggestions for improvement. Where possible, include improved code examples using Markdown code blocks.

Here is the code to review:
\`\`\`
${code}
\`\`\`
`;

export const reviewCode = async (code: string): Promise<string> => {
  if (!code.trim()) {
    throw new Error("Code to review cannot be empty.");
  }
  
  try {
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash-preview-04-17",
        contents: getReviewPrompt(code),
        config: {
            temperature: 0.2,
            topP: 0.8,
            topK: 40,
        },
    });

    return response.text ?? "";
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    if (error instanceof Error) {
        return `Error during code review: ${error.message}`;
    }
    return "An unexpected error occurred while communicating with the Gemini API.";
  }
};
