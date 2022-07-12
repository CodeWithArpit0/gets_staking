import SmartContract from "../utils/getSmart";
import web3 from "web3";
import { getUserAddress } from "./Web3Actions";

// ** Function to get total staked amount on contract 
export async function getTotalStakedAmount() {
    const amount = await SmartContract.methods._totalStaked().call();
    const totalStakedAmount = web3.utils.fromWei(amount);
    return totalStakedAmount;
}

// ** Function to get total staked amount of user
export async function getUserTotalStakedAmount(walletAddress) {
    const amount = await SmartContract.methods.userTotalSake(walletAddress).call();
    const totalStakedAmount = web3.utils.fromWei(amount);
    return totalStakedAmount;
}

// ** Function to get the user current staked amount
export async function getUserCurrentStakedAmount(walletAddress) {
    const amountInWei = await SmartContract.methods.UserTotallockAmount(walletAddress).call();
    const amountInETH = web3.utils.fromWei(amountInWei);
    return amountInETH;
}

// ** Function to get the GETS token balance of user
export async function getBalance(address) {
    const amountInWei = await SmartContract.methods.myBalance(address).call();
    const balance = web3.utils.fromWei(amountInWei);
    return balance;
}

export async function stakeAmount(amount) {
    // Converting amount into Wei
    const amountInWei = web3.utils.toHex(web3.utils.toWei(amount.toString(), 'ether'));
    // Wallet address that transaction sending from
    const obj = await SmartContract.methods.stake(amountInWei).encodeABI();

    const walletAddress = await getUserAddress();
    const stakeObj = {
        from: walletAddress,
        to: "0x78f0845Fe0AE6aEb205a1582e866d65FA95bb944",
        data: obj,
        chainId: 4
    }

    let response = { code: null, msg: null };

    try {
        const txHash = await window.ethereum.request({ method: 'eth_sendTransaction', params: [stakeObj] })

        response.code = 200;
        response.msg = txHash;
        return response;
    } catch (err) {
        console.log(err);
        response.code = err.code;
        response.message = err.message;
        return response;
    }
}

export async function unstakeToken() {
    const obj = await SmartContract.methods.Unstake().encodeABI();
    const walletAddress = await getUserAddress();
    console.log(walletAddress);
    const unstakeObj = {
        from: walletAddress,
        to: "0x78f0845Fe0AE6aEb205a1582e866d65FA95bb944",
        data: obj,
        chainId: 4,
    }

    let response = { code: null, msg: null };

    try {
        const txHash = await window.ethereum.request({ method: 'eth_sendTransaction', params: [unstakeObj] });

        response.code = 200;
        response.msg = txHash;
        return response;

    } catch (err) {
        console.log("Unstake Error : ");
        console.log(err);
        response.code = err.code;
        response.msg = err.message;
        return response;
    }
}

export async function claimToken() {
    const obj = await SmartContract.methods.Claim().encodeABI();
    const walletAddress = await getUserAddress();

    const claimObj = {
        from: walletAddress,
        to: "0x78f0845Fe0AE6aEb205a1582e866d65FA95bb944",
        data: obj,
        chainId: 4,
    }

    const response = { code: null, msg: null };

    try {
        const txHash = await window.ethereum.request({ method: 'eth_sendTransaction', params: [claimObj] });

        response.code = 200;
        response.msg = txHash;
        return response;

    } catch (err) {
        console.log("Claim err : ", err);
        response.code = err.code;
        response.msg = err.message;
        return response;
    }
}

export async function getUnlockTime(address) {
    const res = await SmartContract.methods.unlockTime_(address).call();
    console.log("Response : ", res);
    return res;
}