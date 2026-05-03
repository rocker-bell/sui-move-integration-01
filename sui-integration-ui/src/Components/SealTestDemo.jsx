import React, { useState } from "react";
import { encryptTask, decryptTask } from "../lib/seal";
import { createTaskTx } from "../contracts/taskContract";

export default function SealTestDemo({ sealClient }) {
  const [input, setInput] = useState("");
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);

  // ➕ CREATE
  const handleCreate = async () => {
    if (!input || !sealClient) return;

    try {
      setLoading(true);

      const policy = {
        threshold: 1,
        packageId: "0x1",
        id: "0x2",
      };

      // ✅ FIX: pass client FIRST consistently
      const encrypted = await encryptTask(sealClient, input, policy);

      // store as bytes for Sui
      const tx = createTaskTx(
        new TextEncoder().encode(JSON.stringify(encrypted))
      );

      setTasks((prev) => [
        ...prev,
        {
          id: Date.now(),
          encrypted,
          tx,
          decrypted: null,
        },
      ]);

      setInput("");
    } catch (err) {
      console.error("Create failed:", err);
    } finally {
      setLoading(false);
    }
  };

  // 🔓 DECRYPT
  const handleDecrypt = async (index) => {
    try {
      const task = tasks[index];

      const txBytes = new Uint8Array([]); // demo only
      const sessionKey = "demo-session";

      const decrypted = await decryptTask(
        sealClient,
        task.encrypted.encryptedObject,
        sessionKey,
        txBytes
      );

      const updated = [...tasks];
      updated[index].decrypted = decrypted;

      setTasks(updated);
    } catch (err) {
      console.error("Decrypt failed:", err);
    }
  };

  return (
    <div style={styles.container}>
      <h2>Seal Test Demo</h2>

      <div style={styles.inputBox}>
        <input
          style={styles.input}
          value={input}
          placeholder="Enter task..."
          onChange={(e) => setInput(e.target.value)}
        />

        <button style={styles.button} onClick={handleCreate}>
          {loading ? "Encrypting..." : "Create Encrypted Task"}
        </button>
      </div>

      <div style={styles.list}>
        {tasks.map((task, i) => (
          <div key={task.id} style={styles.card}>
            <p><b>Encrypted:</b></p>
            <pre style={styles.code}>
              {JSON.stringify(task.encrypted, null, 2)}
            </pre>

            {task.decrypted ? (
              <p>
                <b>Decrypted:</b> {task.decrypted}
              </p>
            ) : (
              <button
                style={styles.smallBtn}
                onClick={() => handleDecrypt(i)}
              >
                Decrypt
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: { padding: 20, fontFamily: "Arial" },
  inputBox: { display: "flex", gap: 10, marginBottom: 20 },
  input: { flex: 1, padding: 10, border: "1px solid #ccc" },
  button: { padding: "10px 15px", cursor: "pointer" },
  list: { marginTop: 20 },
  card: { border: "1px solid #ddd", padding: 10, marginBottom: 10 },
  code: { background: "#f5f5f5", padding: 10, fontSize: 12 },
  smallBtn: { padding: "5px 10px", cursor: "pointer" },
};