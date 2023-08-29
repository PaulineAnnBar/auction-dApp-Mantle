require("@nomiclabs/hardhat-ethers");

module.exports = {
  networks: {
    mantle: {
      url: "https://rpc.testnet.mantle.xyz/",
      accounts: [
        "31f262a5df778e72d36acb05112a8682465133614bf29542f729b0a4d520df93",
      ],
    },
  },
  solidity: "0.8.0",
};
