const state = {
  "podcasts": [],
  "admins": [
    "xGx07uNnjitWsOSfKZC-ic74oXs9qDXU5QOsAis4V3tXk0krk5zUlGYu7SlZ-4xfNVA1QsHa_pOvlgE-0xGKJvMZRZYzlYcBDsnDJgLYQc5D2B2Ng4HQjLON-Gqsxl25Uj7-VSEeUgk5b2Q4SrAoVTKLWKEtuGDqwy5qKKCvNHYShYJHbmAsjQzwCwvfn2bqKv_zFUD4QeukihfDJbVyZaiev7GoE1NzTsqJ_V_eZ9tKV_5YVy-ZVU8a9dEeTnGJm2rT6z9aCcQwd9EqVYi7h8QCbKOn2r5K2NbD6V8xjQGHvODHMO0iHk2hLzcLbfDfyn_Ej-xZsHU6LBJCTeDBy_5kWtOVlYL_RH34UA1j_IYEMVDYnQBKo5laassByvkn7nODZiXesvw6TsXPYdrqrgIL7x4Td5QVK8UHXCGXOrtAlhxfzNWyjP0z5ezAsQpzGPgGI9OKgjmPIk4K6K88BoxNmJ_XFPV1DN8qZGsPSVz2N7XN9wFetDs4CMOGyDToTDEea77TsP1ykKMcXf2h-JCZlvzFEpxS_zMaRMcwV502zXN01oCR2QpUEISf_IzxQYXsjR_F75VPpUvfmDtPYf4ftQN1cZYiH68zxn74uO7DLqIa3nUXq_IrUP7SmEnbMgjzjElp0a_u62XtmgT3GQv7SBrQdzym3yhhM-3kcok"
  ],
  "isPaused": false,
  "user_sig_messages": ["my Arweave PK for Permacast is "],
  "admin_sig_messages": ["admin PK signature for Permacast : "],
  "stores": ["dltest.mintspace2.testnet"],
  "fees_handler_endpoint": "https://permacast-fees-handler.herokuapp.com/validate",
  "fees_networks": ["ethereum"],
  "supported_tokens": ["ETH"],
  "ar_molecule_endpoint": "http://ar.molecule.sh",
  "paid_fees": [],
  "signatures": [],
  "admins_signatures": [],
  "limitations": {
    "podcast_name_len": {
      "min": 2,
      "max": 500
    },
    "podcast_desc_len": {
      "min": 10,
      "max": 15000
    },
    "author_name_len": {
      "min": 2,
      "max": 150
    },
    "lang_char_code": {
      "min": 2,
      "max": 2
    },
    "categories": {
      "min": 1,
      "max": 300
    },
    "episode_name_len": {
      "min": 3,
      "max": 500
    },
    "episode_desc_len": {
      "min": 1,
      "max": 5000
    }
  }
}

async function amberToBloodstone() {
  try {
    const bloodstone = [];
    const amberState = (await axios.get(`https://whispering-retreat-94540.herokuapp.com/feeds/podcasts`))?.data?.res;
    for (const podcast of amberState) {
      delete podcast.createdAtBlockheight;
      podcast.label = null;
      delete podcast.ansOwnerLabel;
      delete podcast.superAdmins;
      delete podcast.logs;

      for (const episode of podcast.episodes) {
        delete episode.logs;
        delete episode.uploadedAtBlockheight;
        episode.size = episode.contentTxByteSize;
        delete episode.contentTxByteSize; 
      }

      bloodstone.push(podcast);
    }

    state.podcasts = bloodstone;

    return state;
  } catch (error) {
    console.log(error)
  }
}
