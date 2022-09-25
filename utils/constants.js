import qs from "qs";

const ETHERSCAN_API_KEY = process.env.NEXT_PUBLIC_ETHERSCAN_API_KEY;
const ETHERSCAN_API_URL = process.env.NEXT_PUBLIC_ETHERSCAN_API_URL;
const INFURA_API_KEY = process.env.NEXT_PUBLIC_INFURA_API_KEY;
const ETHER_URL = `${ETHERSCAN_API_URL}?apikey=${ETHERSCAN_API_KEY}`;
const SAMPLE_SINGLE_ADDREESS = "0xde0b295669a9fd93d5f28d9ec85e40f4cb697bae";
const SAMPLE_MULTIPLE_ADDRESS =
  "0xddbd2b932c763ba5b1b7ae3b362eac3e8d40121a,0x63a9975ba31b0b9626b34300f7f627147df1f526,0x198ef1ec325a96cc354c7266a038be8b5c558f67";
const ETHPLORER_KEY = process.env.NEXT_PUBLIC_ETHPLORER_IO_API_KEY;
const ETHPLORER_URL = process.env.NEXT_PUBLIC_ETHPLORER_API_URL;

const getCryptoCompareUrl = (path, queryString = {}) => {
  return `${process.env.NEXT_PUBLIC_CRYPTOCOMPARE_API_URL}/${path}?api_key=${
    process.env.NEXT_PUBLIC_CRYPTOCOMPARE_API_KEY
  }&${qs.stringify(queryString)}`;
};

export {
  ETHERSCAN_API_KEY,
  ETHERSCAN_API_URL,
  ETHER_URL,
  SAMPLE_SINGLE_ADDREESS,
  SAMPLE_MULTIPLE_ADDRESS,
  ETHPLORER_KEY,
  ETHPLORER_URL,
  INFURA_API_KEY,
  getCryptoCompareUrl,
};

// https://api.etherscan.io/apis
// https://sebs.github.io/etherscan-api/
