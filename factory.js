/**
 *
 *
 *
 *
 *
 *               ██████╗░███████╗██████╗░███╗░░░███╗░█████╗░░█████╗░░█████╗░░██████╗████████╗
 *               ██╔══██╗██╔════╝██╔══██╗████╗░████║██╔══██╗██╔══██╗██╔══██╗██╔════╝╚══██╔══╝
 *               ██████╔╝█████╗░░██████╔╝██╔████╔██║███████║██║░░╚═╝███████║╚█████╗░░░░██║░░░
 *               ██╔═══╝░██╔══╝░░██╔══██╗██║╚██╔╝██║██╔══██║██║░░██╗██╔══██║░╚═══██╗░░░██║░░░
 *               ██║░░░░░███████╗██║░░██║██║░╚═╝░██║██║░░██║╚█████╔╝██║░░██║██████╔╝░░░██║░░░
 *               ╚═╝░░░░░╚══════╝╚═╝░░╚═╝╚═╝░░░░░╚═╝╚═╝░░╚═╝░╚════╝░╚═╝░░╚═╝╚═════╝░░░░╚═╝░░░
 *
 *                         A Novel Protocol For Permanent Podcasting Storage & Indexing
 *
 * @version Mainnet V1 - Bloodstone Version
 * @author charmful0x
 * @website permacast.dev
 * @license MIT
 *
 **/

