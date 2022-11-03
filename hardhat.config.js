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
    goerli: { 
      url: `https://patient-white-energy.ethereum-goerli.discover.quiknode.pro/${quicknode}/`, 
      accounts: [privateKey],
    }, 
  }, 
  solidity: { 
    version: "0.8.4", 
  } 
}