import { ethers } from "hardhat";

async function main() {
  let [user1, user2] = await ethers.getSigners();

  const Vault = await ethers.getContractFactory(
    "Vault"
  );
  const vault = await Vault.deploy();
  await vault.deployed();

  console.log("Vault deployed to: ", vault.address);

  const owner = await vault.owner();
  console.log("OWNER", owner);

  const createGrant = await vault.createGrant(user2.address, 0, { value: ethers.utils.parseEther("0.01") });
  const newGrant = await createGrant.wait();
  console.log("NEW GRANT", newGrant);

  const contractBalance = await vault.connect(user1).getBalance();
  console.log("BALANCE: ", contractBalance);


  const getBeneficiaries = await vault.connect(user1).getAllBeneficiary();
  console.log("ALL BENEFICIARIES", getBeneficiaries);

  


}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });