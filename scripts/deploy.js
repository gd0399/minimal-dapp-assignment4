import { createWalletClient, createPublicClient, http } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { artifacts } from "hardhat";
import dotenv from "dotenv";

dotenv.config();

async function main() {
  // Load env variables
  const rpcUrl = process.env.RPC_URL;
  const chainId = Number(process.env.CHAIN_ID);
  const privateKey = process.env.PRIVATE_KEY;   // ✅ new style

  if (!privateKey) {
    throw new Error("❌ No private key found in .env (PRIVATE_KEY missing)");
  }

  const account = privateKeyToAccount(privateKey);

  console.log("🔑 Using deployer account:", account.address);

  // Create wallet + public clients
  const walletClient = createWalletClient({
    account,
    chain: {
      id: chainId,
      name: "DIDLab",
      network: "didlab",
      nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
      rpcUrls: { default: { http: [rpcUrl] } },
    },
    transport: http(rpcUrl),
  });

  const publicClient = createPublicClient({
    chain: walletClient.chain,
    transport: http(rpcUrl),
  });

  // Compile artifacts
  const contractName = "MyToken";
  const artifact = await artifacts.readArtifact(contractName);

  // Prepare constructor args
  const tokenName = process.env.TOKEN_NAME;
  const tokenSymbol = process.env.TOKEN_SYMBOL;
  const tokenCap = BigInt(process.env.TOKEN_CAP || process.env.TOKEN_SUPPLY) * 10n ** 18n;
  const tokenInitial = BigInt(process.env.TOKEN_INITIAL || process.env.TOKEN_SUPPLY) * 10n ** 18n;

  console.log("🚀 Deploying contract:", tokenName, tokenSymbol);

  // Deploy contract
  const hash = await walletClient.deployContract({
    abi: artifact.abi,
    bytecode: artifact.bytecode,
    args: [tokenName, tokenSymbol, tokenCap, account.address, tokenInitial],
  });

  console.log("📤 Deploy tx hash:", hash);

  const receipt = await publicClient.waitForTransactionReceipt({ hash });
  console.log("✅ Deployed address:", receipt.contractAddress);
  console.log("📦 Block number:", receipt.blockNumber);
}

main().catch((err) => {
  console.error("❌ Error:", err);
  process.exit(1);
});
