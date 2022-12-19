# NFT Minting and Staking App

**Disclaimer**: This smart contract is not tested or audited by thirdweb. It is not intended for production use cases.

## Introduction

This example demonstrates a use of several thirdweb tools to create an NFT Staking application. In this example, users can stake their ERC721 NFTs and earn ERC20 tokens as a reward. It combines:

1. [thirdweb's NFT Drop Contract](https://portal.thirdweb.com/pre-built-contracts/nft-drop)
2. [thirdweb's Token Contract](https://portal.thirdweb.com/pre-built-contracts/token)
3. A modified version of this [NFT Staking Smart Contract](https://github.com/andreitoma8/ERC721-Staking) by [andreitoma8](https://github.com/andreitoma8/ERC721-Staking)

We deploy the NFT Staking Smart contract using [thirdweb deploy](https://portal.thirdweb.com/thirdweb-deploy) and interact with all three of the contracts using the thirdweb [TypeScript](https://portal.thirdweb.com/typescript) and [React](https://portal.thirdweb.com/react) SDKs.

**Check out the Demo here**: https://nft-staking-contract.thirdweb-example.com/

## Tools

- [**thirdweb Deploy**](https://portal.thirdweb.com/thirdweb-deploy): Deploy our `StakingContract.sol` smart contract with zero configuration by running `npx thirdweb deploy`.
- [**thirdweb React SDK**](https://docs.thirdweb.com/react): to enable users to connect and disconnect their wallets with our website, and interact with our smart contracts using hooks like [useNFTDrop](https://portal.thirdweb.com/react/react.usenftdrop), [useToken](https://portal.thirdweb.com/react/react.usetoken), and [useContract](https://portal.thirdweb.com/react/react.usecontract).


## Deploying the smart contract

We use [thirdweb deploy](https://portal.thirdweb.com/thirdweb-deploy) to deploy the Staking smart contract by running:

```bash
npx thirdweb deploy
```

This provides us with a link to deploy the contract via the [thirdweb dashboard](https://thirdweb.com/dashboard)

## Front-end Application

On the front-end, we connect to all three of our smart contracts and interact with them using thirdweb's SDKs.


### Mint Page

On the [mint.tsx](./pages/mint.tsx), we connect to our NFT Drop contract using the [useNFTDrop](https://portal.thirdweb.com/react/react.usenftdrop) hook.

![Preview of Mint Site!](/public/mint_page.png "Mint Page")

### Stake Page

The staking page connects to all three of our contracts:

1. NFTDrop contract using [useNFTDrop](https://portal.thirdweb.com/react/react.usenftdrop)


![Preview of Stake Site!](/public/staked_nfts.png "Mint Page")

![Preview of Mint Site!](/public/unstaked_nfts.png "Mint Page")