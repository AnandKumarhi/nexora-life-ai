import OpenAI from 'openai';
import { ChatMessage } from '../utils/types';

let _client: OpenAI | null = null;

const getClient = (): OpenAI => {
  if (!_client) {
    const apiKey = process.env.REACT_APP_OPENAI_API_KEY;
    if (!apiKey) throw new Error('REACT_APP_OPENAI_API_KEY is not set');
    _client = new OpenAI({ apiKey, dangerouslyAllowBrowser: true });
  }
  return _client;
};

const SYSTEM_PROMPT = `You are Nexora, a warm and motivating AI life coach inside a premium productivity app.
Your role is to help users build better habits, set and track goals, plan their day, and stay disciplined.
Keep responses concise and actionable (2-4 short paragraphs max).
Use occasional relevant emojis. Be encouraging, empathetic, and honest.
When the user shares their tasks or goals, give specific, personalized advice.
Never be preachy. Always be practical.`;

export interface StreamCallbacks {
  onChunk: (chunk: string) => void;
  onDone: () => void;
  onError: (err: Error) => void;
}

/**
 * Send a message to GPT-4o with streaming response.
 */
export const sendMessageStream = async (
  messages: ChatMessage[],
  userName: string,
  callbacks: StreamCallbacks
): Promise<void> => {
  const client = getClient();

  const apiMessages = messages.map((m) => ({
    role: m.role as 'user' | 'assistant',
    content: m.content,
  }));

  try {
    const stream = await client.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: `${SYSTEM_PROMPT}\nThe user's name is ${userName}.`,
        },
        ...apiMessages,
      ],
      max_tokens: 600,
      temperature: 0.8,
      stream: true,
    });

    for await (const chunk of stream) {
      const delta = chunk.choices[0]?.delta?.content ?? '';
      if (delta) callbacks.onChunk(delta);
    }
    callbacks.onDone();
  } catch (err) {
    callbacks.onError(err instanceof Error ? err : new Error(String(err)));
  }
};

/**
 * Non-streaming fallback for environments where streaming isn't available.
 */
export const sendMessage = async (
  messages: ChatMessage[],
  userName: string
): Promise<string> => {
  const client = getClient();

  const apiMessages = messages.map((m) => ({
    role: m.role as 'user' | 'assistant',
    content: m.content,
  }));

  const res = await client.chat.completions.create({
    model: 'gpt-4o',
    messages: [
      {
        role: 'system',
        content: `${SYSTEM_PROMPT}\nThe user's name is ${userName}.`,
      },
      ...apiMessages,
    ],
    max_tokens: 600,
    temperature: 0.8,
  });

  return res.choices[0]?.message?.content ?? 'I'm here to help you succeed! 💪';
};
