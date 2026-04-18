import { SuiGrpcClient } from "@mysten/sui/grpc";
import { walrus } from "@mysten/walrus";

export const walrusClient = new SuiGrpcClient({
  network: "testnet",
  baseUrl: "https://fullnode.testnet.sui.io:443",
}).$extend(
  walrus()
);