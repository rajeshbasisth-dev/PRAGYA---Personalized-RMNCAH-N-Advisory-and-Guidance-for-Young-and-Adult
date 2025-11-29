import { GoogleGenAI, Type } from "@google/genai";
import { ClientProfile, GuidanceResponse } from "../types";

const processClientData = (client: ClientProfile): string => {
  return `
    Age: ${client.age}
    Category: ${client.category}
    Pregnancy Status: ${client.pregnancyStatus} ${client.pregnancyStatus === 'Yes' ? `(${client.trimester} Trimester)` : ''}
    Parity: ${client.parity || '0'}
    Medical History: ${client.medicalHistory}
    Visit Reason: ${client.visitReason}
    Nutritional Status: ${client.nutritionalStatus}
    Language for Script: ${client.language}
  `;
};

export const generateGuidance = async (client: ClientProfile): Promise<GuidanceResponse> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    const prompt = `
      You are PRAGYA, an AI-powered RMNCAH+N Counselling Assistant.
      Analyze the following client details and provide structured counselling guidance.
      
      Client Details:
      ${processClientData(client)}

      Your tasks:
      1. Classify the client's risk level (High/Medium/Low) based on age, parity, medical history, and nutritional status.
      2. Identify top 3-4 priority counselling areas for this specific visit.
      3. Write a suggested counselling script in ${client.language} (or simple English if not specified) that is empathetic, respectful, and easy to understand.
      4. Suggest opportunistic counselling topics (Nutrition, Danger signs, FP, etc.).
      5. Provide specific referral or follow-up advice if needed.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            clientCategory: { type: Type.STRING, description: "Refined client category description" },
            riskLevel: { type: Type.STRING, enum: ["High", "Medium", "Low"], description: "Risk classification" },
            riskReasoning: { type: Type.STRING, description: "Brief explanation of why this risk level was assigned" },
            priorities: { 
              type: Type.ARRAY, 
              items: { type: Type.STRING },
              description: "List of 3-4 key counselling priorities"
            },
            counsellingScript: { type: Type.STRING, description: "Verbal script for the counselor to speak" },
            opportunisticMessages: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  topic: { type: Type.STRING },
                  message: { type: Type.STRING }
                }
              },
              description: "Additional relevant health messages"
            },
            referralAdvice: { type: Type.STRING, description: "Actionable referral or follow-up instructions" }
          },
          required: ["clientCategory", "riskLevel", "riskReasoning", "priorities", "counsellingScript", "opportunisticMessages", "referralAdvice"]
        }
      }
    });

    const jsonText = response.text;
    if (!jsonText) {
      throw new Error("No response from AI");
    }

    return JSON.parse(jsonText) as GuidanceResponse;

  } catch (error) {
    console.error("Error generating guidance:", error);
    throw error;
  }
};