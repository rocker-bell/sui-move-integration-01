
// // File: src/Components/walrus_script.js
// import { uploadToWalrus } from "../lib/walrus.js";

// async function main() {
//   try {
//     const taskText = "This is a test task for Walrus + Sui!";
//     const walletAddress = "0x0d7e763d90abcd3812f32b701b835b71d0889270975fb7e197ec657204259728"; // Replace with your testnet wallet

//     // 1️⃣ Upload to Walrus
//     const blobId = await uploadToWalrus(taskText, walletAddress);
//     console.log("✅ Blob ID from Walrus:", blobId);

//     // 2️⃣ Prepare for Move contract
//     const encoder = new TextEncoder();
//     const blobIdBytes = Array.from(encoder.encode(blobId));
//     console.log("📝 Blob ID as vector<u8> for Sui Move contract:", blobIdBytes);

//     console.log("\n📌 Now you can call create_task(vector<u8>) with this blobIdBytes");
//   } catch (err) {
//     console.error("❌ Error uploading to Walrus:", err);
//   }
// }

// // Run
// main();


// src/Components/walrus_script.js
import { uploadToWalrus } from "../lib/walrus.js";

async function main() {
  try {
    const taskText = "This is a test task for Walrus + Sui!";
    const walletAddress = import.meta.env.VITE_TESTNET_WALLET;

    // 1️⃣ Upload to Walrus
    const blobId = await uploadToWalrus(taskText, walletAddress);
    console.log("✅ Blob ID from Walrus:", blobId);

    // 2️⃣ Prepare for Move contract
    const encoder = new TextEncoder();
    const blobIdBytes = Array.from(encoder.encode(blobId));
    console.log("📝 Blob ID as vector<u8> for Sui Move contract:", blobIdBytes);

    console.log("\n📌 Now you can call create_task(vector<u8>) with this blobIdBytes");
  } catch (err) {
    console.error("❌ Error uploading to Walrus:", err);
  }
}

// Run
main();