
import { GoogleGenAI, Type } from "@google/genai";
import { GeneratorOptions, PcBuild, Language } from "../types";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
    console.warn("API_KEY is not set in environment variables.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

const pcPartSchema = {
  type: Type.OBJECT,
  properties: {
    name: { type: Type.STRING, description: "Full name of the component, e.g., 'AMD Ryzen 7 7800X3D'" },
    price: { type: Type.NUMBER, description: "Estimated price in the specified currency" }
  },
  required: ["name", "price"]
};

const powerSupplySchema = {
  type: Type.OBJECT,
  properties: {
    name: { type: Type.STRING, description: "Full name of the Power Supply Unit" },
    price: { type: Type.NUMBER, description: "Estimated price in the specified currency" },
    wattage: { type: Type.NUMBER, description: "Wattage of the PSU, e.g., 850" }
  },
  required: ["name", "price", "wattage"]
};

const responseSchema = {
  type: Type.OBJECT,
  properties: {
    cpu: { ...pcPartSchema, description: "The recommended Central Processing Unit." },
    gpu: { ...pcPartSchema, description: "The recommended Graphics Processing Unit." },
    motherboard: { ...pcPartSchema, description: "A compatible motherboard." },
    ram: { ...pcPartSchema, description: "Recommended RAM kit, e.g., '32GB DDR5 6000MHz CL30'." },
    ssd: { ...pcPartSchema, description: "Recommended storage drive, e.g., '2TB NVMe SSD'." },
    psu: { ...powerSupplySchema, description: "A suitable Power Supply Unit." },
    case: { ...pcPartSchema, description: "A compatible PC case." },
    cooler: { ...pcPartSchema, description: "A suitable CPU cooler (can be 'Stock Cooler' if sufficient)." },
    totalPrice: { type: Type.NUMBER, description: "The sum of all component prices, should be close to the user's budget." },
    totalWattage: { type: Type.NUMBER, description: "The estimated total power draw under load in watts." }
  },
  required: [ "cpu", "gpu", "motherboard", "ram", "ssd", "psu", "case", "cooler", "totalPrice", "totalWattage" ]
};


export const generatePCBuild = async (options: GeneratorOptions, language: Language): Promise<PcBuild> => {
    const { budget, usage, resolution, platform } = options;
    
    const amazonDomain = {
      en: 'www.amazon.com',
      fr: 'www.amazon.fr',
      de: 'www.amazon.de',
    }[language];

    const currency = {
        en: 'USD ($)',
        fr: 'Euros (€)',
        de: 'Euros (€)',
    }[language];

    const prompt = `
You are an expert PC builder. Based on the following user requirements, generate a compatible and balanced PC component list.
Ensure all parts are compatible with each other. For example, if the platform is AMD AM5, the CPU and Motherboard must be AM5 compatible.
Provide estimated prices in ${currency} for each component, based on current listings on ${amazonDomain}. The total price should be as close as possible to the user's budget without exceeding it significantly.

User Requirements:
- Budget: ${budget} ${currency.split(' ')[1]}
- Primary Usage: ${usage}
- Target Gaming Resolution: ${resolution}
- Preferred Platform: ${platform}

The output MUST be a single JSON object that adheres to the provided schema. Do not include any text, markdown, or code block syntax before or after the JSON object. Just the raw JSON.
`;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: responseSchema,
                temperature: 0.7,
            },
        });
        
        const jsonText = response.text.trim();
        const build = JSON.parse(jsonText) as PcBuild;
        return build;

    } catch (error) {
        console.error("Error generating PC build:", error);
        throw new Error("Failed to generate PC configuration. The AI model may be temporarily unavailable. Please try again later.");
    }
};
