require("@nomiclabs/hardhat-waffle"); 
const fs = require('fs'); 
const privateKey = fs.readFileSync(".secret").toString()

module.exports = { 
  defaultNetwork : "hardhat", 
  networks: { 
    hardhat: { 
      chainId: 1337 
    }, 
    csc: { 
      url: `https://testnet-rpc.coinex.net`, 
      accounts: [privateKey] 
    }, 
  }, 
  solidity: { 
    version: "0.8.4", 
  } 
}