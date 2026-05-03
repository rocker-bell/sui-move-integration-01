import * as seal from "@mysten/seal";


export async function encryptTask(text, publicKey) {
  const bytes = new TextEncoder().encode(text);
  return await seal.encrypt(bytes, publicKey);
}

export async function decryptTask(encryptedBytes, privateKey) {
  const decrypted = await seal.decrypt(encryptedBytes, privateKey);
  return new TextDecoder().decode(decrypted);
}