// // import * as seal from "@mysten/seal";

// import { SealClient } from "@mysten/seal";

// const seal = new SealClient();

// export async function encryptTask(text, publicKey) {
//   const bytes = new TextEncoder().encode(text);
//   return await seal.encrypt(bytes, publicKey);
// }

// export async function decryptTask(encryptedBytes, privateKey) {
//   const decrypted = await seal.decrypt(encryptedBytes, privateKey);
//   return new TextDecoder().decode(decrypted);
// }


// import * as seal from "@mysten/seal";

// /**
//  * Encrypt task (Seal SDK wrapper-safe)
//  */
// export async function encryptTask(text, publicKey) {
//   const bytes = new TextEncoder().encode(text);

//   // Safe guard: check API shape
//   if (typeof seal.encrypt === "function") {
//     return await seal.encrypt(bytes, publicKey);
//   }

//   throw new Error(
//     "Seal encrypt API not available in current SDK build"
//   );
// }

// /**
//  * Decrypt task
//  */
// export async function decryptTask(encryptedBytes, privateKey) {
//   if (typeof seal.decrypt === "function") {
//     const decrypted = await seal.decrypt(encryptedBytes, privateKey);
//     return new TextDecoder().decode(decrypted);
//   }

//   throw new Error(
//     "Seal decrypt API not available in current SDK build"
//   );
// }


// export async function encryptTask(text) {
//   // demo "encryption" (safe, stable, no SDK dependency)
//   const bytes = new TextEncoder().encode(text);
//   return Array.from(bytes); // store as vector<u8>-friendly
// }

// export async function decryptTask(bytes) {
//   return new TextDecoder().decode(new Uint8Array(bytes));
// }


import { fromHex } from "@mysten/sui/utils";
import { Transaction } from "@mysten/sui/transactions";

// NOTE: this assumes real Seal client usage
// (you will pass it from dapp-kit context later)


export async function decryptTask(client, encryptedBytes, sessionKey, txBytes) {
  const decryptedBytes = await client.decrypt({
    data: encryptedBytes,
    sessionKey,
    txBytes,
  });

  return new TextDecoder().decode(decryptedBytes);
}

export async function encryptTask(client, data, policy) {
  const encoded = new TextEncoder().encode(data);

  const { encryptedObject, key } = await client.encrypt({
    threshold: policy.threshold ?? 1,
    packageId: fromHex(policy.packageId),
    id: fromHEX(policy.id),
    data: encoded,
  });

  return {
    encryptedObject,
    backupKey: key,
  };
}