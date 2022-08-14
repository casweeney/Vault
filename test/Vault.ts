import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("Vault", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshopt in every test.
  async function deployVaultContract() {

    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await ethers.getSigners();

    const Vault = await ethers.getContractFactory("Vault");
    const vault = await Vault.deploy();

    return { vault, owner, otherAccount };
  }

  describe("Deployment", function () {
    it("Should create a grant", async function () {
        const { vault, otherAccount } = await loadFixture(deployVaultContract);

        await vault.createGrant(otherAccount.address, 0, { value: ethers.utils.parseEther("0.01") });

        const bal = await ethers.provider.getBalance(vault.address);

        console.log("BALANCE", Number(bal._hex));

        expect(await vault.bp(0)).to.have.property("beneficiary")
        .to.equal(otherAccount.address);
    });

    it("Should return contract balance", async function () {
        const { vault, otherAccount } = await loadFixture(deployVaultContract);

        await vault.createGrant(otherAccount.address, 0, { value: ethers.utils.parseEther("0.01") });

        // const bal = await ethers.provider.getBalance(vault.address);
        const bal = await vault.getBalance();

        console.log("CONTRACT BALANCE:", Number(bal._hex));

        const inputBal = await ethers.utils.parseEther("0.01");

        console.log("INPUT BAL:", Number(inputBal._hex));

        expect(bal.toString()).to.equal(
            inputBal.toString()
        );
    });

    it("Should return beneficiary balance", async function () {
        const { vault, otherAccount } = await loadFixture(deployVaultContract);

        await vault.createGrant(otherAccount.address, 0, { value: ethers.utils.parseEther("0.01") });

        const userBal = await vault.getBeneficiaryBalance(1);
        console.log("USER BALANCE:", Number(userBal._hex));
        const inputBal = await ethers.utils.parseEther("0.01");
        console.log("INPUT BALANCE:", Number(inputBal._hex));

        expect(userBal.toString()).to.equal(inputBal.toString());
    });
  });
});
