"use client";

import { useState } from "react";
import { generateContentSuggestions } from "@/lib/cohere";
import { Card, Button, Input, Heading, Text, Dialog } from "@/once-ui/components";

export default function ContentGenerator() {
  const [topic, setTopic] = useState("");
  const [suggestions, setSuggestions] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) return;

    setIsLoading(true);
    try {
      const response = await generateContentSuggestions(topic);
      setSuggestions(response);
    } catch (error) {
      setSuggestions("Üzgünüm, içerik üretirken bir hata oluştu. Lütfen tekrar deneyin.");
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
          right: 100,
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
        aria-label={open ? "İçerik Önerisini Kapat" : "İçerik Önerisini Aç"}
      >
        📝
      </button>

      {/* Pop-up İçerik Öneri Kutusu (Dialog ile) */}
      <Dialog isOpen={open} onClose={() => setOpen(false)} title="İçerik Önerileri">
        <div
          style={{
            padding: "1.5rem 0 0 0",
            minHeight: 220,
            maxHeight: 500,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
            <Heading as="h3" variant="display-strong-xs">
              İçerik Önerileri
            </Heading>
          </div>
          <form
            onSubmit={handleSubmit}
            style={{ display: "flex", gap: 8 }}
          >
            <Input
              id="content-generator-input"
              label=""
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="İçerik konusunu girin..."
              disabled={isLoading}
              style={{
                flex: 1,
                borderRadius: 999,
                padding: "12px 18px",
                fontSize: 15,
                background: "#fff",
                border: "1px solid #e5e7eb",
              }}
            />
            <Button
              type="submit"
              disabled={isLoading}
              variant="primary"
              style={{
                borderRadius: 999,
                padding: "0 18px",
                fontWeight: 600,
                fontSize: 15,
              }}
            >
              {isLoading ? "Üretiliyor..." : "İçerik Üret"}
            </Button>
          </form>
          {suggestions && (
            <Card
              style={{
                background: "#f3f4f6",
                borderRadius: 16,
                padding: "16px",
                marginTop: 8,
                boxShadow: "0 2px 8px 0 rgba(31, 38, 135, 0.07)",
              }}
            >
              <Text as="div" style={{ whiteSpace: "pre-wrap", color: "#222" }}>
                {suggestions}
              </Text>
            </Card>
          )}
        </div>
      </Dialog>
    </>
  );
} 