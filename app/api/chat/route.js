import { callModel } from "@/lib/models";

export async function POST(req) {
  try {
    const { prompt, provider } = await req.json();

    let response;

    try {
      // main model
      response = await callModel(prompt, provider);
    } catch (err) {
      // fallback
      response = await callModel(prompt, "groq");
    }

    return Response.json({
      output: response?.choices?.[0]?.message?.content || "No response"
    });

  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}
