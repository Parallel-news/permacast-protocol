import { PERMACAST_CONTRACT_ID } from "./constants.js";
import axios from "axios";
import assert from "node:assert";

export async function getSubdomain(req) {
  try {
    const subdomain = req.headers.host?.split(".")?.[0];
    assert.equal(/^(?!-)[a-zA-Z0-9-]{1,35}(?<!-)$/.test(subdomain), true);
    return subdomain;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function nameToPid(name) {
  try {
    const permacastState = (
      await axios.get(`https://api.exm.dev/read/${PERMACAST_CONTRACT_ID}`)
    )?.data;
    const pid = permacastState?.podcasts?.find(
      (pod) => pod?.label === name
    )?.pid;
    assert.equal(!!pid, true);
    return pid;
  } catch (error) {
    console.log(error);
    return false;
  }
}
