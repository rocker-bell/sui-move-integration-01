// import { useState } from "react";
// import { useSignAndExecuteTransaction, useCurrentAccount } from "@mysten/dapp-kit";
// import { createTaskTx } from "../contracts/taskContract";
// import { uploadToWalrus, getFromWalrus } from "../lib/walrus.js";

// export default function WalrusTaskApp() {
//   const account = useCurrentAccount();
//   const { mutate: signAndExecute } = useSignAndExecuteTransaction();

//   const [input, setInput] = useState("");
//   const [tasks, setTasks] = useState([]);

//   const signer = account && {
//   toSuiAddress: () => account.address,

//   signAndExecuteTransaction: async ({ transaction }) => {
//     return new Promise((resolve, reject) => {
//       signAndExecute(
//         { transaction },
//         {
//           onSuccess: (res) => resolve(res),
//           onError: reject,
//         }
//       );
//     });
//   },
// };

//   const createTask = async () => {
//     if (!input || !account) return;

//     // 1. Upload to Walrus (REAL)
//     const blobId = await uploadToWalrus(input, signer);


//     console.log("BLOBID", blobId)
//     // 2. Store blobId on Sui
//     const encoder = new TextEncoder();
//     const tx = createTaskTx(Array.from(encoder.encode(blobId)));

//     signAndExecute(
//       { transaction: tx },
//       {
//         onSuccess: () => {
//           setTasks((prev) => [...prev, { blobId, completed: false }]);
//         },
//       }
//     );

//     setInput("");
//   };

//   const viewTask = async (blobId) => {
//     const data = await getFromWalrus(blobId);
//     alert(data);
//   };

//   return (
//     <div style={{ padding: 20 }}>
//       <h2>🌊 Walrus Task App (REAL)</h2>

//       {!account && <p>Connect wallet first</p>}

//       <input
//         value={input}
//         onChange={(e) => setInput(e.target.value)}
//         placeholder="Task stored in Walrus"
//       />

//       <button onClick={createTask}>Create Task</button>

//       <div style={{ marginTop: 20 }}>
//         {tasks.map((t, i) => (
//           <div key={i}>
//             <span>Blob: {t.blobId}</span>
//             <button onClick={() => viewTask(t.blobId)}>
//               View Walrus Data
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }


// test 2


// // src/WalrusTaskApp.jsx
// import { useState } from "react";
// import { useCurrentAccount, useSignAndExecuteTransaction } from "@mysten/dapp-kit";
// import { WalrusFile } from "@mysten/walrus";
// import { createWalrusClient } from "@mysten/walrus";
// import { SuiClient } from "@mysten/sui/client";

// // --- Initialize clients ---
// // Sui RPC client (Testnet)
// const suiClient = new SuiClient({
//   url: "https://fullnode.testnet.sui.io:443",
// });

// // Walrus client built on top of Sui client
// const walrusClient = createWalrusClient({ client: suiClient });

// export default function WalrusTaskApp() {
//   const account = useCurrentAccount();
//   const { mutate: signAndExecute } = useSignAndExecuteTransaction();

//   const [input, setInput] = useState("");
//   const [blobData, setBlobData] = useState(null);

//   // Signer object for Walrus
//   const signer = account && {
//     toSuiAddress: () => account.address,
//     signAndExecuteTransaction: async ({ transaction }) => {
//       return new Promise((resolve, reject) => {
//         signAndExecute({ transaction }, {
//           onSuccess: (res) => resolve(res),
//           onError: reject,
//         });
//       });
//     },
//   };

//   // Upload text to Walrus
//   const uploadToWalrus = async (text) => {
//     if (!signer) throw new Error("Wallet not connected!");

//     const file = WalrusFile.from({
//       contents: new TextEncoder().encode(text),
//       identifier: "task.txt",
//       tags: { "content-type": "text/plain" },
//     });

//     const result = await walrusClient.walrus.writeFiles({
//       files: [file],
//       epochs: 2, // 2-day storage
//       deletable: true,
//       signer,
//     });

//     return result[0]; // Contains blobId & suiObjectId
//   };

