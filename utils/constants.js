const ETHERSCAN_API_KEY = process.env.NEXT_PUBLIC_ETHERSCAN_API_KEY;
const ETHERSCAN_API_URL = process.env.NEXT_PUBLIC_ETHERSCAN_API_URL;
const ETHER_URL = `${ETHERSCAN_API_URL}?apikey=${ETHERSCAN_API_KEY}`;
const SAMPLE_SINGLE_ADDREESS = "0xde0b295669a9fd93d5f28d9ec85e40f4cb697bae";
const SAMPLE_MULTIPLE_ADDRESS =
  "0xddbd2b932c763ba5b1b7ae3b362eac3e8d40121a,0x63a9975ba31b0b9626b34300f7f627147df1f526,0x198ef1ec325a96cc354c7266a038be8b5c558f67";

export {
  ETHERSCAN_API_KEY,
  ETHERSCAN_API_URL,
  ETHER_URL,
  SAMPLE_SINGLE_ADDREESS,
  SAMPLE_MULTIPLE_ADDRESS,
};