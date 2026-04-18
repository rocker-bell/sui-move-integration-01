import { useState } from 'react';
import { useTasks } from '../hooks/useTasks';
import { createTaskTx, completeTaskTx } from '../contracts/taskContract';
import { useSignAndExecuteTransaction, useCurrentAccount } from '@mysten/dapp-kit';
import { ConnectButton } from '@mysten/dapp-kit';
export default function TaskApp() {
    console.log("🔥 TaskApp MOUNTED");
  const account = useCurrentAccount();
  console.log("👛 account:", account);
  const { tasks, reload } = useTasks(account?.address);
  console.log("📦 tasks:", tasks);
  const { mutate: signAndExecute } = useSignAndExecuteTransaction();

  const [input, setInput] = useState("");

  const createTask = () => {
    const tx = createTaskTx(input);

    signAndExecute(
      { transaction: tx },
      { onSuccess: reload }
    );

    setInput("");
  };

  const completeTask = (id) => {
    const tx = completeTaskTx(id);

    signAndExecute(
      { transaction: tx },
      { onSuccess: reload }
    );
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Task Manager</h2>
        <ConnectButton />
      {!account && <p>❌ Wallet not connected</p>}

      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="New task"
      />
      <button onClick={createTask}>Create</button>

      <div style={{ marginTop: 20 }}>
        {tasks.map((t, i) => (
          <div key={i}>
            <span>
              {new TextDecoder().decode(new Uint8Array(t.fields.description))}
            </span>

            {!t.fields.completed && (
              <button onClick={() => completeTask(t.objectId)}>
                Complete
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}