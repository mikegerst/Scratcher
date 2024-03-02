# 🎟 Scratch Pad - A Chainlink VRF Powered Lottery Dapp

🍀 Scratch Pad is a blockchain-based lottery game that harnesses the power of Chainlink's Verifiable Random Function (VRF) to ensure each scratch-off is fair and fully transparent. Players can experience the thrill of scratching off tickets with the assurance that the outcome is secure and verifiable. By integrating Particle Network's account abstraction SDK, Scratch Pad offers a simplified and seamless user experience, allowing players to enjoy the game without worrying about gas fees or complex wallet setups.

- 🔐 **Chainlink VRF**: Scratch Pad utilizes Chainlink VRF to generate random numbers needed for the lottery draws, ensuring that each scratch-off result is provably fair and cannot be tampered with by any party. (packages/hardhat/contracts/Scratcher.sol Lines: 154-156 )
- 🧬 **Particle Network SDK**: Our dapp takes advantage of the Particle Network's SDK for account abstraction, enabling a gasless transaction experience and simplifying the onboarding process for users. (packages/nextjs/components/wrappedconnector.tsx)
- 🎨 **Interactive Scratch Mechanism**: Users can scratch-off pictures with a variety of themes, adding a personalized touch to their gaming experience.

## Features

- ⚖️ **Provably Fair Gaming**: Built-in randomness provided by Chainlink VRF for trustworthy outcomes.
- 💳 **Gasless Transactions**: Enjoy the game without worrying about Ethereum gas fees thanks to Particle Network.
- 📲 **User-Friendly Interface**: A straightforward UI/UX that's easy for anyone to pick up and play.
- 🛠️ **Built with Scaffold-ETH 2**: Leverages the latest tools and frameworks for Ethereum development.

## Smart Contracts

- `Scratcher.sol`: Defines the NFT-based scratch-off tickets with Chainlink VRF integration for randomness, and a prize pool for winnings.
- `ScratcherFactory.sol`: A factory contract that deploys individual scratch-off games with unique settings for price, supply, and purchase limits.

## Quickstart

To run Scratch Pad locally:

```bash
git clone https://github.com/scratch-pad/scratch-pad.git
cd scratch-pad
yarn install
yarn chain
yarn deploy
yarn start

Access your dapp at [http://localhost:3000](http://localhost:3000).

## Documentation

For more details on how to use and extend Scratch Pad, visit our [documentation](https://scratch-pad-docs.io).

Discover more features by visiting our [website](https://scratch-pad.io).

## Contributing to Scratch Pad

We value your contributions! Please read our [contribution guidelines](https://github.com/scratch-pad/scratch-pad/blob/main/CONTRIBUTING.md) to get started.

---

🔨 Built with [Scaffold-ETH 2](https://scaffoldeth.io) | 🌍 Deployed on [Arbitrum Sepolia](https://arbitrum.io)

This README provides an overview of the `Scratcher` and `ScratcherFactory` contracts and how they integrate with Chainlink VRF and Particle Network's account abstraction SDK.
