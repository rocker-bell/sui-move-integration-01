// export async function uploadToWalrus(text) {
//   const res = await fetch("https://walrus-storage-api.example/upload", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ data: text }),
//   });

//   const json = await res.json();
//   return json.blobId;
// }

// export async function getFromWalrus(blobId) {
//   const res = await fetch(`https://walrus-storage-api.example/blob/${blobId}`);
//   const json = await res.json();
//   return json.data;
// }


// export async function uploadToWalrus(text) {
//   const blobId = "blob_" + crypto.randomUUID();

//   // simulate network delay
//   await new Promise((r) => setTimeout(r, 300));

//   localStorage.setItem(blobId, text);

//   return blobId;
// }

// export async function getFromWalrus(blobId) {
//   return localStorage.getItem(blobId);
// }


// import { WalrusFile } from "@mysten/walrus";
// import { walrusClient } from "./walrusClient";

// export async function uploadToWalrus(text, signer) {
//   const file = WalrusFile.from({
//     contents: new TextEncoder().encode(text),
//     identifier: "task.txt",
//     tags: {
//       "content-type": "text/plain",
//     },
//   });

//   const result = await walrusClient.walrus.writeFiles({
//     files: [file],
//     epochs: 3,
//     deletable: true,
//     signer,
//   });

//   // blobId is what you store in Sui
//   return result[0].blobId;
// }

// export async function getFromWalrus(blobId) {
//   const file = await walrusClient.walrus.getFiles({
//     ids: [blobId],
//   });

//   return file[0].text();
// }


import { WalrusFile } from "@mysten/walrus";
// import { walrusClient } from "./walrusClient";

// export async function uploadToWalrus(text, address) {
//   const file = WalrusFile.from({
//     contents: new TextEncoder().encode(text),
//     identifier: "task.txt",
//     tags: {
//       "content-type": "text/plain",
//       owner: address, // optional, just metadata
//     },
//   });

//   const result = await walrusClient.walrus.writeFiles({
//     files: [file],
//     epochs: 3,
//     deletable: true,
//     // 🚫 NO signer here
//   });

//   return result[0].blobId;
// }

// src/lib/walrus.js

// src/lib/walrus.js
const WALRUS_URL = import.meta.env.VITE_WALRUS_URL;
const WALLET_ADDRESS = import.meta.env.VITE_TESTNET_WALLET;

export async function uploadToWalrus(text, address = WALLET_ADDRESS) {
  const formData = new FormData();
  formData.append("file", new Blob([text], { type: "text/plain" }), "task.txt");

  const res = await fetch(WALRUS_URL, {
    method: "POST",
    body: formData
  });

  if (!res.ok) throw new Error("Failed to upload to Walrus");
  const data = await res.json();
  return data.blobId;
}

export async function getFromWalrus(blobId) {
  const file = await walrusClient.walrus.getFiles({
    ids: [blobId],
  });

  return file[0].text();
}