import { createWalletClient, http } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { hardhat } from "viem/chains";
import { createPublicClient } from "viem";
import * as dotenv from "dotenv";
import fs from "fs";

dotenv.config();

// Load env variables
const RPC_URL = process.env.RPC_URL;
const CHAIN_ID = Number(process.env.CHAIN_ID);
const PRIVATE_KEY = process.env.PRIVATE_KEY;

const TOKEN_NAME = process.env.TOKEN_NAME;
const TOKEN_SYMBOL = process.env.TOKEN_SYMBOL;
const TOKEN_CAP = BigInt(process.env.TOKEN_CAP) * 10n ** 18n;
const TOKEN_INITIAL = BigInt(process.env.TOKEN_INITIAL) * 10n ** 18n;

// ABI + Bytecode from Hardhat artifacts
const artifact = JSON.parse(
  fs.readFileSync("./artifacts/contracts/CustomToken.sol/CustomToken.json")
);
const abi = artifact.abi;
const bytecode = artifact.bytecode;

async function main() {
  const account = privateKeyToAccount(PRIVATE_KEY);

  // Wallet client (used to sign & send txs)
  const client = createWalletClient({
    account,
    chain: {
      ...hardhat,
      id: CHAIN_ID,
      rpcUrls: { default: { http: [RPC_URL] } },
    },
    transport: http(RPC_URL),
  });

  // Public client (used to read blockchain state)
  const publicClient = createPublicClient({
    chain: {
      ...hardhat,
      id: CHAIN_ID,
      rpcUrls: { default: { http: [RPC_URL] } },
    },
    transport: http(RPC_URL),
  });

  console.log("Deploying token...");
  const hash = await client.deployContract({
    abi,
    bytecode,
    args: [TOKEN_NAME, TOKEN_SYMBOL, TOKEN_CAP, account.address, TOKEN_INITIAL],
  });

  console.log("Deploy tx hash:", hash);

  // Wait for confirmation
  const receipt = await publicClient.waitForTransactionReceipt({ hash });
  console.log("Deployed at:", receipt.contractAddress);
  console.log("Block number:", receipt.blockNumber);

  console.log(`\n👉 Copy this address into TOKEN_ADDRESS in your .env:\n${receipt.contractAddress}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
