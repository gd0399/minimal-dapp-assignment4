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
