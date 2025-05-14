import { CohereClient } from 'cohere-ai';

// Cohere istemcisini oluştur
const cohere = new CohereClient({
  token: process.env.COHERE_API_KEY,
});

// Mesaj tipi tanımı
type CohereMessage = {
  role: 'USER' | 'CHATBOT';
  message: string;
};

// Metin üretimi için fonksiyon
export async function generateText(prompt: string) {
  try {
    const response = await cohere.generate({
      prompt,
      maxTokens: 300,
      temperature: 0.5,
      k: 0,
      stopSequences: [],
      returnLikelihoods: 'NONE',
    });
    return response.generations[0].text;
  } catch (error) {
    console.error('Metin üretimi sırasında hata:', error);
    throw error;
  }
}

// Sohbet için fonksiyon
export async function chat(message: string, conversationHistory: CohereMessage[] = []) {
  try {
    const response = await cohere.chat({
      message,
      conversationId: 'portfolio-chat',
      temperature: 0.7,
      chatHistory: conversationHistory,
    });
    return response.text;
  } catch (error) {
    console.error('Sohbet sırasında hata:', error);
    throw error;
  }
}

// İçerik önerisi için fonksiyon
export async function generateContentSuggestions(topic: string) {
  try {
    const prompt = `Portfolyo için ${topic} konusunda içerik önerileri:`;
    const response = await cohere.generate({
      prompt,
      maxTokens: 200,
      temperature: 0.8,
      k: 0,
      stopSequences: [],
      returnLikelihoods: 'NONE',
    });
    return response.generations[0].text;
  } catch (error) {
    console.error('İçerik önerisi oluşturma sırasında hata:', error);
    throw error;
  }
} 