require("dotenv").config({ path: ".env" });
import { BytesLike } from "ethers";
import { ethers } from "hardhat";

const main = async () => {
    let provider = {
        PrivateKey: process.env.ACCOUNT_PRIVATE_KEY2 as BytesLike,
        URL: process.env.ALCHEMY_RINKEBY_API_KEY_URL,
    }

    const provider2 = ethers.getDefaultProvider("rinkeby", provider.URL);
    let wallet = new ethers.Wallet(provider.PrivateKey, provider2);
    const _value = ethers.utils.parseEther("0.01");

    const CONTRACT_ADDRESS = "0x34d2D280dD9De3C9ec9052452D98723Faf4920CC";
    const VAULT = await ethers.getContractAt("IVault", CONTRACT_ADDRESS);

    /// CREATE GRANT
    // await VAULT.createGrant("0x43854246B624D4493BaE24545c462c11CF140C91", 0, { value: _value });

    /// GET CONTRACT BALANCE
    // const bal = await VAULT.getBalance();
    // console.log("Contract Balance: ", Number(bal._hex));

    /// GET BENEFICIARY BALANCE
    // const benBal = await VAULT.getBeneficiaryBalance(2);
    // console.log("Beneficiary Balance: ", Number(benBal._hex));

    /// GET ALL BENEFICIARY
    // const allBen = await VAULT.getAllBeneficiary();
    // console.log("ALL BEN: ", allBen);

    /// BENEFICIARY WITHDRAW FUNDS
    const user = await VAULT.withdraw(2);
    console.log("Reached: ", user);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});