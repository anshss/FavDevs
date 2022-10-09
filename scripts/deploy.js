const { ethers } = require("hardhat"); 
const fs = require("fs"); 

async function main() { 
  const contract = await ethers.getContractFactory("Mood"); 
  const deployedContract = await contract.deploy()
  await deployedContract.deployed(); 
      // Wait for it to finish deploying 
  console.log("Address:", deployedContract.address); 
  fs.writeFileSync('./address.js', `export const contractAddress = "${deployedContract.address}"`) 
} 

// Call the main function and catch if there is any error 
main() 
  .then(() => process.exit(0)) 
  .catch((error) => { 
    console.error(error); 
    process.exit(1); 
  });