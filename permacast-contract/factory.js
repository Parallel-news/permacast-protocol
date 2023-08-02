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
 * @version Mainnet V2 - Bloodstone Version
 * @author charmful0x
 * @website permacast.app
 * @license MIT
 *
 **/

export async function handle(state, action) {
  const input = action.input;

  // STATE
  const podcasts = state.podcasts;
  const limitations = state.limitations;
  const signatures = state.signatues;
  const admin = state.admin;
  const sig_messages = state.sig_messages;
  const paid_fees = state.paid_fees;
  const isPaused = state.isPaused;

  // LIMITATION METADATA STATE ACCESS
  const POD_NAME_LIMITS = limitations["podcast_name_len"];
  const EP_NAME_LIMITS = limitations["episode_name_len"];
  const AUTHOR_NAME_LIMITS = limitations["author_name_len"];
  const LANG_CHAR_LIMITS = limitations["lang_char_code"];
  const CATEGORY_LIMITS = limitations["categories"];

  // ERRORS List
  const ERROR_INVALID_CALLER = `ERROR_THE_PUBKEY_OF_THE_CALLER_IS_NOT_ALLOWED_TO_CALL_THIS_FUNCTION`;
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
  const ERROR_LABEL_IN_USE = `ERROR_PODCAST_LABEL_IS_USED`;
  const ERROR_MOLECULE_SERVER_ERROR = `ERROR_UNEXPECTED_ERROR_FROM_MOLECULE`;
  const ERROR_NO_CATEGORY_PROVIDED = `ERROR_MUST_PROVIDE_CATEGORY_TO_UPDATE`;
  const ERROR_INVALID_DATA_SIZE_TX = `ERROR_EMPTY_DATA_TRANSACTION`;
  const ERROR_PARSING_TX_METADATA = `ERROR_GETTING_TX_METADATA`;
  const ERROR_STATES_PORTING_DONE = `ERROR_AMBER_BLOODSTONE_MIGRATION_DONE`;

  if (input.function === "createPodcast") {
    try {
      /**
       * @dev create a podcast object and append it to
       * the smart contract state (Factory). Only the podcast owner
       * and its maintainers can perform write acions.
       *
       * @param name podcast name
       * @param desc podcast description (arseed TXID)
       * @param author podcast author
       * @param lang language char code (ISO 639-1:2002)
       * @param isExplicit indicates the existence of
       * explicit content, used for RSS feed generating
       * @param categories RSS supported categories strings
       * @param email author email address
       * @param cover Arweave data TXID of type `image/*` (arseed TXID)
       * @param minifiedCover Arweave data TXID of type `image/*` (minified - arseed TXID)
       * @param maintainers a string of maintainers comma separated
       * @param jwk_n the public key of the caller
       * @param sig a message signed by the caller's public key
       * @param txid the transaction ID of the fee payment (EverFinance)
       *
       * @return state
       **/

      const name = input.name;
      const label = input.label;
      const description = input.desc;
      const author = input.author;
      const lang = input.lang;
      const isExplicit = input.isExplicit;
      const categories = input.categories;
      const email = input.email;
      const cover = input.cover;
      const minifiedCover = input.minifiedCover;
      const maintainers = input?.maintainers;
      const jwk_n = input.jwk_n;
      const sig = input.sig;
      const txid = input.txid;

      let maintainersArray = [];
      const caller = await _ownerToAddress(jwk_n);
      const validatedLabel = _validateLabel(label);
      _notPaused();
      _notSharded();
      await _verifyArSignature(jwk_n, sig);
      await _validatePayment(caller, txid, "podcast");
      const inputTxsMetadata = await _getTxsMetadata(
        btoa(JSON.stringify([cover, minifiedCover, description]))
      );

      ContractAssert(
        inputTxsMetadata?.[description]?.mime?.startsWith(`text/markdown`),
        ERROR_MIME_TYPE
      );
      ContractAssert(
        inputTxsMetadata?.[cover]?.mime?.startsWith(`image/`),
        ERROR_MIME_TYPE
      );
      ContractAssert(
        inputTxsMetadata?.[minifiedCover]?.mime?.startsWith(`image/`),
        ERROR_MIME_TYPE
      );

      const pid = SmartWeave.transaction.id;

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
      _validateStringTypeLen(minifiedCover, 43, 43);
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
        label: validatedLabel,
        createdAt: EXM.getDate().getTime(),
        owner: caller,
        podcastName: name,
        author: author,
        email: email,
        description: description,
        language: lang,
        explicit: isExplicit,
        categories: categories.split(",").map((category) => category.trim()),
        maintainers: maintainersArray,
        cover: cover,
        minifiedCover: minifiedCover,
        isVisible: true,
        episodes: [],
      });

      return { state };
    } catch (error) {
      throw new ContractError("ERROR_CREATING_PODCAST");
    }
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
     * @param content episode audio's or video's Arseed TXID
     * @param desc the episode's description (arseed TXID)
     * @param thumbnail an optional thumbnail property for the episode
     * @para, txid Everpay fee TXID
     * @param jwk_n the public key of the caller
     * @param sig a message signed by the caller's public key
     *
     * @return state
     **/

    const pid = input.pid;
    const name = input.name;
    const description = input.desc;
    const content = input.content;
    const txid = input.txid;
    const jwk_n = input.jwk_n;
    const sig = input.sig;
    const thumbnail = input.thumbnail;

    _notPaused();
    await _verifyArSignature(jwk_n, sig);
    const caller = await _ownerToAddress(jwk_n);

    const eid = SmartWeave.transaction.id;
    const pidIndex = _getAndValidatePidIndex(pid);

    ContractAssert(
      podcasts[pidIndex]["owner"] === caller ||
        podcasts[pidIndex]["maintainers"].includes(caller),
      ERROR_INVALID_CALLER
    );

    await _validatePayment(caller, txid, "episode");

    const inputTxsMetadata = thumbnail ? await _getTxsMetadata(
      btoa(JSON.stringify([content, description, thumbnail]))
    ) : await _getTxsMetadata(
      btoa(JSON.stringify([content, description]))
    )

    ContractAssert(
      inputTxsMetadata?.[description]?.mime?.startsWith(`text/markdown`),
      ERROR_MIME_TYPE
    );
    ContractAssert(
      inputTxsMetadata?.[content]?.mime?.startsWith(`audio/`) ||
        inputTxsMetadata?.[content]?.mime?.startsWith(`video/`),
      ERROR_MIME_TYPE
    );

    thumbnail ?   ContractAssert(
      inputTxsMetadata?.[thumbnail]?.mime?.startsWith(`image/`),
      ERROR_MIME_TYPE
    ) : void 0;

    _validateStringTypeLen(name, EP_NAME_LIMITS.min, EP_NAME_LIMITS.max);
    _validateStringTypeLen(content, 43, 43);

    podcasts[pidIndex]["episodes"].push({
      eid: SmartWeave.transaction.id,
      episodeName: name,
      description: description,
      contentTx: content,
      thumbnail: thumbnail ? thumbnail : null,
      type: inputTxsMetadata?.[content]?.mime,
      uploader: caller,
      uploadedAt: EXM.getDate().getTime(),
      isVisible: true,
      txid: txid,
    });

    return { state };
  }


   if (input.function === "addBatchEpisode") {
     /**
      * @dev create an episode object and append
      *  it to a podcast object's episodes array
      *  Maintainers and Podcast owner can invoke
      *  this function.
      *
      * @param pid podcast ID (pid). 43 chars string
      * @param name episode name
      * @param content episode audio's or video's Arseed TXID
      * @param desc the episode's description (arseed TXID)
      * @param thumbnail an optional thumbnail property for the episode
      * @para, txid Everpay fee TXID
      * @param jwk_n the public key of the caller
      * @param sig a message signed by the caller's public key
      *
      * @return state
      **/

     const pid = input.pid;
     const episodes = input.episodes;
     const txid = input.txid;
     const jwk_n = input.jwk_n;
     const sig = input.sig;

     _notPaused();
     await _verifyArSignature(jwk_n, sig);
     const caller = await _ownerToAddress(jwk_n);
     const pidIndex = _getAndValidatePidIndex(pid);

     ContractAssert(
       podcasts[pidIndex]["owner"] === caller ||
         podcasts[pidIndex]["maintainers"].includes(caller),
       ERROR_INVALID_CALLER
     );

     ContractAssert(
       episodes.length && Array.isArray(episodes) && episodes.length <= 100,
       "ERROR_INVALID_EPISODES_INPUT"
     );

     await _validatePayment(caller, txid, "episode", episodes.length);

     for (const episode of episodes) {
       const name = episode.name;
       const description = episode.desc;
       const content = episode.content;
       const thumbnail = episode.thumbnail;

       const inputTxsMetadata = thumbnail
         ? await _getTxsMetadata(
             btoa(JSON.stringify([content, description, thumbnail]))
           )
         : await _getTxsMetadata(btoa(JSON.stringify([content, description])));

       ContractAssert(
         inputTxsMetadata?.[description]?.mime?.startsWith(`text/markdown`),
         ERROR_MIME_TYPE
       );
       ContractAssert(
         inputTxsMetadata?.[content]?.mime?.startsWith(`audio/`) ||
           inputTxsMetadata?.[content]?.mime?.startsWith(`video/`),
         ERROR_MIME_TYPE
       );

       thumbnail
         ? ContractAssert(
             inputTxsMetadata?.[thumbnail]?.mime?.startsWith(`image/`),
             ERROR_MIME_TYPE
           )
         : void 0;

       _validateStringTypeLen(name, EP_NAME_LIMITS.min, EP_NAME_LIMITS.max);
       _validateStringTypeLen(content, 43, 43);

       podcasts[pidIndex]["episodes"].push({
         eid: SmartWeave.transaction.id,
         episodeName: name,
         description: description,
         contentTx: content,
         thumbnail: thumbnail ? thumbnail : null,
         type: inputTxsMetadata?.[content]?.mime,
         uploader: caller,
         uploadedAt: EXM.getDate().getTime(),
         isVisible: true,
         txid: txid,
       });
     }

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

    _notPaused();
    await _verifyArSignature(jwk_n, sig);

    const pidIndex = _getAndValidatePidIndex(pid);
    const caller = await _ownerToAddress(jwk_n);

    ContractAssert(
      podcasts[pidIndex]["owner"] === caller,
      ERROR_INVALID_CALLER
    );
    ContractAssert(maintainers.length, ERROR_NO_MAINTAINERS_PROVIDED);

    const maintainersArray = maintainers.split(",").map((addr) => addr.trim());

    for (const maintainer of maintainersArray) {
      _validateArweaveAddress(maintainer);
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
    const address = input.address;
    const jwk_n = input.jwk_n;
    const sig = input.sig;

    _validateArweaveAddress(address);
    _notPaused();
    await _verifyArSignature(jwk_n, sig);
    const caller = await _ownerToAddress(jwk_n);

    const pidIndex = _getAndValidatePidIndex(pid);
    const podcast = podcasts[pidIndex];
    const maintainerIndex = podcast["maintainers"].findIndex(
      (maintainer) => maintainer === address
    );

    ContractAssert(podcast["owner"] === caller, ERROR_INVALID_CALLER);
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
     * @param desc podcast description Arseed TXID (new value)
     * @param author podcast author name (new value)
     * @param lang podcast language code (new value)
     * @param isExplicit podcast explicity (for RSS, new value)
     * @param email podcast email address (new value)
     * @param cover the Arseed TXID of the new podcast cover
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
    const minifiedCover = input.minifiedCover;
    const isVisible = input.isVisible;
    let categories = input.categories;
    const label = input.label;
    const jwk_n = input.jwk_n;
    const sig = input.sig;

    _notPaused();
    await _verifyArSignature(jwk_n, sig);
    const caller = await _ownerToAddress(jwk_n);

    const pidIndex = _getAndValidatePidIndex(pid);
    const podcast = podcasts[pidIndex];

    ContractAssert(podcast["owner"] === caller, ERROR_INVALID_CALLER);

    if (name) {
      _validateStringTypeLen(name, POD_NAME_LIMITS.min, POD_NAME_LIMITS.max);
      podcast["podcastName"] = name;
    }

    if (description) {
      const descTxMetadata = await _getTxsMetadata(
        btoa(JSON.stringify([description]))
      );

      ContractAssert(
        descTxMetadata?.[description]?.mime?.startsWith(`text/markdown`),
        ERROR_MIME_TYPE
      );
      podcast["description"] = description;
    }

    if (author) {
      _validateStringTypeLen(
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
      const coverTxMetadata = await _getTxsMetadata(
        btoa(JSON.stringify([cover]))
      );
      ContractAssert(
        coverTxMetadata?.[cover]?.mime?.startsWith(`image/`),
        ERROR_MIME_TYPE
      );
      podcast["cover"] = cover;
    }

    if (minifiedCover) {
      _validateArweaveAddress(minifiedCover);
      const coverTxMetadata = await _getTxsMetadata(
        btoa(JSON.stringify([minifiedCover]))
      );
      ContractAssert(
        coverTxMetadata?.[minifiedCover]?.mime?.startsWith(`image/`),
        ERROR_MIME_TYPE
      );
      podcast["minifiedCover"] = minifiedCover;
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
      ContractAssert(categories.length, ERROR_NO_CATEGORY_PROVIDED);
      podcast["categories"] = categories
        .split(",")
        .map((category) => category.trim());
    }

    if (isVisible) {
      ContractAssert(
        ["yes", "no"].includes(isVisible),
        ERROR_INVALID_PRIMITIVE_TYPE
      );
      podcast["isVisible"] = isVisible === "yes" ? true : false;
    }

    if (label) {
      podcast["label"] = _validateLabel(label);
    }

    return { state };
  }

  if (input.function === "editEpisodeMetadata") {
    /**
     * @dev podcast owner editing an episode's metadata
     *
     * @param eid episode's EID
     * @param name episode's name (new value)
     * @param desc episode's description (new value - Arseed TXID)
     * @param thumbnail episode's thumbnail (new value - Arseed TXID)
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
    const thumbnail = input.thumbnail;

    _notPaused();
    await _verifyArSignature(jwk_n, sig);
    const caller = await _ownerToAddress(jwk_n);

    const pid = _getPidOfEid(eid);
    const pidIndex = _getAndValidatePidIndex(pid);
    const eidIndex = _getAndValidateEidIndex(eid, pidIndex);

    ContractAssert(
      podcasts[pidIndex]["owner"] === caller,
      ERROR_INVALID_CALLER
    );
    const episode = podcasts[pidIndex]["episodes"][eidIndex];

    if (name) {
      _validateStringTypeLen(name, EP_NAME_LIMITS.min, EP_NAME_LIMITS.max);
      episode["episodeName"] = name;
    }

    if (description) {
      const descTxMetadata = await _getTxsMetadata(
        btoa(JSON.stringify([description]))
      );

      ContractAssert(
        descTxMetadata?.[description]?.mime?.startsWith(`text/markdown`),
        ERROR_MIME_TYPE
      );
      episode["description"] = description;
    }

    if (thumbnail) {
      const descTxMetadata = await _getTxsMetadata(
        btoa(JSON.stringify([thumbnail]))
      );

      ContractAssert(
        descTxMetadata?.[thumbnail]?.mime?.startsWith(`image/`),
        ERROR_MIME_TYPE
      );
      episode["thumbnail"] = thumbnail;
    }

    if (isVisible) {
      ContractAssert(
        ["yes", "no"].includes(isVisible),
        ERROR_INVALID_PRIMITIVE_TYPE
      );
      episode["isVisible"] = isVisible === "yes" ? true : false;
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

    _notPaused();
    await _verifyArSignature(jwk_n, sig);
    const caller = await _ownerToAddress(jwk_n);

    ContractAssert(Number.isInteger(newIndex), ERROR_INVALID_PRIMITIVE_TYPE);
    const pid = _getPidOfEid(eid);
    const pidIndex = _getAndValidatePidIndex(pid);
    const eidIndex = _getAndValidateEidIndex(eid, pidIndex);
    const podcast = podcasts[pidIndex];

    ContractAssert(podcast["owner"] === caller, ERROR_INVALID_CALLER);
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

    return { state };
  }

  if (input.function === "transferPodcast") {
    const { jwk_n, sig, pid, address } = input;

    _notPaused();
    _validateArweaveAddress(address);
    await _verifyArSignature(jwk_n, sig);
    const caller = await _ownerToAddress(jwk_n);

    const pidIndex = _getAndValidatePidIndex(pid);
    const podcast = podcasts[pidIndex];

    ContractAssert(podcast["owner"] === caller, ERROR_INVALID_CALLER);
    ContractAssert(
      podcast["owner"] !== address,
      "ERROR_INVALID_PODCAST_TRANSFER"
    );
    state.podcasts[pidIndex].owner = address;

    return { state };
  }

  // CRONJOB FUNCTIONS
  if (input.function === "assignEpisodeSize") {
    /**
     * @dev assign episode content data size
     *
     * @param eid episode's EID
     *
     * @return state
     *
     **/
    const eid = input.eid;

    _notPaused();

    const pid = _getPidOfEid(eid);
    const pidIndex = _getAndValidatePidIndex(pid);
    const eidIndex = _getAndValidateEidIndex(eid, pidIndex);

    const episode = podcasts[pidIndex]["episodes"][eidIndex];

    ContractAssert(!episode.size, "ERROR_SIZE_ALREADY_ASSIGNED");
    const req = await EXM.deterministicFetch(
      `${state.ar_molecule_endpoint}/tx-gql/${episode.contentTx}`
    );
    const size = req.asJSON()?.data.size;
    state.podcasts[pidIndex].episodes[eidIndex].size = Number(size);

    return { state };
  }

  // READ FUNCTIONS
  if (input.function === "getStateProperty") {
    /**
     * @dev return a state key's value
     *
     * @param key string representing the value's key name
     *
     * @return query result
     *
     **/
    const { key } = input;

    ContractAssert(
      typeof key === "string" && key.trim().length,
      "ERROR_INVALID_STATE_KEY"
    );
    ContractAssert(key in state, "ERROR_INVALID_STATE_KEY");
    return {
      result: state[key.trim()],
    };
  }

  if (input.function === "getPodcastsOf") {
    /**
     * @dev return the podcats created by a given
     * Arweave address
     *
     * @param address targeted user address
     *
     * @return query result
     *
     **/
    const { address } = input;
    _validateArweaveAddress(address);
    const podcasts = state.podcasts.filter(
      (podcast) => podcast.owner === address
    );

    return {
      result: podcasts,
    };
  }

  if (input.function === "getRecentUploadsOf") {
    /**
     * @dev return the recent uploads by a given Arweave
     * address
     *
     * @param address targeted user address
     *
     * @return query result
     *
     **/
    const { address } = input;
    _validateArweaveAddress(address);
    const uploads = state.podcasts.map((podcast) => podcast.episodes).flat();
    const userUploads = uploads.filter(
      (episode) => episode.uploader === address
    );

    return {
      result: userUploads.sort((a, b) => b.uploadedAt - a.uploadedAt),
    };
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
     * @param podcastCreationFee corresponding new limitations
     * @param episodeCreationFee corresponding new limitations
     * @param pid corresponding new limitations
     * @param sig a message signed by the caller's public key
     *
     * @return state
     *
     **/

    const podcastName = input.podcastName;
    const episodeName = input.episodeName;
    const authorName = input.authorName;
    const podcastCreationFee = input.podcastCreationFee;
    const episodeCreationFee = input.episodeCreationFee;
    const sig = input.sig;
    const jwk_n = input.jwk_n;

    const caller = await _ownerToAddress(jwk_n);
    ContractAssert(caller === state.admin, "ERROR_INVALID_CALLER");
    await _verifyArSignature(jwk_n, sig);

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

    if (authorName) {
      const minMax = _validateAndReturnLimits(authorName);
      AUTHOR_NAME_LIMITS.min = minMax[0];
      AUTHOR_NAME_LIMITS.max = minMax[1];
    }

    if (podcastCreationFee) {
      ContractAssert(
        typeof podcastCreationFee === "number" &&
          Number.isInteger(podcastCreationFee) &&
          podcastCreationFee > 1e-12
      );
      state.podcast_creation_fee = podcastCreationFee;
    }

    if (episodeCreationFee) {
      ContractAssert(
        typeof episodeCreationFee === "number" &&
          Number.isInteger(episodeCreationFee) &&
          episodeCreationFee > 1e-12
      );
      state.episode_creation_fee = episodeCreationFee;
    }

    return { state };
  }

  if (input.function === "updateSigMessage") {
    /**
     * @dev the contract admin can add a new message
     * that gets considered as the newly accepted
     * signature msg body.
     * @param sig a message signed of the currently used
     * message structure signed by the contract's admin
     * @param newMessage the new message string literal
     * @param type message type, either for admin signatures
     * or users signatures.
     *
     * @return state
     *
     **/
    const sig = input.sig;
    const jwk_n = input.jwk_n;
    const newMessage = input.newMessage;

    const caller = await _ownerToAddress(jwk_n);
    ContractAssert(caller === state.admin, "ERROR_INVALID_CALLER");
    await _verifyArSignature(jwk_n, sig);
    _validateStringTypeLen(newMessage, 1, 1e4);

    state.sig_messages.push(newMessage);
    state.signatures = [];

    return { state };
  }

  if (input.function === "switchPauseState") {
    /**
     * @dev admin can pause or unpause the contract's
     * public functions. Invoking this function reverse
     * the value of `isPaused` property in the contract's state
     *
     * @param sig a message signed by the admin's pub key
     *
     * @return state
     *
     **/
    const sig = input.sig;
    const jwk_n = input.jwk_n;

    const caller = await _ownerToAddress(jwk_n);
    ContractAssert(caller === state.admin, "ERROR_INVALID_CALLER");
    await _verifyArSignature(jwk_n, sig);

    state.isPaused = !state.isPaused;

    return { state };
  }

  if (input.function === "shardState") {
    const sig = input.sig;
    const jwk_n = input.jwk_n;

    const caller = await _ownerToAddress(jwk_n);
    ContractAssert(caller === state.admin, "ERROR_INVALID_CALLER");
    await _verifyArSignature(jwk_n, sig);

    state.isSharded = true;

    return { state };
  }

  // PORTING PHASE ONLY
  if (input.function === "importState") {
    ContractAssert(!state.isImported, "ERROR_STATE_IMPORTED");
    const importedState = (
      await EXM.deterministicFetch(
        `https://arweave.net/umgZPnh_b_AfHHk9x4eCcFGy6QF0OYd9_7oe5ki3Afs`,
      )
    ).asJSON();
    importedState.isImported = true;
    state = importedState;

    return { state };
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
      ERROR_LIMITATIONS_NOT_INTEGERS
    );
    ContractAssert(minMax[0] <= minMax[1], ERROR_INVALID_LIMITATIONS_ORDER); // ensure the limits orders
    return minMax;
  }

  async function _verifyArSignature(owner, signature) {
    try {
      ContractAssert(
        !state.signatures.includes(signature),
        ERROR_SIGNATURE_ALREADY_USED
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

      ContractAssert(isValid, ERROR_INVALID_CALLER_SIGNATURE);

      state.signatures.push(signature);
    } catch (error) {
      throw new ContractError(ERROR_INVALID_CALLER_SIGNATURE);
    }
  }

  async function _validatePayment(caller, txid, type, episodes_count) {
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

      if (type === "podcast") {
        ContractAssert(
          Number(tx.amount) >= state.podcast_creation_fee,
          "ERROR_UNDERPAID_FEE"
        );
      } else {
         const count = episodes_count ? episodes_count : 1;
        ContractAssert(
          Number(tx.amount) >= state.episode_creation_fee * count,
          "ERROR_UNDERPAID_FEE"
        );
      }
      state.paid_fees.push(txid);
    } catch (error) {
      throw new ContractError(ERROR_INVALID_PAYMENT);
    }
  }

  function _validateLabel(label) {
    if (!label) {
      return null;
    }

    _validateStringTypeLen(label, 1, 35);
    const existingLabels = podcasts.map((pod) => pod.label && !!pod.label); // only valid labels
    ContractAssert(!existingLabels.includes(label), ERROR_LABEL_IN_USE);
    ContractAssert(/^(?!-)[a-zA-Z0-9-]{1,35}(?<!-)$/.test(label));
    return label;
  }

  function _notPaused() {
    ContractAssert(!state.isPaused, ERROR_CONTRACT_PAUSED);
  }

  function _notSharded() {
    ContractAssert(!state.isSharded, ERROR_CONTRACT_PAUSED);
  }

  async function _getTxsMetadata(encodedTxs) {
    try {
      const req = await EXM.deterministicFetch(
        `${state.mime_molecule_endpoint}/${encodedTxs}`
      );

      return req.asJSON();
    } catch (error) {
      throw new ContractError(ERROR_MOLECULE_SERVER_ERROR);
    }
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
      throw new ContractError(ERROR_MOLECULE_SERVER_ERROR);
    }
  }
}
