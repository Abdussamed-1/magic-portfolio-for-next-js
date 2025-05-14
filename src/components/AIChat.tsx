"use client";

import { useState, useEffect } from 'react';
import { chat } from '@/lib/cohere';
import { Card, Button, Input, Heading, Dialog } from "@/once-ui/components";

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

type CohereMessage = {
  role: 'USER' | 'CHATBOT';
  message: string;
};

export default function AIChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);

  // İlk açılışta karşılama pop-up'ı göster
  useEffect(() => {
    if (typeof window !== 'undefined' && !localStorage.getItem('aiChatWelcomeClosed')) {
      const timer = setTimeout(() => {
        setShowWelcome(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleWelcomeClose = () => {
    setShowWelcome(false);
    if (typeof window !== 'undefined') {
      localStorage.setItem('aiChatWelcomeClosed', '1');
    }
  };

  const handleWelcomeStart = () => {
    setShowWelcome(false);
    setOpen(true);
    if (typeof window !== 'undefined') {
      localStorage.setItem('aiChatWelcomeClosed', '1');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const chatHistory: CohereMessage[] = messages.map(msg => ({
        role: msg.role === 'user' ? 'USER' : 'CHATBOT',
        message: msg.content
      }));
      const response = await chat(input, chatHistory);
      const assistantMessage: Message = { role: 'assistant', content: response };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      const errorMessage: Message = {
        role: 'assistant',
        content: 'Üzgünüm, bir hata oluştu. Lütfen tekrar deneyin.'
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Aç/Kapa Butonu */}
      <button
        onClick={() => setOpen(true)}
        style={{
          position: "fixed",
          bottom: 32,
          right: 32,
          zIndex: 1001,
          background: "#2563eb",
          color: "#fff",
          borderRadius: "50%",
          width: 56,
          height: 56,
          boxShadow: "0 4px 16px rgba(31,38,135,0.15)",
          border: "none",
          fontSize: 28,
          cursor: "pointer",
        }}
        aria-label={open ? "Sohbeti Kapat" : "Sohbeti Aç"}
      >
        💬
      </button>

      {/* Karşılama Pop-up'ı */}
      <Dialog isOpen={showWelcome} onClose={handleWelcomeClose} title="AI Asistan">
        <div style={{ padding: '1.5rem 0 0 0', minWidth: 260, textAlign: 'center' }}>
          <p style={{ fontSize: 18, marginBottom: 24 }}>Sohbet etmek ister misiniz?</p>
          <Button variant="primary" style={{ marginRight: 12 }} onClick={handleWelcomeStart}>
            Başla
          </Button>
          <Button variant="secondary" onClick={handleWelcomeClose}>
            Kapat
          </Button>
        </div>
      </Dialog>

      {/* Pop-up Chat Kutusu (Dialog ile) */}
      <Dialog isOpen={open} onClose={() => setOpen(false)} title="AI Asistan ile Sohbet">
        <div
          style={{
            padding: "1.5rem 0 0 0",
            minHeight: 320,
            maxHeight: 500,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
            {/* Başlık Dialog'da */}
          </div>
          <div
            style={{
              flex: 1,
              overflowY: "auto",
              marginBottom: 12,
              paddingRight: 2,
              minHeight: 120,
            }}
          >
            {messages.map((message, idx) => (
              <div
                key={idx}
                style={{
                  display: "flex",
                  justifyContent: message.role === 'user' ? 'flex-end' : 'flex-start',
                  marginBottom: 8
                }}
              >
                <div
                  style={{
                    maxWidth: "75%",
                    borderRadius: 16,
                    padding: "10px 18px",
                    background:
                      message.role === 'user'
                        ? 'linear-gradient(90deg, #2563eb 0%, #60a5fa 100%)'
                        : '#f3f4f6',
                    color: message.role === 'user' ? '#fff' : '#222',
                    fontSize: 15,
                    boxShadow: '0 2px 8px 0 rgba(31, 38, 135, 0.07)',
                    borderBottomRightRadius: message.role === 'user' ? 4 : 16,
                    borderBottomLeftRadius: message.role === 'assistant' ? 4 : 16,
                  }}
                >
                  {message.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div style={{ display: "flex", justifyContent: "flex-start" }}>
                <div
                  style={{
                    background: '#f3f4f6',
                    color: '#222',
                    borderRadius: 16,
                    padding: '10px 18px',
                    fontSize: 15,
                    opacity: 0.7,
                  }}
                >
                  Düşünüyor...
                </div>
              </div>
            )}
          </div>
          <form
            onSubmit={handleSubmit}
            style={{ display: "flex", gap: 8 }}
          >
            <Input
              id="ai-chat-input"
              label=""
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Mesajınızı yazın..."
              disabled={isLoading}
              style={{
                flex: 1,
                borderRadius: 999,
                padding: '12px 18px',
                fontSize: 15,
                background: '#fff',
                border: '1px solid #e5e7eb',
              }}
            />
            <Button
              type="submit"
              disabled={isLoading}
              variant="primary"
              style={{
                borderRadius: 999,
                padding: '0 18px',
                fontWeight: 600,
                fontSize: 15,
              }}
            >
              Gönder
            </Button>
          </form>
        </div>
      </Dialog>
    </>
  );
} 