import { readFileSync } from "fs";

import {
  TestFunction,
  createWrite,
  FunctionType,
} from "@execution-machine/sdk";

const createPodcast = {
  function: "createPodcast",
  jwk_n: "YOUR_ARWEAVE_PUBLIC_KEY",
  name: "PODCAST NAME",
  desc: "PODCAST DESCRIPTION",
  author: "YOU?",
  lang: "en",
  isExplicit: "yes",
  categories: "Technology",
  email: "",
  contentType: "a",
  cover: "ARWEAVE_TXID",
  master_network: "EVM",
  network: "ethereum",
  token: "eth",
  txid: "ETH_PAYMENT_TXID",
  sig: "YOUR_SIGNED_MESSAGE",
};

const testAttempt = await TestFunction({
  functionSource: readFileSync("../permacast-contract/factory.js"),
  functionType: FunctionType.JAVASCRIPT,
  functionInitState: JSON.parse(
    readFileSync("../permacast-contract/factory.json", "utf-8")
  ),
  writes: [createWrite(createPodcast)],
});

console.log(testAttempt.state);
