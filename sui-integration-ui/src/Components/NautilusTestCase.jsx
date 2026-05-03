import React, { useState } from "react";
import { encryptTask, decryptTask } from "../lib/seal";
import { createTaskTx } from "../contracts/taskContract";

export default function NautilusDemo({ sealClient, wallet }) {
  const [input, setInput] = useState("");
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);

  // ➕ CREATE + EXECUTE TX
  const handleCreate = async () => {
    if (!input || !sealClient || !wallet) {
      console.log("Missing dependencies", { input, sealClient, wallet });
      return;
    }

    try {
      setLoading(true);

      const policy = {
        threshold: 1,
        packageId: "0x1",
        id: "0x2",
      };

      // 1️⃣ Encrypt
      const encrypted = await encryptTask(sealClient, input, policy);

      if (!encrypted?.encryptedObject) {
        throw new Error("Encryption failed");
      }

      console.log("Encrypted:", encrypted);

      // 2️⃣ Create TX (STRING, not bytes)
      const tx = createTaskTx(JSON.stringify(encrypted));

      // 3️⃣ Execute TX (CRITICAL)
      const result = await wallet.signAndExecuteTransaction({
        transaction: tx,
      });

      console.log("TX Result:", result);

      // 4️⃣ Extract txBytes (depends on wallet adapter)
      const txBytes =
        result?.rawTransaction ||
        result?.transactionBytes ||
        new Uint8Array([]);

      // 5️⃣ Store everything needed for decrypt
      setTasks((prev) => [
        ...prev,
        {
          id: Date.now(),
          encrypted,
          txBytes,
          decrypted: null,
        },
      ]);

      setInput("");
    } catch (err) {
      console.error("Create failed:", err);
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  // 🔓 DECRYPT
  const handleDecrypt = async (index) => {
    try {
      const task = tasks[index];

      if (!task.txBytes?.length) {
        throw new Error("Missing txBytes (transaction not executed?)");
      }

      // ✅ Use REAL key from encryption
      const sessionKey = task.encrypted.backupKey;

      const decrypted = await decryptTask(
        sealClient,
        task.encrypted.encryptedObject,
        sessionKey,
        task.txBytes
      );

      const updated = [...tasks];
      updated[index].decrypted = decrypted;

      setTasks(updated);
    } catch (err) {
      console.error("Decrypt failed:", err);
      alert(err.message);
    }
  };

  return (
    <div style={styles.container}>
      <h2>🔐 Nautilus Prototype (Correct Flow)</h2>

      <div style={styles.inputBox}>
        <input
          style={styles.input}
          value={input}
          placeholder="Enter task..."
          onChange={(e) => setInput(e.target.value)}
        />

        <button style={styles.button} onClick={handleCreate}>
          {loading ? "Processing..." : "Create Encrypted Task"}
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