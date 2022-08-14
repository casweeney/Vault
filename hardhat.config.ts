// require("@nomiclabs/hardhat-waffle");
import "@nomiclabs/hardhat-ethers";
require("@nomiclabs/hardhat-etherscan")
require("dotenv").config({ path: ".env" });

const ALCHEMY_RINKEBY_API_KEY_URL = process.env.ALCHEMY_RINKEBY_API_KEY_URL;

const ALCHEMY_GOERLI_API_KEY_URL = process.env.ALCHEMY_GOERLI_API_KEY_URL;

const ALCHEMY_MUMBAI_API_KEY_URL = process.env.ALCHEMY_MUMBAI_API_KEY_URL;

const INFURA_ROPSTEN_API_KEY_URL = process.env.INFURA_ROPSTEN_API_KEY_URL;

const ACCOUNT_PRIVATE_KEY = process.env.ACCOUNT_PRIVATE_KEY;
const ACCOUNT_PRIVATE_KEY2 = process.env.ACCOUNT_PRIVATE_KEY2;

const API_TOKEN = process.env.API_TOKEN;

module.exports = {
  solidity: "0.8.9",
  networks: {
    rinkeby: {
      url: ALCHEMY_RINKEBY_API_KEY_URL,
      accounts: [ACCOUNT_PRIVATE_KEY2],
    },
    ropsten: {
      url: INFURA_ROPSTEN_API_KEY_URL,
      accounts: [ACCOUNT_PRIVATE_KEY],
    },
    goerli: {
      url: ALCHEMY_GOERLI_API_KEY_URL,
      accounts: [ACCOUNT_PRIVATE_KEY],
    },
    mumbai: {
      url: ALCHEMY_MUMBAI_API_KEY_URL,
      accounts: [ACCOUNT_PRIVATE_KEY],
    }
  },
  etherscan: {
    apiKey: API_TOKEN
  }
};