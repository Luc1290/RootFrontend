import React, { useState } from "react";
import styles from "./Messagedb.module.css";

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
    <div className={styles.container}>
      <h1 className={styles.title}>MessageDB Viewer</h1>

      <div className={styles.controls}>
        <input
          type="password"
          placeholder="X-Admin-Token"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          className={styles.input}
        />
        <button onClick={fetchMessages} disabled={loading || !token} className={styles.button}>
          {loading ? "Chargement..." : "Afficher les messages"}
        </button>
      </div>

      {error && <p className={styles.error}>❌ {error}</p>}

      {messages.length > 0 && (
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Sender</th>
                <th>Source</th>
                <th>Type</th>
                <th>Content</th>
                <th>Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {messages.map((msg) => (
                <tr key={msg.id}>
                  <td>{msg.sender}</td>
                  <td>{msg.source}</td>
                  <td>{msg.type}</td>
                  <td>{msg.content}</td>
                  <td>{new Date(msg.timestamp).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
