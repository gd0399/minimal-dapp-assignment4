import { createPublicClient, http } from "viem";
import dotenv from "dotenv";
dotenv.config();

async function main() {
  const rpcUrl = process.env.RPC_URL;
  const chainId = Number(process.env.CHAIN_ID);

  const publicClient = createPublicClient({
    chain: {
      id: chainId,
      name: "DIDLab",
      network: "didlab",
      nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
      rpcUrls: { default: { http: [rpcUrl] } },
    },
    transport: http(rpcUrl),
  });

  // Replace with whichever account address you want to check
  const address = "0xF0f2576E1d7c7A55A5A0C05FF94C07aA148592b7"; // Account #5
  const balance = await publicClient.getBalance({ address });

  console.log(`Balance of ${address}:`, balance.toString(), "wei");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
