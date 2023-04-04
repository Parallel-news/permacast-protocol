export async function handle(state, action) {
  const input = action.input;

  if (input.function === "featureChannel") {
    const { jwk_n, sig, payment_txid, pid, period } = input;
    ContractAssert(!!state.free_spots, "ERROR_NO_FREE_SPOTS_AVAILABLE");
    _notSealed();
    ContractAssert(
      typeof period === "number" &&
        Number.isInteger(period) &&
        period > 0 &&
        period <= 100
    );
    await _verifyArSignature(jwk_n, sig);
    const caller = await _ownerToAddress(jwk_n);
    const podcasts = await _getPermacastState();
    const pidIndex = podcasts.findIndex((podcast) => podcast.pid === pid);
    ContractAssert(pidIndex >= 0, "ERROR_PODCAST_NOT_FOUND");
    ContractAssert(
      podcasts[pidIndex].owner === caller ||
        podcasts[pidIndex].maintainers.includes(caller_address),
      "ERROR_INVALID_CALLER"
    );
    ContractAssert(
      podcasts[pidIndex].episodes.length,
      "ERROR_CANNOT_FEATURE_EMPTY_CHANNELS"
    );
    const expectedFee =
      period < 2
        ? state.base_fee
        : period * state.daily_winston_fee + state.base_fee;
    await _validatePayment(caller, payment_txid, expectedFee);

    const creationTimestamp = EXM.getDate().getTime();

    state.featured_channels.push({
      pid: pid,
      payment_txid: payment_txid,
      paid_by: caller,
      start: creationTimestamp,
      expiry: creationTimestamp + 86400 * 1e3 * period,
    });

    state.free_spots -= 1;

    return { state };
  }

  // ADMIN FUNCTIONS
  if (input.function === "addSpots") {
    const { jwk_n, sig, count } = input;
    await _verifyArSignature(jwk_n, sig);
    const caller = await _ownerToAddress(jwk_n);
    ContractAssert(caller === state.admin, "ERROR_INVALID_CALLER");
    ContractAssert(
      typeof count === "number" && Number.isInteger(count) && count > 0
    );
    state.free_spots += count;
    return { state };
  }

  if (input.function === "updatePermacastContract") {
    const { jwk_n, sig, endpoint } = input;
    await _verifyArSignature(jwk_n, sig);
    const caller = await _ownerToAddress(jwk_n);
    ContractAssert(caller === state.admin, "ERROR_INVALID_CALLER");
    ContractAssert(typeof endpoint === "string" && endpoint.trim().length);
    state.permacast_contract = endpoint;
    return { state };
  }

  if (input.function === "sealContract") {
    const { jwk_n, sig } = input;
    await _verifyArSignature(jwk_n, sig);
    const caller = await _ownerToAddress(jwk_n);
    ContractAssert(caller === state.admin, "ERROR_INVALID_CALLER");
    state.sealed = true;
    return { state };
  }

  // READ FUNCTIONS

  if (input.function === "getFeaturedChannel") {
    const callTimestamp = EXM.getDate().getTime();
    const channels = state.featured_channels.filter(
      (channel) => channel.expiry < callTimestamp
    );
    return {
      result: channels,
    };
  }

  function _validateArweaveAddress(address) {
    ContractAssert(
      /[a-z0-9_-]{43}/i.test(address),
      "ERROR_INVALID_ARWEAVE_ADDRESS"
    );
  }

  function _validateOwnerSyntax(owner) {
    ContractAssert(
      typeof owner === "string" && owner?.length === 683,
      "ERROR_INVALID_JWK_N_SYNTAX"
    );
  }

  function _notSealed() {
    ContractAssert(!state.sealed, "ERROR_CONTRACT_SEALED");
  }

  async function _ownerToAddress(pubkey) {
    try {
      _validateOwnerSyntax(pubkey);
      const req = await EXM.deterministicFetch(
        `${state.ar_molecule_endpoint}/ota/${pubkey}`
      );
      const address = req.asJSON()?.address;
      _validateArweaveAddress(address);
      return address;
    } catch (error) {
      throw new ContractError("ERROR_MOLECULE_SERVER_ERROR");
    }
  }

  async function _verifyArSignature(owner, signature) {
    try {
      ContractAssert(
        !state.signatures.includes(signature),
        "ERROR_SIGNATURE_ALREADY_USED"
      );
      const sigBody = state.sig_messages;
      const encodedMessage = new TextEncoder().encode(
        `${sigBody[sigBody.length - 1]}${owner}`
      );
      const typedArraySig = Uint8Array.from(atob(signature), (c) =>
        c.charCodeAt(0)
      );
      const isValid = await SmartWeave.arweave.crypto.verify(
        owner,
        encodedMessage,
        typedArraySig
      );

      ContractAssert(isValid, "ERROR_INVALID_CALLER_SIGNATURE");

      state.signatures.push(signature);
    } catch (error) {
      throw new ContractError("ERROR_INVALID_CALLER_SIGNATURE");
    }
  }

  async function _validatePayment(caller, txid, expectedAmount) {
    try {
      ContractAssert(!state.paid_fees.includes(txid), "ERROR_INVALID_PAYMENT");
      const req = await EXM.deterministicFetch(
        `${state.ever_molecule_endpoint}/${txid}`
      );
      const tx = req.asJSON();
      ContractAssert(
        tx?.tokenSymbol == "AR" &&
          tx?.action === "transfer" &&
          !!Number(tx?.amount) &&
          tx?.to == state.treasury_address &&
          tx?.from === caller,
        "ERROR_INVALID_AR_PRICE"
      );
      ContractAssert(
        Number(tx.amount) >= expectedAmount,
        "ERROR_UNDERPAID_FEE"
      );
      state.paid_fees.push(txid);
    } catch (error) {
      throw new ContractError("ERROR_INVALID_PAYMENT");
    }
  }
  async function _getPermacastState() {
    try {
      const req = await EXM.deterministicFetch(`${state.permacast_contract}`);
      const podcasts = req.asJSON().podcasts;
      return podcasts;
    } catch (error) {
      throw new ContractError("ERROR_MOLECULE_CONNECTION");
    }
  }
}
