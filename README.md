<p align="center">
  <a href="https://permacast.app">
    <img src="./img/pc-icons/logo192.png" height="124">
  </a>
  <p align="center">A Novel Protocol For Permanent Podcasting Storage & Indexing</p>
</p>

## Synopsis
Permacast is a new protocol that empowers podcasting and facilitates a secure, anti-censorship, private, and permanent storage for podcasts, in addition to content indexing, discovery, and interoperability with web2 podcasting infrastructure. To learn more about Permacast, visit our [website](https://permacast.app)

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
| ------------- |:-------------:| :-------------: |
| Smart Contract Protocol     | [SmartWeave](https://github.com/ArweaveTeam/SmartWeave)  |  [EXM](https://exm.dev) |
| Storage Payment Token |  Arweave (AR) | AR L2 via [EverFinance](https://ever.vision/#/) |
| Source Code | [contract](https://github.com/Parallel-news/permacastV2/blob/main/v3/v3.js) | [contract](./permacast-contract) |
| Factory Structure | Seprarated distributed factories that inherits the same source code | a single factory indexing all of the podcasts | 
| Techstack | Arweave (L1) | Arweave (EverFinance - EXM - Molecule) | 
| Interaction Fee Reduction | N/A | -20x |
| Instant State Evaluation      |  ❌  |✔️ |
| Gasless Contract Interaction 	|	❌ | ✔️	|
| Interaction Success Guarantee (blockchain network level) | ❌ | ✔️ |

### Bloodstone Mainnet V2
- Contract address: [zVgwbAUeYaYeZiRnv1Lqg4yLELC7OXsPDMhdfmQHTG4](https://api.exm.dev/read/zVgwbAUeYaYeZiRnv1Lqg4yLELC7OXsPDMhdfmQHTG4)
- soft-fork Blockheight: `#1149699`

## License
This protocol is licensed under the [MIT License](./LICENSE)
