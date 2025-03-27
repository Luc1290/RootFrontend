import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function MessageDB() {
  const [token, setToken] = useState("");
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchMessages = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/messages", {
        headers: {
          "X-Admin-Token": token,
        },
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error || "Erreur lors de la récupération des messages.");
      }

      const data = await response.json();
      setMessages(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">MessageDB Viewer</h1>

      <div className="flex gap-2 mb-4">
        <Input
          type="password"
          placeholder="X-Admin-Token"
          value={token}
          onChange={(e) => setToken(e.target.value)}
        />
        <Button onClick={fetchMessages} disabled={loading || !token}>
          {loading ? "Chargement..." : "Afficher les messages"}
        </Button>
      </div>

      {error && <p className="text-red-500 mb-2">❌ {error}</p>}

      {messages.length > 0 && (
        <div className="overflow-auto border rounded-xl">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="p-2">Sender</th>
                <th className="p-2">Source</th>
                <th className="p-2">Type</th>
                <th className="p-2">Content</th>
                <th className="p-2">Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {messages.map((msg) => (
                <tr key={msg.id} className="border-t">
                  <td className="p-2 whitespace-nowrap">{msg.sender}</td>
                  <td className="p-2 whitespace-nowrap">{msg.source}</td>
                  <td className="p-2 whitespace-nowrap">{msg.type}</td>
                  <td className="p-2 whitespace-pre-wrap max-w-xs">{msg.content}</td>
                  <td className="p-2 whitespace-nowrap">{new Date(msg.timestamp).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
