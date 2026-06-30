import { useState, useCallback, useRef } from 'react';
import { ChatMessage } from '../utils/types';
import { uid, nowISO } from '../utils/helpers';
import { sendMessageStream } from '../services/openaiService';
import { saveChatHistory, loadChatHistory } from '../services/localStorageService';

export const useChat = (userId: string, userName: string) => {
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    const history = loadChatHistory(userId) as ChatMessage[];
    if (history.length > 0) return history;
    return [
      {
        id: uid(),
        role: 'assistant',
        content: `Hey ${userName}! 👋 I'm your Nexora AI Coach. I'm here to help you build better habits, crush your goals, and plan your days with intention. What would you like to work on today?`,
        timestamp: nowISO(),
      },
    ];
  });

  const [streaming, setStreaming] = useState(false);
  const abortRef = useRef<boolean>(false);

  const sendMessage = useCallback(
    async (text: string) => {
      if (!text.trim() || streaming) return;

      const userMsg: ChatMessage = {
        id: uid(),
        role: 'user',
        content: text,
        timestamp: nowISO(),
      };

      const updatedMessages = [...messages, userMsg];
      setMessages(updatedMessages);
      setStreaming(true);
      abortRef.current = false;

      // Create a placeholder assistant message for streaming
      const assistantId = uid();
      const assistantMsg: ChatMessage = {
        id: assistantId,
        role: 'assistant',
        content: '',
        timestamp: nowISO(),
      };
      setMessages((m) => [...m, assistantMsg]);

      let fullContent = '';

      await sendMessageStream(updatedMessages, userName, {
        onChunk: (chunk) => {
          if (abortRef.current) return;
          fullContent += chunk;
          setMessages((m) =>
            m.map((msg) =>
              msg.id === assistantId ? { ...msg, content: fullContent } : msg
            )
          );
        },
        onDone: () => {
          setStreaming(false);
          const finalMessages = [
            ...updatedMessages,
            { id: assistantId, role: 'assistant' as const, content: fullContent, timestamp: nowISO() },
          ];
          saveChatHistory(userId, finalMessages);
        },
        onError: (err) => {
          setStreaming(false);
          const errMsg =
            err.message.includes('API key')
              ? "Please add your OpenAI API key to the .env file to enable AI coaching. 🔑"
              : "I'm having a moment. Try again — I'm always here for you! 💙";
          setMessages((m) =>
            m.map((msg) =>
              msg.id === assistantId ? { ...msg, content: errMsg } : msg
            )
          );
        },
      });
    },
    [messages, streaming, userId, userName]
  );

  const clearHistory = useCallback(() => {
    const welcome: ChatMessage = {
      id: uid(),
      role: 'assistant',
      content: `Fresh start, ${userName}! What are we working on today? 🚀`,
      timestamp: nowISO(),
    };
    setMessages([welcome]);
    saveChatHistory(userId, [welcome]);
  }, [userId, userName]);

  return { messages, streaming, sendMessage, clearHistory };
};
