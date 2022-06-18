// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

const main = async () => {
  const donationContractFactory = await hre.ethers.getContractFactory(
    "contracts/Donation.sol:Donation"
  );
  const donationContract = await donationContractFactory.deploy();
  await donationContract.deployed();

  console.log("donationContract address: ", donationContract.address);

  const cloneContractFactory = await hre.ethers.getContractFactory(
    "contracts/CloneFactory.sol:CloneFactory"
  );
  const cloneFactoryContract = await cloneContractFactory.deploy(
    donationContract.address
  );

  await cloneFactoryContract.deployed();
  console.log("Clone Factory contract address: ", cloneFactoryContract.address);
};

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
