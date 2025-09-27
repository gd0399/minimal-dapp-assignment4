<<<<<<< HEAD
# Sample Hardhat 3 Beta Project (`node:test` and `viem`)

This project showcases a Hardhat 3 Beta project using the native Node.js test runner (`node:test`) and the `viem` library for Ethereum interactions.

To learn more about the Hardhat 3 Beta, please visit the [Getting Started guide](https://hardhat.org/docs/getting-started#getting-started-with-hardhat-3). To share your feedback, join our [Hardhat 3 Beta](https://hardhat.org/hardhat3-beta-telegram-group) Telegram group or [open an issue](https://github.com/NomicFoundation/hardhat/issues/new) in our GitHub issue tracker.

## Project Overview

This example project includes:

- A simple Hardhat configuration file.
- Foundry-compatible Solidity unit tests.
- TypeScript integration tests using [`node:test`](nodejs.org/api/test.html), the new Node.js native test runner, and [`viem`](https://viem.sh/).
- Examples demonstrating how to connect to different types of networks, including locally simulating OP mainnet.

## Usage

### Running Tests

To run all the tests in the project, execute the following command:

```shell
npx hardhat test
```

You can also selectively run the Solidity or `node:test` tests:

```shell
npx hardhat test solidity
npx hardhat test nodejs
```

### Make a deployment to Sepolia

This project includes an example Ignition module to deploy the contract. You can deploy this module to a locally simulated chain or to Sepolia.

To run the deployment to a local chain:

```shell
npx hardhat ignition deploy ignition/modules/Counter.ts
```

To run the deployment to Sepolia, you need an account with funds to send the transaction. The provided Hardhat configuration includes a Configuration Variable called `SEPOLIA_PRIVATE_KEY`, which you can use to set the private key of the account you want to use.

You can set the `SEPOLIA_PRIVATE_KEY` variable using the `hardhat-keystore` plugin or by setting it as an environment variable.

To set the `SEPOLIA_PRIVATE_KEY` config variable using `hardhat-keystore`:

```shell
npx hardhat keystore set SEPOLIA_PRIVATE_KEY
```

After setting the variable, you can run the deployment with the Sepolia network:

```shell
npx hardhat ignition deploy --network sepolia ignition/modules/Counter.ts
```
=======
# Assignment 4 — Minimal DApp

> **Note:** I originally attempted to deploy on **Team 12’s DIDLab link**, but it was not working smoothly with ERC-20 transactions. Therefore, I switched to **Team 1’s DIDLab chain** for this submission.

---

## Team Information
- **Team Number:** 01  
- **RPC Endpoint:** [Team 1 DIDLab RPC URL]  
- **Chain ID (decimal):** 31337  
- **Chain ID (hex):** 0x7A69  
- **Token Address:** `0x23a3ca711f4ad7593b9558ff5e03b035b97da023`  
- **Token Name/Symbol:** CampusCredit (CAMP)  
- **Token Decimals:** 18  

---

## How to Run Locally

1. Clone/unzip the project folder:
   ```bash
   git clone <your-repo-url>
   cd erc20-didlab
   ```

2. Start a local server (choose one):
   - Using Python:
     ```bash
     python3 -m http.server 8000
     ```
   - Or with Node:
     ```bash
     npm install -g serve
     serve .
     ```

3. Open in browser:
   ```
   http://localhost:8000
   ```

4. Ensure **MetaMask** is installed and configured.

---

## Features

- Connects to MetaMask and switches to DIDLab Team 1 chain.  
- Loads and displays ERC-20 token details (name, symbol, decimals).  
- Shows balance of connected account.  
- Allows transfer of tokens (recipient + amount).  
- Displays transaction hash, mined block, and gas used.  
- Button to add token to MetaMask (`wallet_watchAsset`).  
- Refresh button for updated balances.  

---

## Screenshots
- Connected state (account & network).  
- Token loaded (name/symbol/decimals).  
- Transfer confirmation (tx hash, block number, gas).  
- (Optional) Token added in MetaMask.  

*(Insert screenshots here)*

---

## Short Note

**Extra UX touches:**  
- Added **Refresh Balance** button.  
- Status messages after each action (connect, load token, transfer).  
- Display of **transaction hash**, **block number**, and **gas used**.  

**Issues faced:**  
- Team 12’s DIDLab RPC endpoint had problems with ERC-20 interactions → switched to Team 1.  
- Decimals handling issues fixed by converting to `10^18` units.  
- Occasional MetaMask network switch bug fixed with explicit `wallet_addEthereumChain`.  
>>>>>>> 78640455d2fc44736825ff85041d0ef903bf58b4
