
import { GoogleGenAI, Type } from "@google/genai";
import { OptimizationGoal, OptimizationResult, GradeLevel, TextType, HelpLevel } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const processStudentText = async (
  text: string, 
  goal: OptimizationGoal,
  grade: GradeLevel,
  textType: TextType,
  helpLevel: HelpLevel
): Promise<OptimizationResult> => {
  const model = 'gemini-3-flash-preview';
  
  const systemInstructions = `
    DU ÄR EN SKRIVPARTNER OCH EXPERT PÅ ATT HJÄLPA ELEVER ATT NÅ SINA MÅL.
    Du ska agera som en coach som förvandlar elevens idéer till högkvalitativa texter.

    VALD HJÄLP-NIVÅ: ${helpLevel}
    TEXTTYP: ${textType}
    MÅLBETYG: ${grade}

    INSTRUKTIONER FÖR DIN ROLL:
    1. UTVECKLING: Ta användarens idé och gör den till en professionell text. 
       - Om ${helpLevel} är "Skriv hela texten åt mig": Skapa ett komplett, välstrukturerat verk.
       - Om ${helpLevel} är "Bygg ut min idé med mer fakta": Behåll elevens röst men addera smarta argument och data.
       - Om ${helpLevel} är "Gör bara min text mänsklig": Fokusera 100% på språkligt flöde och AI-tvätt.

    2. BETYGSANPASSNING:
       - Nivå E: Enkelt språk, fokus på grundfakta.
       - Nivå C: Utvecklade resonemang och mogna ordval.
       - Nivå A: Djupgående analys, kritiska perspektiv och nyanserat språk.

    3. HUMANIZER (OERHÖRT VIKTIGT):
       - Du får ALDRIG låta som en AI. Ingen "dessutom", "sammanfattningsvis" eller stela listor.
       - Använd mänsklig rytm: korta slagkraftiga meningar blandat med längre funderingar.
       - Inkludera naturliga svenska småord: "ju", "väl", "faktiskt", "liksom", "typ".

    4. FÖRSVARSTIPS: Skapa 2-3 korta tips på hur eleven kan förklara sin text för en lärare om de blir frågade om sitt skrivande.

    Returnera alltid resultatet som JSON.
  `;

  const prompt = `Elevens input: "${text}". Skapa/Optimera denna ${textType} enligt vald hjälpnivå.`;

  const response = await ai.models.generateContent({
    model,
    contents: prompt,
    config: {
      systemInstruction: systemInstructions,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          optimizedText: { type: Type.STRING },
          improvements: { 
            type: Type.ARRAY, 
            items: { type: Type.STRING } 
          },
          defenseTips: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "Tips på hur man försvarar textens kvalitet för läraren."
          },
          humanScore: { type: Type.INTEGER, description: "Estimated percentage of human-like flow (0-100)" }
        },
        required: ["optimizedText", "improvements", "defenseTips", "humanScore"]
      }
    }
  });

  try {
    const result = JSON.parse(response.text || '{}');
    return {
      originalText: text,
      optimizedText: result.optimizedText || text,
      improvements: result.improvements || [],
      defenseTips: result.defenseTips || [],
      estimatedGradeLevel: grade,
      humanScore: result.humanScore || 99
    };
  } catch (error) {
    console.error("Failed to parse Gemini response:", error);
    throw new Error("Neural Engine timeout. Försök igen.");
  }
};
