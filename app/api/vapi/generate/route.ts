import { generateText } from "ai";
import { google } from "@ai-sdk/google";
import { getRandomInterviewCover } from "@/lib/utils";
import { db } from "@/firebase/admin";

export async function POST(request: Request) {
  const { type, role, level, techstack, amount, userid } = await request.json();

  try {
    const { text: questions } = await generateText({
      model: google("gemini-2.0-flash-001"),
      prompt: `You are an assistant that generates interview questions.

            Instructions:
            - Role: ${role}
            - Experience Level: ${level}
            - Tech Stack: ${techstack}
            - Focus Area: ${type} (behavioral or technical)
            - Number of Questions: ${amount}
            
            Output Format (IMPORTANT):
            [
            "First question?",
            "Second question?",
            ...
            ]
            ONLY output a valid JSON array of strings. No other text.
                  `,
    });

    const interview = {
      role: role,
      type: type,
      level: level,
      techstack: techstack.split(","),
      questions: JSON.parse(questions),
      userId: userid,
      finalized: true,
      coverImage: getRandomInterviewCover(),
      createdAt: new Date().toISOString(),
    };

    await db.collection("interview").add(interview);

    return Response.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Error", error);
    return Response.json({ success: false, error: error }, { status: 500 });
  }
}

export async function GET() {
  return Response.json({ success: true, data: "Thank you!" }, { status: 200 });
}
