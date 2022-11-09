<p align="center">
  <a href="https://permacast.dev">
    <img src="./img/pc-icons/logo192.png" height="124">
  </a>
  <p align="center">A Novel Protocol For Permanent Podcasting Storage & Indexing</p>
</p>

## Synopsis
Permacast is a new protocol that empowers podcasting and facilitates a secure, anti-censorship, private, and permanent storage for podcasts, in addition to content indexing, discovery, and interoperability with web2 podcasting infrastructure. To learn more about Permacast, visit our [website](https://permacast.dev)

## Build and Test Locally

```console
git pull https://github.com/parallel-news/permacast-protocol.git

npm install

npm run local-test

```
Then you can add and test all of the contract's functions locally from [src/local-testing/contract.tests.js](./src/local-testing/contract.tests.js).


## PC Amber (testnet) & PC Bloodstone (mainnet)

Permacast's state (testnet and mainnet) is relatively related to the technical protocol stage.

| Feature/Specification  | Amber | Bloodstone |
| ------------- |:-------------:| ------------- |
| Smart Contract Protocol     | [SmartWeave](https://github.com/ArweaveTeam/SmartWeave)  |  [EXM](https://exm.dev) |
| Storage Payment Token |  Arweave (AR) | multi-token via [Bundlr](https://bundlr.network) |
| Episode Tokenization      | [aNFT (Atomic NFT)](https://atomicnft.com/en/)     |  [NEP-171](https://github.com/near/NEPs/discussions/171) |
| Source Code | [contract](https://github.com/Parallel-news/permacastV2/blob/main/v3/v3.js) | [contract](./permacast-contract) |
| Factory Structure | Seprarated disttributed factories that inherits the same source code | a single factory indexing all of the podcasts | 
| Techstack | Arweave (L1) | Arweave (Bundlr - EXM) - Near (Mintbase) - Multichain (Fees Handler Node) | 
| Interaction Fee Reduction | N/A | -20x |
| Instant State Evaluation      |  ❌  |✔️ |
| Gasless Contract Interaction 	|	❌ | ✔️	|
| Interaction Success Guarantee (blockchain network level) | ❌ | ✔️ |

## Podcast Creation Fee Handler

A flat fee pegged to US Dollar should be paid and attached to the contract creation function invocation as an anti-spam mechanism for Permacast. The payment processing node allows the user to pay in several tokens (EVM and non-EVM possibilities). Check the node [repo](https://github.com/Parallel-news/permacast-fees-handler)

## License
This protocol is licensed under the [MIT License](./LICENSE)