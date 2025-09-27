import dotenv from "dotenv";
dotenv.config();

export default {
  solidity: {
    version: "0.8.24",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    didlab: {
      url: process.env.RPC_URL,
      chainId: Number(process.env.CHAIN_ID),
      accounts: [process.env.PRIVATE_KEY],
    },
  },
};
