require("@nomiclabs/hardhat-waffle");
require("dotenv").config();
const {PRIVATE_KEY } = process.env;
module.exports = {
  solidity: "0.8.4",
  paths: {
    artifacts: "./src/backend/artifacts",
    sources: "./src/backend/contracts",
    cache: "./src/backend/cache",
    tests: "./src/backend/test"
  },
  defaultNetwork: "sepolia",
  networks:{
    sepolia:{
      url:'https://sepolia.infura.io/v3/3b27bf71a11d414cb9becb3f4473ae92',
      accounts:[PRIVATE_KEY],
      chainId: 11155111,
    }
  }
  
};