//   // Retrieve blob contents
//   const readFromWalrus = async (blobId) => {
//     const files = await walrusClient.walrus.getFiles({ ids: [blobId] });
//     return await files[0].text();
//   };

//   // Handle form submit
//   const handleSubmit = async () => {
//     if (!input) return;

//     try {
//       const { blobId, objectId: suiObjectId } = await uploadToWalrus(input);
//       setBlobData({ blobId, suiObjectId });
//       setInput("");
//     } catch (err) {
//       console.error("Upload failed:", err);
//     }
//   };

//   const handleRetrieve = async () => {
//     if (!blobData) return;

//     const content = await readFromWalrus(blobData.blobId);
//     alert(`Blob content: ${content}`);
//   };

//   return (
//     <div style={{ padding: 20 }}>
//       <h2>🌊 Walrus Task App (Testnet)</h2>
//       {!account && <p>Connect your wallet first</p>}

//       <input
//         value={input}
//         onChange={(e) => setInput(e.target.value)}
//         placeholder="Type task here"
//       />
//       <button onClick={handleSubmit}>Upload Task</button>

//       {blobData && (
//         <div style={{ marginTop: 20 }}>
//           <p><strong>Blob ID:</strong> {blobData.blobId}</p>
//           <p><strong>Sui Object ID:</strong> {blobData.suiObjectId}</p>
//           <button onClick={handleRetrieve}>Retrieve Blob</button>
//         </div>
//       )}
//     </div>
//   );
// }


// import { useState } from "react";
// import { useSignAndExecuteTransaction, useCurrentAccount } from "@mysten/dapp-kit";
// import { createTaskTx } from "../contracts/taskContract";
// import { WalrusFile, createWalrusClient } from "@mysten/walrus";
// import { JsonRpcProvider } from "@mysten/sui";

// // --- Setup Walrus client ---
// const suiClient = new JsonRpcProvider("https://fullnode.testnet.sui.io:443");
// export const walrusClient = createWalrusClient({ client: suiClient });

// // --- Helper functions ---
// export async function uploadToWalrus(text, signer) {
//   const file = WalrusFile.from({
//     contents: new TextEncoder().encode(text),
//     identifier: "task.txt",
//     tags: { "content-type": "text/plain" },
//   });

//   const result = await walrusClient.walrus.writeFiles({
//     files: [file],
//     epochs: 3,
//     deletable: true,
//     signer,
//   });

//   // result[0] has blobId and suiObjectId
//   return result[0];
// }

// export async function getFromWalrus(blobId) {
//   const file = await walrusClient.walrus.getFiles({ ids: [blobId] });
//   return file[0].text();
// }

// // --- React Component ---
// export default function WalrusTaskApp() {
//   const account = useCurrentAccount();
//   const { mutate: signAndExecute } = useSignAndExecuteTransaction();

//   const [input, setInput] = useState("");
//   const [tasks, setTasks] = useState([]);

//   const signer = account && {
//     toSuiAddress: () => account.address,
//     signAndExecuteTransaction: async ({ transaction }) =>
//       new Promise((resolve, reject) => {
//         signAndExecute(
//           { transaction },
//           { onSuccess: resolve, onError: reject }
//         );
//       }),
//   };

//   const createTask = async () => {
//     if (!input || !account) return;

//     // 1. Upload to Walrus (REAL Testnet)
//     const { blobId, suiObjectId } = await uploadToWalrus(input, signer);

//     console.log("BLOBID:", blobId, "SUI Object ID:", suiObjectId);

//     // 2. Store blobId on Sui
//     const encoder = new TextEncoder();
//     const tx = createTaskTx(Array.from(encoder.encode(blobId)));

//     signAndExecute(
//       { transaction: tx },
//       {
//         onSuccess: () => {
//           setTasks((prev) => [...prev, { blobId, suiObjectId, completed: false }]);
//         },
//       }
//     );

//     setInput("");
//   };

//   const viewTask = async (blobId) => {
//     const data = await getFromWalrus(blobId);
//     alert(data);
//   };

//   return (
//     <div style={{ padding: 20 }}>
//       <h2>🌊 Walrus Task App (REAL Testnet)</h2>

