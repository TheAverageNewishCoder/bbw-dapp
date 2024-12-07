dapp.badbxar.com is now live!

The dapp currently transfers Bad Bxar Wrld's BBW tokens to another account without gas fees for end users.
Below is the general framework that was used to create the dapp. Feel free to use it for your own pruposes.

# A Comprehensive Guide to Creating a dApp on the Ethereum Network Using Node.js v20.13.1 and Hardhat v2.22.17

Decentralized applications (dApps) run on blockchain networks like Ethereum, utilizing smart contracts for decentralized execution. This guide will walk you through creating a dApp on the Ethereum network using **Node.js v20.13.1** and **Hardhat v2.22.17**, incorporating your custom ERC20 token contract. We'll cover setting up your development environment, writing and testing smart contracts, building a frontend with React, and deploying your application.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Setting Up the Development Environment](#setting-up-the-development-environment)
3. [Creating a New Hardhat Project](#creating-a-new-hardhat-project)
4. [Writing the Smart Contract](#writing-the-smart-contract)
5. [Compiling the Smart Contract](#compiling-the-smart-contract)
6. [Testing the Smart Contract](#testing-the-smart-contract)
7. [Deploying the Smart Contract Locally](#deploying-the-smart-contract-locally)
8. [Building the Frontend with React](#building-the-frontend-with-react)
9. [Connecting the Frontend to the Smart Contract](#connecting-the-frontend-to-the-smart-contract)
10. [Deploying to a Test Network](#deploying-to-a-test-network)
11. [Deploying to the Ethereum Mainnet](#deploying-to-the-ethereum-mainnet)
12. [Best Practices and Security Considerations](#best-practices-and-security-considerations)
13. [Resources and Further Reading](#resources-and-further-reading)

---

## Prerequisites

Before you begin, ensure you have the following installed on your machine:

- **Node.js v20.13.1** and **npm** (comes with Node.js)
- **Git** for version control
- A code editor like **Visual Studio Code**
- **MetaMask** extension installed in your web browser

You should also have a basic understanding of:

- JavaScript and Node.js
- Solidity programming language
- Ethereum blockchain concepts

---

## Setting Up the Development Environment

We'll use **Hardhat v2.22.17** as our Ethereum development environment, **Ethers.js** for blockchain interaction, and **React** for the frontend.

### Step 1: Install Node.js v20.13.1

Download and install Node.js v20.13.1 from the [official website](https://nodejs.org/en/download/). Choose the appropriate installer for your operating system.

Verify the installation:

```bash
node -v
# Should output: v20.13.1

npm -v
# Should output the npm version bundled with Node.js v20.13.1
```

### Step 2: Install Git

Download and install Git from the [official website](https://git-scm.com/downloads). Verify the installation:

```bash
git --version
# Should output the Git version installed
```

---

## Creating a New Hardhat Project

### Step 1: Create Project Directory

Create a new directory for your dApp and navigate into it:

```bash
mkdir bbw-dapp
cd bbw-dapp
```

### Step 2: Initialize npm Project

Initialize a new npm project:

```bash
npm init -y
```

This creates a `package.json` file with default settings.

### Step 3: Install Hardhat

Install Hardhat v2.22.17 locally in your project:

```bash
npm install --save-dev hardhat@2.22.17
```

### Step 4: Initialize Hardhat Project

Initialize a Hardhat project:

```bash
npx hardhat
```

You'll be prompted with options:

```
Welcome to Hardhat v2.22.17

? What do you want to do? …
❯ Create a JavaScript project
  Create a TypeScript project
  Create a TypeScript project with Viem support
  Create an empty hardhat.config.js
  Quit
```

Select **"Create a JavaScript project"**.

### Step 5: Install Recommended Dependencies

Hardhat will prompt you to install recommended dependencies. Confirm by pressing **Enter** when asked:

```
Do you want to install this sample project's dependencies with npm (@nomicfoundation/hardhat-toolbox)? (Y/n)
```

Type **Y** and press **Enter**.

This will install `@nomicfoundation/hardhat-toolbox`, which includes useful plugins and libraries.

### Step 6: Project Structure

Your project structure should now look like this:

```
bbw-dapp/
├── contracts/
│   └── Lock.sol
├── scripts/
│   └── deploy.js
├── test/
│   └── Lock.js
├── hardhat.config.js
├── package.json
├── package-lock.json
```

---

## Writing the Smart Contract

We will create your custom ERC20 token contract based on the code you provided.

### Step 1: Install OpenZeppelin Contracts

In your project directory, install OpenZeppelin Contracts:

```bash
npm install @openzeppelin/contracts
```

### Step 2: Create `BBW.sol`

In the `contracts` directory, delete the existing `Lock.sol` file and create a new file named `BBW.sol`:

```bash
rm contracts/Lock.sol
touch contracts/BBW.sol
```

Open `BBW.sol` in your code editor and add the following code:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract BBW is ERC20 {
    constructor(uint256 initialSupply) ERC20("Bad Bxar Wrld", "BBW") {
        _mint(msg.sender, initialSupply);
    }
}
```

This contract creates an ERC20 token named "Bad Bxar Wrld" with the symbol "BBW" and mints the initial supply to the deployer's address.

---

## Compiling the Smart Contract

Compile the contract using Hardhat:

```bash
npx hardhat compile
```

If successful, you should see:

```
Compiled 1 Solidity file successfully
```

The compiled artifacts will be placed in the `artifacts` directory.

---

## Testing the Smart Contract

Writing tests ensures your smart contract behaves as expected.

### Step 1: Write Tests in `test/BBW.js`

Delete the existing `test/Lock.js` file and create a new file `BBW.js` in the `test` directory:

```bash
rm test/Lock.js
touch test/BBW.js
```

Add the following code to `BBW.js`:

```javascript
const { expect } = require("chai");

describe("BBW Token Contract", function () {
  let BBW, bbw, owner, addr1, addr2;

  beforeEach(async function () {
    BBW = await ethers.getContractFactory("BBW");
    [owner, addr1, addr2] = await ethers.getSigners();
    bbw = await BBW.deploy(ethers.utils.parseEther("1000000"));
    await bbw.deployed();
  });

  it("Should assign the total supply to the owner", async function () {
    const ownerBalance = await bbw.balanceOf(owner.address);
    expect(await bbw.totalSupply()).to.equal(ownerBalance);
  });

  it("Should have the correct name and symbol", async function () {
    expect(await bbw.name()).to.equal("Bad Bxar Wrld");
    expect(await bbw.symbol()).to.equal("BBW");
  });

  it("Should transfer tokens between accounts", async function () {
    // Transfer 50 tokens from owner to addr1
    await bbw.transfer(addr1.address, ethers.utils.parseEther("50"));
    const addr1Balance = await bbw.balanceOf(addr1.address);
    expect(addr1Balance).to.equal(ethers.utils.parseEther("50"));

    // Transfer 10 tokens from addr1 to addr2
    await bbw.connect(addr1).transfer(addr2.address, ethers.utils.parseEther("10"));
    const addr2Balance = await bbw.balanceOf(addr2.address);
    expect(addr2Balance).to.equal(ethers.utils.parseEther("10"));
  });
});
```

### Step 2: Run the Tests

Execute:

```bash
npx hardhat test
```

You should see output indicating that the tests have passed.

---

## Deploying the Smart Contract Locally

We will deploy the contract to a local Ethereum network for development and testing purposes.

### Step 1: Start Hardhat Network

In your project directory, run:

```bash
npx hardhat node
```

This starts a local Ethereum node on `http://127.0.0.1:8545`.

### Step 2: Update Deployment Script

Edit the existing `scripts/deploy.js` file to deploy the `BBW` contract:

```javascript
const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();

  console.log("Deploying the contract with the account:", deployer.address);

  const BBW = await hre.ethers.getContractFactory("BBW");
  const bbw = await BBW.deploy(hre.ethers.utils.parseEther("1000000"));

  await bbw.deployed();

  console.log("BBW Token deployed to:", bbw.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
```

### Step 3: Deploy the Contract

Open a new terminal window (keep the Hardhat node running) and run:

```bash
npx hardhat run scripts/deploy.js --network localhost
```

You should see output similar to:

```
Deploying the contract with the account: 0xYourAccountAddress
BBW Token deployed to: 0xYourContractAddress
```

**Note the contract address**, as you'll need it later.

---

## Building the Frontend with React

We'll create a React application to interact with the smart contract.

### Step 1: Initialize a React App

In the root directory (`bbw-dapp`), run:

```bash
npx create-react-app frontend
```

### Step 2: Install Dependencies

Navigate to the `frontend` directory:

```bash
cd frontend
```

Install **Ethers.js**:

```bash
npm install ethers@6.6.3
```

### Step 3: Clean Up the React App

Remove unnecessary files and code:

- Delete `App.test.js`, `logo.svg`, and `setupTests.js` from `src`.
- Remove references to these files in `App.js` and `index.js`.
- Clean up `App.css` and `index.css` as needed.

---

## Connecting the Frontend to the Smart Contract

### Step 1: Obtain Contract ABI and Address

Copy the ABI (Application Binary Interface) from `artifacts/contracts/BBW.sol/BBW.json`. We'll need the `abi` property from this JSON file.

Create a new directory `src/contracts` in your React app and save the `BBW.json` file there.

### Step 2: Update `.env` File

In the `frontend` directory, create a `.env` file to store environment variables:

```dotenv
REACT_APP_BBW_ADDRESS=0xYourContractAddress
```

Replace `0xYourContractAddress` with the contract address obtained during deployment.

### Step 3: Update `App.js`

In `src/App.js`, set up the connection to the Ethereum network and the smart contract:

```javascript
import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import BBW from './contracts/BBW.json';

function App() {
  const [tokenData, setTokenData] = useState({});
  const [account, setAccount] = useState('');
  const bbwAddress = process.env.REACT_APP_BBW_ADDRESS;

  useEffect(() => {
    if (window.ethereum) {
      loadBlockchainData();
    } else {
      alert('Please install MetaMask to use this dApp!');
    }
  }, []);

  async function loadBlockchainData() {
    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' });

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const accountAddress = await signer.getAddress();
      setAccount(accountAddress);

      const bbwContract = new ethers.Contract(bbwAddress, BBW.abi, signer);

      const name = await bbwContract.name();
      const symbol = await bbwContract.symbol();
      const totalSupply = await bbwContract.totalSupply();

      setTokenData({
        name,
        symbol,
        totalSupply: ethers.formatEther(totalSupply),
      });
    } catch (error) {
      console.error('Error loading blockchain data:', error);
    }
  }

  return (
    <div className="App">
      <h1>
        {tokenData.name} ({tokenData.symbol})
      </h1>
      <p>Total Supply: {tokenData.totalSupply}</p>
      <p>Your Account: {account}</p>
    </div>
  );
}

export default App;
```

### Step 4: Run the Frontend

In the `frontend` directory, start the React app:

```bash
npm start
```

Open `http://localhost:3000` in your browser. You should see the token information and your account address.

---

## Deploying to a Test Network

Before deploying to the Ethereum mainnet, it's recommended to test on a public test network like Goerli.

### Step 1: Get Testnet Ether

Acquire some test Ether for Goerli:

- Use a [Goerli faucet](https://goerlifaucet.com/) to get test Ether.

### Step 2: Configure Hardhat for Goerli

Install `dotenv` to manage environment variables:

```bash
npm install --save-dev dotenv
```

Create a `.env` file in the root directory (`bbw-dapp`):

```dotenv
GOERLI_URL=https://eth-goerli.g.alchemy.com/v2/YOUR_ALCHEMY_API_KEY
PRIVATE_KEY=your_private_key
```

- Replace `YOUR_ALCHEMY_API_KEY` with your Alchemy API key (or use Infura).
- Replace `your_private_key` with your wallet's private key (keep this secure and never share it).

### Step 3: Update `hardhat.config.js`

Modify `hardhat.config.js` to include the Goerli network:

```javascript
require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

const { GOERLI_URL, PRIVATE_KEY } = process.env;

module.exports = {
  solidity: "0.8.19",
  networks: {
    goerli: {
      url: GOERLI_URL,
      accounts: [PRIVATE_KEY],
    },
  },
};
```

### Step 4: Deploy to Goerli

Run:

```bash
npx hardhat run scripts/deploy.js --network goerli
```

You should see the deployment output with the contract address.

### Step 5: Update Frontend with New Contract Address

In the `frontend/.env` file, update `REACT_APP_BBW_ADDRESS` with the new contract address.

---

## Deploying to the Ethereum Mainnet

### **Security Warning**: Deploying to the Ethereum mainnet requires real Ether and can have real financial implications. Ensure your smart contract is thoroughly tested and audited before proceeding.

### Step 1: Update `.env` for Mainnet

Add to your `.env` file:

```dotenv
MAINNET_URL=https://mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID
```

Replace `YOUR_INFURA_PROJECT_ID` with your Infura project ID (or use Alchemy).

### Step 2: Update `hardhat.config.js`

Add the mainnet configuration:

```javascript
const { MAINNET_URL } = process.env;

module.exports = {
  // ...existing config
  networks: {
    // ...other networks
    mainnet: {
      url: MAINNET_URL,
      accounts: [PRIVATE_KEY],
    },
  },
};
```

### Step 3: Deploy to Mainnet

Ensure you have sufficient Ether for gas fees.

```bash
npx hardhat run scripts/deploy.js --network mainnet
```

### Step 4: Update Frontend

Update the `REACT_APP_BBW_ADDRESS` in `frontend/.env` with the mainnet contract address.

---

## Best Practices and Security Considerations

- **Secure Private Keys**: Never expose your private keys in code repositories or share them.
- **Use Environment Variables**: Store sensitive data like API keys and private keys in environment variables.
- **Audit Smart Contracts**: Consider having your contracts audited by professionals.
- **Use Established Libraries**: Utilize OpenZeppelin contracts to minimize vulnerabilities.
- **Comprehensive Testing**: Write extensive tests to cover all possible scenarios.
- **Update Dependencies**: Regularly update your dependencies to patch known vulnerabilities.
- **Monitor `npm audit`**: Run `npm audit` to identify and fix vulnerabilities.
- **Avoid Module System Conflicts**: Use CommonJS modules (default in Node.js) to avoid issues with Hardhat.
  - Ensure you do **not** set `"type": "module"` in your `package.json` unless necessary.
  - If using ES modules, rename your Hardhat config and scripts to use the `.cjs` extension and use CommonJS syntax.

---

## Resources and Further Reading

- [Ethereum Documentation](https://ethereum.org/en/developers/)
- [Hardhat Documentation](https://hardhat.org/getting-started/)
- [Ethers.js Documentation](https://docs.ethers.org/v6/)
- [OpenZeppelin Contracts](https://docs.openzeppelin.com/contracts/4.x/)
- [Solidity Documentation](https://docs.soliditylang.org/)
- [MetaMask](https://metamask.io/)

---

**Congratulations!** You've successfully created a dApp on the Ethereum network using your custom `BBW` token contract, Node.js v20.13.1, and Hardhat v2.22.17. This guide provides a foundation, but there's much more to explore, such as integrating additional features, optimizing performance, and ensuring robust security.

---

## Appendix: Dealing with Vulnerabilities and Module System Issues

### Addressing Vulnerabilities

Run `npm audit` to identify vulnerabilities in your dependencies. To fix vulnerabilities:

- Update dependencies to the latest versions.
- Use `npm audit fix` to automatically fix vulnerabilities when possible.
- Manually update or replace packages with known vulnerabilities if no fix is available.

**Example**:

```bash
npm audit fix
```

If vulnerabilities persist:

- Check for updates in the packages' repositories.
- Consider replacing vulnerable packages with alternatives.

### Module System Considerations

Hardhat expects its configuration and scripts to use CommonJS modules.

- **Do not set** `"type": "module"` in your `package.json` unless necessary.
- If you need to use ES modules:

  - Rename `hardhat.config.js` to `hardhat.config.cjs`.
  - Rename scripts and test files to use the `.cjs` extension.
  - Use CommonJS syntax (`require`, `module.exports`) in these files.

---

## Final Notes

- **Stay Informed**: The blockchain space evolves rapidly. Stay updated with the latest tools and best practices.
- **Community Support**: Engage with the developer community through forums, Discord channels, and GitHub repositories.
- **Further Learning**: Explore advanced topics like smart contract security, decentralized storage, and layer 2 solutions.

---

**Need Help?** If you encounter issues or have questions, consider the following resources:

- [Hardhat Discord Server](https://hardhat.org/discord)
- [Ethereum Stack Exchange](https://ethereum.stackexchange.com/)
- [Reddit's r/ethdev](https://www.reddit.com/r/ethdev/)

---

Happy coding and welcome to the world of decentralized applications!
