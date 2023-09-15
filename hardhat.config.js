require("@nomiclabs/hardhat-ethers");
const DEPLOY_ACC_KEY = process.env.DEPLOY_ACC_KEY;

module.exports = {
  networks: {
    mantle: {
      url: "https://rpc.testnet.mantle.xyz/",
      accounts: [DEPLOY_ACC_KEY],
    },
  },
  solidity: "0.8.0",
};
