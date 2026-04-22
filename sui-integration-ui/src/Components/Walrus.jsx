// import { useState } from "react";
// import { useSignAndExecuteTransaction } from "@mysten/dapp-kit";
// import { uploadToWalrus, getFromWalrus } from "../lib/walrus";
// import { createTaskWalrusTx } from "../contracts/taskContract";

// export default function WalrusDemo() {
//   const { mutate: signAndExecute } = useSignAndExecuteTransaction();

//   const [input, setInput] = useState("");
//   const [tasks, setTasks] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const createTask = async () => {
//     if (!input) return;

//     setLoading(true);

//     try {
//       // 1. Upload to Walrus
//       const blobId = await uploadToWalrus(input);

//       // 2. Send blobId to Sui
//       const tx = createTaskWalrusTx(blobId);

//       await signAndExecute(
//         { transaction: tx },
//         {
//           onSuccess: () => {
//             setTasks((prev) => [
//               ...prev,
//               { blobId, completed: false },
//             ]);
//           },
//         }
//       );

//       setInput("");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const viewTask = async (blobId) => {
//     const data = await getFromWalrus(blobId);
//     alert("Walrus content: " + data);
//   };

//   return (
//     <div style={{ padding: 20 }}>
//       <h2>🌊 Walrus Task Demo</h2>

//       <input
//         value={input}
//         onChange={(e) => setInput(e.target.value)}
//         placeholder="Write task (stored in Walrus)"
//       />

//       <button onClick={createTask} disabled={loading}>
//         {loading ? "Storing..." : "Create Task"}
//       </button>

//       <div style={{ marginTop: 20 }}>
//         {tasks.map((t, i) => (
//           <div key={i} style={{ marginBottom: 10 }}>
//             <span>🧾 Blob: {t.blobId}</span>

//             <button onClick={() => viewTask(t.blobId)}>
//               View from Walrus
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }


// import { useState } from "react";
// import { useSignAndExecuteTransaction } from "@mysten/dapp-kit";
// import { createTaskwalrusTx } from "../contracts/taskContract";
// import { uploadToWalrus, getFromWalrus } from "../lib/walrus";

// export default function WalrusTaskApp() {
//   const { mutate: signAndExecute } = useSignAndExecuteTransaction();

//   const [input, setInput] = useState("");
//   const [tasks, setTasks] = useState([]);

//   const createTask = async () => {
//     if (!input) return;

//     // 1. Upload to Walrus
//     const blobId = await uploadToWalrus(input);

//     // 2. Store ONLY blobId in Sui (encoded as bytes)
//     const encoder = new TextEncoder();
//     const blobBytes = encoder.encode(blobId);

//     const tx = createTaskwalrusTx(Array.from(blobBytes));

//     signAndExecute(
//       { transaction: tx },
//       {
//         onSuccess: () => {
//           setTasks((prev) => [
//             ...prev,
//             { blobId, completed: false },
//           ]);
//         },
//       }
//     );

//     setInput("");
//   };

//   const viewTask = async (blobId) => {
//     const data = await getFromWalrus(blobId);
//     alert("Walrus content: " + data);
//   };

//   return (
//     <div style={{ padding: 20 }}>
//       <h2>🌊 Walrus Task System</h2>

//       <input
//         value={input}
//         onChange={(e) => setInput(e.target.value)}
//         placeholder="Task stored in Walrus"
//       />

//       <button onClick={createTask}>Create Task</button>

//       <div style={{ marginTop: 20 }}>
//         {tasks.map((t, i) => (
//           <div key={i} style={{ marginBottom: 10 }}>
//             <span>🧾 BlobID: {t.blobId}</span>

//             <button onClick={() => viewTask(t.blobId)}>
//               View Walrus Data
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }



import { useState } from "react";
import { useSignAndExecuteTransaction, useCurrentAccount } from "@mysten/dapp-kit";
import { createTaskTx } from "../contracts/taskContract";
import { uploadToWalrus, getFromWalrus } from "../lib/walrus";
import { ConnectButton } from "@mysten/dapp-kit";

export default function WalrusTaskApp() {
  const account = useCurrentAccount();
  const { mutate: signAndExecute } = useSignAndExecuteTransaction();

  const [input, setInput] = useState("");
  const [tasks, setTasks] = useState([]);

  const createTask = async () => {
    if (!input || !account) return;

    // 1. Upload to Walrus (REAL)
    // const blobId = await uploadToWalrus(input, account);
    const blobId = await uploadToWalrus(input, account.address);

    // 2. Store blobId on Sui
    const encoder = new TextEncoder();
    const tx = createTaskTx(Array.from(encoder.encode(blobId)));

    signAndExecute(
      { transaction: tx },
      {
        onSuccess: () => {
          setTasks((prev) => [...prev, { blobId, completed: false }]);
        },
      }
    );

    setInput("");
  };

  const viewTask = async (blobId) => {
    const data = await getFromWalrus(blobId);
    alert(data);
  };

  return (
    <div style={{ padding: 20 }}>
      <div style={{ padding: 20 }}>
  <h2>🌊 Walrus Task App (REAL)</h2>

  <ConnectButton />

  {!account && <p>Connect wallet first</p>} </div>

      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Task stored in Walrus"
      />

      <button onClick={createTask}>Create Task</button>

      <div style={{ marginTop: 20 }}>
        {tasks.map((t, i) => (
          <div key={i}>
            <span>Blob: {t.blobId}</span>
            <button onClick={() => viewTask(t.blobId)}>
              View Walrus Data
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}