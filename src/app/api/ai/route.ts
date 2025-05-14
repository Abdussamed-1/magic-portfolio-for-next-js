import { NextResponse } from 'next/server';
import { CohereClient } from 'cohere-ai';

const cohere = new CohereClient({
  token: process.env.COHERE_API_KEY,
});

export async function POST(request: Request) {
  try {
    const { type, prompt, conversationHistory } = await request.json();

    let response;
    switch (type) {
      case 'chat':
        response = await cohere.chat({
          message: prompt,
          conversationId: 'portfolio-chat',
          temperature: 0.7,
          chatHistory: conversationHistory,
        });
        return NextResponse.json({ text: response.text });

      case 'generate':
        response = await cohere.generate({
          prompt,
          maxTokens: 300,
          temperature: 0.7,
          k: 0,
          stopSequences: [],
          returnLikelihoods: 'NONE',
        });
        return NextResponse.json({ text: response.generations[0].text });

      default:
        return NextResponse.json(
          { error: 'Geçersiz istek türü' },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('AI API hatası:', error);
    return NextResponse.json(
      { error: 'İşlem sırasında bir hata oluştu' },
      { status: 500 }
    );
  }
} 