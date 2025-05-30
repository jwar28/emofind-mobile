import { GoogleGenAI } from '@google/genai';

const genAI = new GoogleGenAI({ apiKey: process.env.EXPO_PUBLIC_GEMINI_API_KEY || '' });

export interface SentimentAnalysis {
  emotion: string;
  diagnosis: string;
  recommendation: string;
}

export default async function analyzeSentiment(inputText: string): Promise<SentimentAnalysis> {
  try {
    const prompt = `Analiza el siguiente texto y proporciona un análisis de sentimiento. IMPORTANTE: Debes responder SOLO con un objeto JSON válido, sin ningún texto adicional antes o después.

    Texto a analizar: "${inputText}"
    
    Responde ÚNICAMENTE con este formato JSON exacto (sin comillas adicionales ni caracteres extra):
    {
      "emotion": "emoción principal (Felicidad, Tristeza, Ansiedad, Depresión, etc.)",
      "diagnosis": "diagnóstico breve del estado emocional",
      "recommendation": "recomendación o mensaje de apoyo apropiado"
    }`;

    const response = await genAI.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: prompt,
    });
    
    if (!response.text) {
      throw new Error('No se recibió respuesta del modelo');
    }

    try {
      // Clean the response text to ensure it's valid JSON
      const cleanedText = response.text.trim().replace(/^```json\n?|\n?```$/g, '');
      const analysis = JSON.parse(cleanedText);
      
      // Validate the response has all required fields
      if (!analysis.emotion || !analysis.diagnosis || !analysis.recommendation) {
        throw new Error('Respuesta incompleta del modelo');
      }
      
      return analysis;
    } catch (parseError) {
      console.log(parseError);
      console.error('Error parsing JSON response:', response.text);
      throw new Error('Error al procesar la respuesta del modelo');
    }
  } catch (error) {
    console.error('Error analyzing sentiment:', error);
    throw new Error('No se pudo analizar el sentimiento del texto');
  }
} 