//       {!account && <p>Connect wallet first</p>}

//       <input
//         value={input}
//         onChange={(e) => setInput(e.target.value)}
//         placeholder="Task stored in Walrus"
//       />
//       <button onClick={createTask}>Create Task</button>

//       <div style={{ marginTop: 20 }}>
//         {tasks.map((t, i) => (
//           <div key={i}>
//             <span>Blob: {t.blobId}</span> | <span>SuiObj: {t.suiObjectId}</span>
//             <button onClick={() => viewTask(t.blobId)}>View Walrus Data</button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }


// src/Components/Walrus.jsx
import { useState } from "react";
import { useSignAndExecuteTransaction, useCurrentAccount } from "@mysten/dapp-kit";
import { createTaskTx } from "../contracts/taskContract";
import { WalrusFile, createWalrusClient } from "@mysten/walrus";
import { JsonRpcProvider } from "@mysten/sui.js"; // ✅ browser-compatible client

// --- Setup Walrus client ---
const suiClient = new JsonRpcProvider("https://fullnode.testnet.sui.io:443");
export const walrusClient = createWalrusClient({ client: suiClient });

// --- Helper functions ---
export async function uploadToWalrus(text, signer) {
  const file = WalrusFile.from({
    contents: new TextEncoder().encode(text),
    identifier: "task.txt",
    tags: { "content-type": "text/plain" },
  });

  const result = await walrusClient.walrus.writeFiles({
    files: [file],
    epochs: 3,
    deletable: true,
    signer,
  });

  // result[0] contains blobId and suiObjectId
  return result[0];
}

export async function getFromWalrus(blobId) {
  const file = await walrusClient.walrus.getFiles({ ids: [blobId] });
  return file[0].text();
}

// --- React Component ---
export default function WalrusTaskApp() {
  const account = useCurrentAccount();
  const { mutate: signAndExecute } = useSignAndExecuteTransaction();

  const [input, setInput] = useState("");
  const [tasks, setTasks] = useState([]);

  const signer = account && {
    toSuiAddress: () => account.address,
    signAndExecuteTransaction: async ({ transaction }) =>
      new Promise((resolve, reject) => {
        signAndExecute({ transaction }, { onSuccess: resolve, onError: reject });
      }),
  };

  const createTask = async () => {
    if (!input || !account) return;

    try {
      // 1️⃣ Upload to Walrus (REAL Testnet)
      const { blobId, suiObjectId } = await uploadToWalrus(input, signer);

      console.log("BLOBID:", blobId, "SUI Object ID:", suiObjectId);

      // 2️⃣ Store blobId on Sui
      const encoder = new TextEncoder();
      const tx = createTaskTx(Array.from(encoder.encode(blobId)));

      signAndExecute({ transaction: tx }, {
        onSuccess: () => {
          setTasks((prev) => [...prev, { blobId, suiObjectId, completed: false }]);
        },
        onError: (err) => console.error("Failed to store task on Sui:", err),
      });

      setInput("");
    } catch (err) {
      console.error("Walrus upload failed:", err);
      alert("Failed to upload to Walrus. Check console for details.");
    }
  };

  const viewTask = async (blobId) => {
    try {
      const data = await getFromWalrus(blobId);
      alert(data);
    } catch (err) {
      console.error("Failed to retrieve from Walrus:", err);
      alert("Failed to retrieve blob. Check console for details.");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>🌊 Walrus Task App (Testnet)</h2>

      {!account && <p>Connect your wallet first</p>}

      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Task stored in Walrus"
        style={{ width: "300px", marginRight: "10px" }}
      />
      <button onClick={createTask}>Create Task</button>

      <div style={{ marginTop: 20 }}>
        {tasks.map((t, i) => (
          <div key={i} style={{ marginBottom: "10px" }}>
            <span>Blob: {t.blobId}</span> | <span>SuiObj: {t.suiObjectId}</span>
            <button
              style={{ marginLeft: "10px" }}
              onClick={() => viewTask(t.blobId)}
            >
              View Walrus Data
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}