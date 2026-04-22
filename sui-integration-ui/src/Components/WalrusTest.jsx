import { useEffect } from "react";
import { uploadToWalrus } from "../lib/walrus.js";

export default function WalrusTest() {
  useEffect(() => {
    async function run() {
      const blobId = await uploadToWalrus("Hello from Vite frontend!");
      console.log("Blob ID:", blobId);
    }
    run();
  }, []);

  return <p>Check console for blobId</p>;
}