export async function handle(state, action) {
  const input = action.input;

  // STATE
  const podcasts = state.podcasts;
  const limitations = state.limitations;
  const signatures = state.signatues;
  const admins = state.admins;
  const admins_signatures = state.admins_signatures;
  const user_sig_messages = state.user_sig_messages;
  const admin_sig_messages = state.admin_sig_messages;
  const stores = state.stores;
  const paid_fees = state.paid_fees;
  const isPaused = state.isPaused;

  // LIMITATION METADATA STATE ACCESS
  const POD_NAME_LIMITS = limitations["podcast_name_len"];
  const POD_DESC_LIMITS = limitations["podcast_desc_len"];
  const EP_NAME_LIMITS = limitations["episode_name_len"];
  const EP_DESC_LIMITS = limitations["episode_desc_len"];
  const AUTHOR_NAME_LIMITS = limitations["author_name_len"];
  const LANG_CHAR_LIMITS = limitations["lang_char_code"];
  const CATEGORY_LIMITS = limitations["categories"];
  const PID_LIMITS = limitations["pid"];

  // ERRORS List
  const ERROR_INVALID_CALLER = `ERROR_THEPUBKEY_OF_THE_CALLER_IS_NOT_ALLOWED_TO_CALL_THIS_FUNCTION`;
  const ERROR_INVALID_PRIMITIVE_TYPE = `ERROR_THE_PASSED_FUNCTION_ARGUMENT_IS_NOT_A_SCOPE_VALID_PRIMITIVE_TYPE`;
  const ERROR_INVALID_STRING_LENGTH = `ERROR_THE_STRING_LITERAL_IS_OUT_OF_THE_ALLOWED_STR_LEN`;
  const ERROR_MIME_TYPE = `ERROR_THE_MIME_TYPE_IS_NOT_SPPORTED`;
  const ERROR_PID_NOT_FOUND = `ERROR_CANNOT_FIND_PODCAST_WITH_THE_GIVEN_PID`;
  const ERROR_EID_NOT_FOUND = `ERROR_CANNOT_FIND_EPISODE_WITH_THE_GIVEN_EID`;
  const ERROR_PID_OF_EID_NOT_FOUND = `ERROR_CANNOT_FIND_PODCAST_WITH_THE_GIVEN_EID`;
  const ERROR_INVALID_ARWEAVE_ADDRESS = `ERROR_INVALID_ARWEAVE_ADDRESS_TRANSACTION_SYNTAX`;
  const ERROR_NO_MAINTAINERS_PROVIDED = `ERROR_NO_MAINTAINER_PUBKEY_WAS_PROVIDED`;
  const ERROR_MAINTAINER_ALREADY_ADDED = `ERROR_GIVEN_MAINTAINER_PUBKEY_ALREADY_ADDED`;
  const ERROR_MAINTAINER_CANNOT_BE_OWNER = `ERROR_PODCAST_OWNER_CANNOT_BE_MAINTAINER`;
  const ERROR_MAINTAINER_NOT_FOUND = `ERROR_NO_MAINTAINER_FOUND_WITH_THE_GIVEN_PUBKEY`;
  const ERROR_INVALID_NEW_EP_INDEX = `ERROR_INVALID_NEW_INDEX_FOR_THE_EPISODE`;
  const ERROR_NO_EP_INDEX_CHANGE = `ERROR_NEW_AND_OLD_EPISODE_INDEX_ARE_EQUAL`;
  const ERROR_LIMITATIONS_NOT_INTEGERS = `ERROR_LIMITATIONS_MUST_BE_INTEGERS`;
  const ERROR_INVALID_SIG_TYPE = `ERROR_INVALID_SIGNATURE_TYPE`;
  const ERROR_INVALID_MODIFICATION_ACTION = `ERROR_INVALID_MODIFICATION_ACTION_ADD_OR_REMOVE`;
  const ERROR_INVALID_STORE_SYNTAX = `ERROR_STORE_MUST_BE_STRING`;
  const ERROR_STORE_ALREADY_ADDED = `ERROR_STORE_ALREADY_ADDED_TO_STORES`;
  const ERROR_STORE_NOT_EXISTING = `ERROR_CANNOT_FIND_STORE_WITH_GIVER_NAME`;
  const ERROR_INVALID_ENDPOINT_SYNTAX = `ERROR_GIVEN_PROXY_ENDPOINT_NOT_URL`;
  const ERROR_INVALID_TOKEN_TICKER = `ERROR_TOKEN_TICKER_EMPTY`;
  const ERROR_TOKEN_ALREADY_ADDED = `ERROR_THE_GIVEN_TOKEN_TICKER_EXISTS`;
  const ERROR_TOKEN_NOT_FOUND = `ERROR_TOKEN_TICKER_NOT_EXISTING`;
  const ERROR_INVALID_NETWORK_NAME = `ERROR_NETWORK_NAME_CANNOT_BE_EMPTY_STR`;
  const ERROR_NETWORK_ALREADY_ADDED = `ERROR_NETWORK_ALREADY_EXISTS`;
  const ERROR_NETWORK_NOT_FOUND = `ERROR_CANNOT_FIND_NETWORK_WITH_GIVER_NAME`;
  const ERROR_SIG_COMPOUND_DUPLICATION = `ERROR_CONTRACT_ADMIN_CANNOT_SELF_TOKENIZE_EPISODES`;
  const ERROR_INVALID_STORE = `ERROR_GIVEN_STORE_NOT_SUPPORTED`;
  const ERROR_EPISODE_ALREADY_TOKENIZED = `ERROR_GIVEN_EPISODE_ALREADY_TOKENIZED`;
  const ERROR_INVALID_JWK_N_SYNTAX = `ERROR_INVALID_ARWEAVE_PUBKEY_SYNTAX`;
  const ERROR_INVALID_LIMITATIONS_ORDER = `ERROR_INVALID_LIMITS_MIN_MAX_ORDER`;
  const ERROR_INVALID_CALLER_SIGNATURE = `ERROR_GIVEN_SIGNATURE_NOT_SIGNED_WITH_GIVEN_PUBKEY`;
  const ERROR_SIGNATURE_ALREADY_USED = `ERROR_REENTRANCY_SIGNATURE_USAGE`;
  const ERROR_INVALID_TOKEN_ID_SYNTAX = `ERROR_TOKEN_ID_MUST_BE_INTEGER`;
  const ERROR_EP_TOKENIZATION_DUPLICATION = `ERROR_EPISODE_ALREADY_TOKENIZED`;
  const ERROR_INVALID_MASTER_NETWORK = `ERROR_MASTER_NETWORK_NAME_INVALID`;
  const ERROR_UNSUPPORTED_NETWORK = `ERROR_GIVEN_NETWORK_NOT_SUPPORTED`;
  const ERROR_UNSUPPORTED_TOKEN = `ERROR_GIVEN_TOKEN_NOT_SUPPORTED`;
  const ERROR_REENTRANCY_FEE = `ERROR_PODCAST_CREATION_FEE_ALREADY_USED`;
  const ERROR_INVALID_PAYMENT = `ERROR_PAYMENT_TX_DROPPED_OR_PENDING_UNDERPAID`;
  const ERROR_CONTRACT_PAUSED = `ERROR_CANNOT_INVOKE_FUNCTION_WHILE_CONTRACT_IS_PAUSED`;

  if (input.function === "createPodcast") {
    /**
     * @dev create a podcast object and append it to
     * the smart contract state (Factory). Only the podcast owner
     * and its maintainers can perform write acions.
     *
     * @param name podcast name
     * @param desc podcast description
     * @param author podcast author
     * @param lang language char code (ISO 639-1:2002)
     * @param isExplicit indicates the existence of
     * explicit content, used for RSS feed generating
     * @param categories RSS supported categories strings
     * @param email author email address
     * @param cover Arweave data TXID of type `image/*`
     * @param contentType 'a' or 'v' indication audio or
     * video (content type) that will be supported in this podcast.
     * @param maintainers a string of maintainers comma separated
     * @param jwk_n the public key of the caller
     * @param sig a message signed by the caller's public key
     * @param master_network master network key for the fee payment
     * @param network token's network of the fee payment
     * @param token fee payment token ticker
     * @param txid the transaction ID of the fee payment
     *
     * @return state
     **/

    const name = input.name;
    const description = input.desc;
    const author = input.author;
    const lang = input.lang;
    const isExplicit = input.isExplicit;
    const categories = input.categories;
    const email = input.email;
    const cover = input.cover;
    const maintainers = input?.maintainers;
    const jwk_n = input.jwk_n;
    const sig = input.sig;
    const master_network = input.master_network;
    const network = input.network;
    const token = input.token;
    const txid = input.txid;

    let maintainersArray = [];

    const contentType = input.contentType === "a" ? "audio/" : "video/";
    _notPaused();
    _validateOwnerSyntax(jwk_n);
    await _verifyArSignature(jwk_n, sig);
    await _validatePayment(master_network, network, token, txid);

    const pid = SmartWeave.transaction.id;

    _validateStringTypeLen(
      description,
      POD_DESC_LIMITS.min,
      POD_DESC_LIMITS.max
    );

    _validateStringTypeLen(name, POD_NAME_LIMITS.min, POD_NAME_LIMITS.max);
    _validateStringTypeLen(
      author,
      AUTHOR_NAME_LIMITS.min,
      AUTHOR_NAME_LIMITS.max
    );
    _validateStringTypeLen(email, 0, 320);
    _validateStringTypeLen(
      categories,
      CATEGORY_LIMITS.min,
      CATEGORY_LIMITS.max
    );
    _validateStringTypeLen(cover, 43, 43);
    _validateStringTypeLen(lang, LANG_CHAR_LIMITS.min, LANG_CHAR_LIMITS.max);

    ContractAssert(
      ["yes", "no"].includes(isExplicit),
      ERROR_INVALID_PRIMITIVE_TYPE
    );

    if (maintainers?.length) {
      maintainersArray = maintainers.split(",").map((addr) => addr.trim());

      for (const maintainer of maintainersArray) {
        _validateArweaveAddress(maintainer);
      }
    }

    podcasts.push({
      pid: pid,
      contentType: contentType,
      createdAt: EXM.getDate().getTime(),
      index: _getPodcastIndex(), // id equals the index of the podacast obj in the podcasts array
      owner: jwk_n,
      podcastName: name,
      author: author,
      email: email,
      description: description,
      language: lang,
      explicit: isExplicit,
      categories: categories.split(",").map((category) => category.trim()),
      maintainers: maintainersArray,
      cover: cover,
      isVisible: true,
      episodes: [],
    });

    return { state };
  }

  if (input.function === "addEpisode") {
    /**
     * @dev create an episode object and append
     *  it to a podcast object's episodes array
     *  Maintainers and Podcast owner can invoke
     *  this function.
     *
     * @param pid podcast ID (pid). 43 chars string
     * @param name episode name
     * @param content episode audio's or video's Arweave TXID
     * @param desc the episode's description
     * @param mimetype the Content-Type of episode's content
     * @param jwk_n the public key of the caller
     * @param sig a message signed by the caller's public key
     *
     * @return state
     **/

    const pid = input.pid;
    const name = input.name;
    const description = input.desc;
    const content = input.content;
    const mimeType = input.mimeType; // !!MUST VALIDATED SOMEHOW BY ADMIN!!
    const jwk_n = input.jwk_n;
    const sig = input.sig;

    _validateOwnerSyntax(jwk_n);
    _notPaused();
    await _verifyArSignature(jwk_n, sig);

    const eid = SmartWeave.transaction.id;
    const pidIndex = _getAndValidatePidIndex(pid);

    ContractAssert(
      podcasts[pidIndex]["owner"] === jwk_n ||
        podcasts[pidIndex]["maintainers"].includes(jwk_n),
      ERROR_INVALID_CALLER
    );

    // episode's description is extracted from the
    // interaction's TX body data.
    _validateStringTypeLen(description, EP_DESC_LIMITS.min, EP_DESC_LIMITS.max);

    _validateStringTypeLen(name, EP_NAME_LIMITS.min, EP_NAME_LIMITS.max);
    _validateStringTypeLen(content, 43, 43);
    _validateStringTypeLen(pid, PID_LIMITS.min, PID_LIMITS.max);

    const podcastContentType = podcasts[pidIndex]["contentType"];

    ContractAssert(mimeType.startsWith(podcastContentType), ERROR_MIME_TYPE);

    podcasts[pidIndex]["episodes"].push({
      eid: SmartWeave.transaction.id,
      episodeName: name,
      description: description,
      contentTx: content,
      uploader: jwk_n,
      uploadedAt: EXM.getDate().getTime(),
      isVisible: true,
    });

    return { state };
  }

  if (input.function === "addMaintainers") {
    /**
     * @dev the podcast owner adding maintainers to
     * the podcast's maintainers array.
     *
     * @param pid podcast ID
     * @param maitainers string of maintainers comma separated
     * @param jwk_n the public key of the caller
     * @param sig a message signed by the caller's public key
     *
     * @return state
     *
     **/
    const maintainers = input.maintainers;
    const pid = input.pid;
    const jwk_n = input.jwk_n;
    const sig = input.sig;

    _validateOwnerSyntax(jwk_n);
    _notPaused();
    await _verifyArSignature(jwk_n, sig);

    const pidIndex = _getAndValidatePidIndex(pid);

    ContractAssert(podcasts[pidIndex]["owner"] === jwk_n, ERROR_INVALID_CALLER);
    ContractAssert(maintainers.length, ERROR_NO_MAINTAINERS_PROVIDED);

    const maintainersArray = maintainers.split(",").map((addr) => addr.trim());

    for (const maintainer of maintainersArray) {
      _validateOwnerSyntax(maintainer);
      ContractAssert(
        !podcasts[pidIndex]["maintainers"].includes(maintainer),
        ERROR_MAINTAINER_ALREADY_ADDED
      );
      ContractAssert(
        maintainer !== podcasts[pidIndex]["owner"],
        ERROR_MAINTAINER_CANNOT_BE_OWNER
      );
    }

    const newMaintainersArray =
      podcasts[pidIndex]["maintainers"].concat(maintainersArray);

    podcasts[pidIndex]["maintainers"] = newMaintainersArray;

    return { state };
  }

  if (input.function === "removeMaintainer") {
    /**
     * @dev the podcast owner removing maintainers
     * from the podcast's maintainers array.
     *
     * @param pid podcast ID
     * @param address maintainer's public key
     * @param jwk_n the public key of the caller
     * @param sig a message signed by the caller's public key
     *
     * @return state
     *
     **/
    const pid = input.pid;
    const address = input.address; // jwk_n of the address
    const jwk_n = input.jwk_n;
    const sig = input.sig;

    _validateOwnerSyntax(jwk_n);
    _validateOwnerSyntax(address);
    _notPaused();
    await _verifyArSignature(jwk_n, sig);

    const pidIndex = _getAndValidatePidIndex(pid);
    const podcast = podcasts[pidIndex];
    const maintainerIndex = podcast["maintainers"].findIndex(
      (maintainer) => maintainer === address
    );

    ContractAssert(podcast["owner"] === jwk_n, ERROR_INVALID_CALLER);
    ContractAssert(maintainerIndex >= 0, ERROR_MAINTAINER_NOT_FOUND);

    podcast["maintainers"].splice(maintainerIndex, 1);

    return { state };
  }

  if (input.function === "editPodcastMetadata") {
    /**
     * @dev podcast's owner can modify an episode's metadata
     *
     * @param pid podcast PID
     * @param name podcast name (new value)
     * @param desc podcast description (new value)
     * @param author podcast author name (new value)
     * @param lang podcast language code (new value)
     * @param isExplicit podcast explicity (for RSS, new value)
     * @param email podcast email address (new value)
     * @param cover the TXID of the new podcast cover
     * @param isVisible podcast's visibility (new value)
     * @param categories comma separated string of podcast categories
     * @param jwk_n the caller public key
     * @param sig a message signed by the caller's public key
     *
     * @return state
     *
     **/

    const pid = input.pid;
    const name = input.name;
    const description = input.desc;
    const author = input.author;
    const lang = input.lang;
    const isExplicit = input.isExplicit;
    const email = input.email;
    const cover = input.cover;
    const isVisible = input.isVisible;
    let categories = input.categories;
    const jwk_n = input.jwk_n;
    const sig = input.sig;

    _validateOwnerSyntax(jwk_n);
    _notPaused();
    await _verifyArSignature(jwk_n, sig);

    const pidIndex = _getAndValidatePidIndex(pid);
    const podcast = podcasts[pidIndex];

    ContractAssert(podcast["owner"] === jwk_n, ERROR_INVALID_CALLER);

    if (name) {
      _validateStringTypeLen(name, POD_NAME_LIMITS.min, POD_NAME_LIMITS.max);
      podcast["podcastName"] = name;
    }

    if (description) {
      _validateStringTypeLen(
        description,
        POD_DESC_LIMITS.min,
        POD_DESC_LIMITS.max
      );
      podcast["description"] = description;
    }

    if (author) {
      _validateStringTypeLe(
        author,
        AUTHOR_NAME_LIMITS.min,
        AUTHOR_NAME_LIMITS.max
      );
      podcast["author"] = author;
    }

    if (email) {
      _validateStringTypeLen(email, 0, 320);
      podcast["email"] = email;
    }

    if (cover) {
      _validateArweaveAddress(cover);
      podcast["cover"] = cover;
    }

    if (lang) {
      _validateStringTypeLen(lang, 2, 2);
      podcast["language"] = lang;
    }

    if (isExplicit) {
      ContractAssert(
        ["yes", "no"].includes(isExplicit),
        ERROR_INVALID_PRIMITIVE_TYPE
      );
      podcast["explicit"] = isExplicit;
    }

    if (categories) {
      ContractAssert(categories.length, "ERROR_NO_CATEGORY_PROVIDED");
      podcast["categories"] = categories
        .split(",")
        .map((category) => category.trim());
    }

    if (isVisible) {
      ContractAssert(
        [true, false].includes(isVisible),
        ERROR_INVALID_PRIMITIVE_TYPE
      );
      podcast["isVisible"] = isVisible;
    }

    return { state };
  }

  if (input.function === "editEpisodeMetadata") {
    /**
     * @dev podcast owner editing an episode's metadata
     *
     * @param eid episode's EID
     * @param name episode's name (new value)
     * @param desc episode's description (new value)
     * @param isVisible episode's visibility (new value)
     * @param jwk_n the public key of the caller
     * @param sig a message signed by the caller's public key
     *
     * @return state
     *
     **/
    const eid = input.eid;
    const name = input.name;
    const description = input.desc;
    const isVisible = input.isVisible;
    const jwk_n = input.jwk_n;
    const sig = input.sig;

    _validateOwnerSyntax(jwk_n);
    _notPaused();
    await _verifyArSignature(jwk_n, sig);

    const pid = _getPidOfEid(eid);
    const pidIndex = _getAndValidatePidIndex(pid);
    const eidIndex = _getAndValidateEidIndex(eid, pidIndex);

    ContractAssert(podcasts[pidIndex]["owner"] === jwk_n, ERROR_INVALID_CALLER);
    const episode = podcasts[pidIndex]["episodes"][eidIndex];

    if (name) {
      _validateStringTypeLen(name, EP_NAME_LIMITS.min, EP_NAME_LIMITS.max);
      episode["episodeName"] = name;
    }

    if (description) {
      _validateStringTypeLen(
        description,
        EP_DESC_LIMITS.min,
        EP_DESC_LIMITS.max
      );
      episode["description"] = description;
    }

    if (isVisible) {
      ContractAssert(
        [true, false].includes(isVisible),
        ERROR_INVALID_PRIMITIVE_TYPE
      );
      episode["isVisible"] = isVisible;
    }

    return { state };
  }

  if (input.function === "changeEpisodeIndex") {
    /**
     * @dev change the episodes order of episodes of a
     * podcast by changing an episode's index
     *
     * @param eid episode EID
     * @param newIndex integer of the new episode index
     * @param jwk_n the public key of the caller
     * @param sig a message signed by the caller's public key
     *
     * @retun state
     *
     **/

    const eid = input.eid;
    const newIndex = input.newIndex;
    const jwk_n = input.jwk_n;
    const sig = input.sig;

    _validateOwnerSyntax(jwk_n);
    _notPaused();
    await _verifyArSignature(jwk_n, sig);

    ContractAssert(Number.isInteger(newIndex), ERROR_INVALID_PRIMITIVE_TYPE);

    const pid = _getPidOfEid(eid);
    const pidIndex = _getAndValidatePidIndex(pid);
    const eidIndex = _getAndValidateEidIndex(eid, pidIndex);

    const podcast = podcasts[pidIndex];

    ContractAssert(podcast["owner"] === jwk_n, ERROR_INVALID_CALLER);
    ContractAssert(
      0 <= newIndex && newIndex < podcast["episodes"].length,
      ERROR_INVALID_NEW_EP_INDEX
    );
    ContractAssert(newIndex !== eidIndex, ERROR_NO_EP_INDEX_CHANGE);

    // copy the episode
    const episode = podcast["episodes"][eidIndex];

    // move the episode backward/forward
    podcast["episodes"].splice(eidIndex, 1);
    podcast["episodes"].splice(newIndex, 0, episode);
  }

  // COMPOUND FUNCTION (USER + ADMIN)

  if (input.function === "tokenizeEpisode") {
    /**
     * @dev a function of compound verification
     * that requires both of the user's signature
     * to verify his intention to tokenize one of his
     * podcast non-tokenized episodes, and the contract's
     * admin to ensure that the tokenized episode gets the correct
     * token ID from the Mintbase (Near Protocol) store smart contract.
     *
     * @param admin_jwk_n the public key of the contract's admin
     * @param user_jwk_n the user's (podcast owner) public key
     * @param admin_sig the message signed by the admin's pub key
     * @param user_sig the message signed by the user's pub_key
     * @param eid Epsiode EID
     * @param store the currently used Mintbase store contract address
     * @param token_id the NFT token ID for the episode
     *
     * @return state
     *
     **/

    const admin_jwk_n = input.admin_jwk_n;
    const user_jwk_n = input.user_jwk_n;
    const admin_sig = input.admin_sig;
    const user_sig = input.user_sig;
    const eid = input.eid;
    const store = input.store;
    const token_id = input.token_id;

    _notPaused();
    _validateOwnerSyntax(admin_jwk_n);
    _validateOwnerSyntax(user_jwk_n);

    await _verifyAdminArSignature(admin_jwk_n, admin_sig);
    await _verifyArSignature(user_jwk_n, user_sig);

    ContractAssert(admin_sig !== user_sig, ERROR_SIG_COMPOUND_DUPLICATION); // admin cant self-tokenize episodes

    const pid = _getPidOfEid(eid);
    const pidIndex = _getAndValidatePidIndex(pid);
    const eidIndex = _getAndValidateEidIndex(eid, pidIndex);

    ContractAssert(stores.includes(store), ERROR_INVALID_STORE);
    ContractAssert(
      podcasts[pidIndex]["owner"] === user_jwk_n,
      ERROR_INVALID_CALLER
    );
    _checkTokenId(store, token_id);

    const episode = podcasts[pidIndex]["episodes"][eidIndex];
    ContractAssert(!episode["store"], ERROR_EPISODE_ALREADY_TOKENIZED);

    episode.store = store;
    episode.token_id = token_id;

    return { state };
  }

  // ADMIN FUNCTIONS

  if (input.function === "updateLimitations") {
    /**
     * @dev the contract admin change the limitations
     * of certain user inputs values.
     *
     * The new limitation for any property must be
     * a string of two integers separated by a comma.
     * The integers should be passed by the ascending order.
     * e.g "1,7"
     *
     * @param podcastName corresponding new limitations
     * @param episodename corresponding new limitations
     * @param authorName corresponding new limitations
     * @param podcastDesc corresponding new limitations
     * @param episodeDesc corresponding new limitations
     * @param pid corresponding new limitations
     * @param jwk_n the public key of the caller (admin)
     * @param sig a message signed by the caller's public key
     *
     * @return state
     *
     **/

    const podcastName = input.podcastName;
    const episodeName = input.episodeName;
    const authorName = input.authorName;
    const podcastDesc = input.podcastDesc;
    const episodeDesc = input.episodeDesc;
    const pid = input.pid;

    const jwk_n = input.jwk_n;
    const sig = input.sig;

    await _verifyAdminArSignature(jwk_n, sig);

    if (podcastName) {
      const minMax = _validateAndReturnLimits(podcastName);
      POD_NAME_LIMITS.min = minMax[0];
      POD_NAME_LIMITS.max = minMax[1];
    }

    if (episodeName) {
      const minMax = _validateAndReturnLimits(episodeName);
      EP_NAME_LIMITS.min = minMax[0];
      EP_NAME_LIMITS.max = minMax[1];
    }

    if (podcastDesc) {
      const minMax = _validateAndReturnLimits(podcastDesc);
      POD_DESC_LIMITS.min = minMax[0];
      POD_DESC_LIMITS.max = minMax[1];
    }

    if (episodeDesc) {
      const minMax = _validateAndReturnLimits(episodeDesc);
      EP_DESC_LIMITS.min = minMax[0];
      EP_DESC_LIMITS.max = minMax[1];
    }

    if (authorName) {
      const minMax = _validateAndReturnLimits(authorName);
      AUTHOR_NAME_LIMITS.min = minMax[0];
      AUTHOR_NAME_LIMITS.max = minMax[1];
    }

    if (pid) {
      const minMax = _validateAndReturnLimits(pid);
      PID_LIMITS.min = minMax[0];
      PID_LIMITS.max = minMax[1];
    }

    return { state };
  }

  if (input.function === "updateSigMessage") {
    /**
     * @dev the contract admin can add a new message
     * that gets considered as the newly accepted
     * signature msg body.
     *
     * @param jwk_n the public key of the admin
     * @param sig a message signed of the currently used
     * message structure signed by the contract's admin
     * @param newMessage the new message string literal
     * @param type message type, either for admin signatures
     * or users signatures.
     *
     * @return state
     *
     **/
    const jwk_n = input.jwk_n;
    const sig = input.sig;
    const newMessage = input.newMessage;
    const type = input.type;

    _validateOwnerSyntax(jwk_n);
    await _verifyAdminArSignature(jwk_n, sig);
    _validateStringTypeLen(newMessage, 1, 1e4);

    ContractAssert(
      ["user_sig_messages", "admin_sig_messages"].includes(type),
      ERROR_INVALID_SIG_TYPE
    );
    state[type].push(newMessage);

    return { state };
  }

  if (input.function === "modifyStore") {
    /**
     * @dev change the Mintbase store contract
     * address used for episodes tokenization.
     *
     * @param jwk_n the public key of the admin
     * @param sig a message signed by the admin's pub key
     * @param store the new store smart contract address
     * @param action modification action: 'add' or 'remove'
     *
     * @return state
     *
     **/

    const jwk_n = input.jwk_n;
    const sig = input.sig;
    const store = input.store;
    const action = input.action;

    _validateOwnerSyntax(jwk_n);
    await _verifyAdminArSignature(jwk_n, sig);

    ContractAssert(
      ["add", "remove"].includes(action),
      ERROR_INVALID_MODIFICATION_ACTION
    );
    ContractAssert(
      typeof store === "string" && store.length,
      ERROR_INVALID_STORE_SYNTAX
    );

    if (action === "add") {
      ContractAssert(!stores.includes(store), ERROR_STORE_ALREADY_ADDED);
      stores.push(store);
    }

    if (action === "remove") {
      const storeIndex = stores.findIndex((sc) => sc === store);
      ContractAssert(storeIndex >= 0, ERROR_STORE_NOT_EXISTING);
      stores.splice(storeIndex, 1);
    }

    return { state };
  }

  if (input.function === "switchPauseState") {
    /**
     * @dev admin can pause or unpause the contract's
     * public functions. Invoking this function reverse
     * the value of `isPaused` property in the contract's state
     *
     * @param jwk_n the public key of the admin
     * @param sig a message signed by the admin's pub key
     *
     * @return state
     *
     **/
    const jwk_n = input.jwk_n;
    const sig = input.sig;

    _validateOwnerSyntax(jwk_n);
    await _verifyAdminArSignature(jwk_n, sig);

    state.isPaused = !state.isPaused;

    return { state };
  }

  if (input.function === "updatePaymentEndpoint") {
    /**
     * @dev updating the API endpoint of the
     * podcast's creation fee handler proxy.
     *
     * @param jwk_n the public key of the admin
     * @param sig a message signed by the admin's pub key
     * @param endpoint the new proxy endpoint URL
     *
     * @return state
     *
     **/

    const jwk_n = input.jwk_n;
    const sig = input.sig;
    const endpoint = input.endpoint;

    _validateOwnerSyntax(jwk_n);
    await _verifyAdminArSignature(jwk_n, sig);

    ContractAssert(
      endpoint.startsWith("https://"),
      ERROR_INVALID_ENDPOINT_SYNTAX
    );
    state.fees_handler_endpoint = endpoint;

    return { state };
  }

  if (input.function === "modifyPaymentTokens") {
    /**
     * @dev modify the accepted tokens by the
     * proxy node that process paid podcast fees validation.
     *
     * @param jwk_n the public key of the admin
     * @param sig a message signed by the admin's pub key
     * @param token the newly accepted token ticker (uppercase)
     * @param action modification action: 'add' or 'remove'
     *
     * @return state
     *
     **/

    const jwk_n = input.jwk_n;
    const sig = input.sig;
    const token = input.token;
    const action = input.action;

    _validateOwnerSyntax(jwk_n);
    await _verifyAdminArSignature(jwk_n, sig);

    ContractAssert(
      ["add", "remove"].includes(action),
      ERROR_INVALID_MODIFICATION_ACTION
    );

    if (action === "add") {
      ContractAssert(token.length >= 2, ERROR_INVALID_TOKEN_TICKER);
      ContractAssert(
        !state.supported_tokens.includes(token),
        ERROR_TOKEN_ALREADY_ADDED
      );
      state.supported_tokens.push(token);

      return { state };
    }

    if (action === "remove") {
      const tokenIndex = state.supported_tokens.findIndex(
        (tkn) => tkn === token
      );
      ContractAssert(tokenIndex >= 0, ERROR_TOKEN_NOT_FOUND);
      state.supported_tokens.splice(tokenIndex, 1);

      return { state };
    }
  }

  if (input.function === "modifyPaymentNetworks") {
    /**
     * @dev modify the supported blockchain networks supported
     * by the proxy node that process paid podcast fees validation.
     *
     * @param jwk_n the public key of the admin
     * @param sig a message signed by the admin's pub key
     * @param network the newly accepted network name (lowecase)
     * @param action modification action: 'add' or 'remove'
     *
     * @return state
     *
     **/
    const jwk_n = input.jwk_n;
    const sig = input.sig;
    const network = input.network;
    const action = input.action;

    _validateOwnerSyntax(jwk_n);
    await _verifyAdminArSignature(jwk_n, sig);

    ContractAssert(
      ["add", "remove"].includes(action),
      ERROR_INVALID_MODIFICATION_ACTION
    );

    if (action === "add") {
      ContractAssert(network.length, ERROR_INVALID_NETWORK_NAME);
      ContractAssert(
        !state.fees_networks.includes(network),
        ERROR_NETWORK_ALREADY_ADDED
      );
      state.fees_networks.push(network);

      return { state };
    }

    if (action === "remove") {
      const networkIndex = state.fees_networks.findIndex(
        (net) => net === network
      );
      ContractAssert(networkIndex >= 0, ERROR_NETWORK_NOT_FOUND);
      state.fees_networks.splice(networkIndex, 1);

      return { state };
    }
  }

  function _validateArweaveAddress(address) {
    ContractAssert(
      /[a-z0-9_-]{43}/i.test(address),
      ERROR_INVALID_ARWEAVE_ADDRESS
    );
  }

  function _validateOwnerSyntax(owner) {
    ContractAssert(
      typeof owner === "string" && owner?.length === 683,
      ERROR_INVALID_JWK_N_SYNTAX
    );
  }

  function _getPodcastIndex() {
    if (podcasts.length === 0) {
      return 0;
    }

    return podcasts.length;
  }

  function _validateStringTypeLen(str, minLen, maxLen) {
    if (typeof str !== "string") {
      throw new ContractError(ERROR_INVALID_PRIMITIVE_TYPE);
    }

    if (str.trim().length < minLen || str.trim().length > maxLen) {
      throw new ContractError(ERROR_INVALID_STRING_LENGTH);
    }
  }

  function _getAndValidatePidIndex(pid) {
    const index = podcasts.findIndex((podcast) => podcast["pid"] === pid);

    if (index >= 0) {
      return index;
    }

    throw new ContractError(ERROR_PID_NOT_FOUND);
  }

  function _getPidOfEid(eid) {
    const pid = podcasts.find((podcast) =>
      podcast.episodes.find((episode) => episode["eid"] === eid)
    )?.["pid"];

    if (!pid) {
      throw new ContractError(ERROR_PID_OF_EID_NOT_FOUND);
    }

    return pid;
  }

  function _getAndValidateEidIndex(eid, pidIndex) {
    const index = podcasts[pidIndex].episodes.findIndex(
      (episode) => episode["eid"] === eid
    );

    if (index >= 0) {
      return index;
    }

    throw new ContractError(ERROR_EID_NOT_FOUND);
  }

  function _validateAndReturnLimits(limitations) {
    const minMax = limitations
      .split(",")
      .map((str) => str.trim())
      .map((str) => Number(str));
    ContractAssert(
      Number.isInteger(minMax[0]) && Number.isInteger(minMax[1]),
      ERROR_LIMITATIONS_NOT_INTEGER
    );
    ContractAssert(minMax[0] <= minMax[1], ERROR_INVALID_LIMITATIONS_ORDER); // ensure the limits orders
    return minMax;
  }

  async function _verifyArSignature(owner, signature) {
    try {
      const sigBody = state.user_sig_messages;
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

      ContractAssert(isValid, ERROR_INVALID_CALLER_SIGNATURE);
      ContractAssert(
        !state.signatures.includes(signature),
        ERROR_SIGNATURE_ALREADY_USED
      );
      state.signatures.push(signature);
    } catch (error) {
      throw new ContractError(ERROR_INVALID_CALLER_SIGNATURE);
    }
  }

  async function _verifyAdminArSignature(owner, signature) {
    try {
      // verify that the message has been signed by `caller`
      const sigBody = state.admin_sig_messages;
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

      ContractAssert(isValid, ERROR_INVALID_CALLER_SIGNATURE);
      ContractAssert(
        !admins_signatures.includes(signature),
        ERROR_SIGNATURE_ALREADY_USED
      );
      admins_signatures.push(signature);
    } catch (error) {
      throw new ContractError(ERROR_INVALID_CALLER_SIGNATURE);
    }
  }

  function _checkTokenId(store, token_id) {
    ContractAssert(
      Number.isInteger(token_id) && token_id >= 0,
      ERROR_INVALID_TOKEN_ID_SYNTAX
    );
    const existingTokenizedEpisode = podcasts
      .map((pod) => pod.episodes)
      .flat()
      .find((ep) => ep.store === store && ep.token_id === token_id);
    ContractAssert(
      !existingTokenizedEpisode,
      ERROR_EP_TOKENIZATION_DUPLICATION
    );
  }

  async function _validatePayment(master, network, token, txid) {
    try {
      ContractAssert(
        ["evm", "exotic"].includes(master.toLowerCase()),
        ERROR_INVALID_MASTER_NETWORK
      );
      ContractAssert(
        state.fees_networks.includes(network.toLowerCase()),
        ERROR_UNSUPPORTED_NETWORK
      );
      ContractAssert(
        state.supported_tokens.includes(token.toUpperCase()),
        ERROR_UNSUPPORTED_TOKEN
      );
      ContractAssert(!state.paid_fees.includes(txid), ERROR_REENTRANCY_FEE);
      const req = await EXM.deterministicFetch(
        `${state.fees_handler_endpoint}/${master}/${network}/${token}/${txid}`
      );
      ContractAssert(req.asJSON()?.result, ERROR_INVALID_PAYMENT);
      state.paid_fees.push(txid);
    } catch (error) {
      throw new ContractError(ERROR_INVALID_PAYMENT);
    }
  }

  function _notPaused() {
    ContractAssert(!state.isPaused, ERROR_CONTRACT_PAUSED);
  }
}
