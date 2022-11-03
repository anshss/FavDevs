require("@nomiclabs/hardhat-waffle"); 
const fs = require('fs'); 
const privateKey = fs.readFileSync(".secret").toString()
const quicknode = fs.readFileSync(".quicknode").toString()

module.exports = { 
  defaultNetwork : "hardhat", 
  networks: { 
    hardhat: { 
      chainId: 1337 
    }, 
    csc: {
      url: `https://testnet-rpc.coinex.net`, 
      accounts: [privateKey],
    },
    mumbai: { 
      url: `https://black-fittest-tab.matic-testnet.discover.quiknode.pro/${quicknode}/`, 
      accounts: [privateKey],
    }, 
  }, 
  solidity: { 
    version: "0.8.4", 
  } 
}