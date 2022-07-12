import web3 from "../web3";

export function isWalletAvailable() {
    if (typeof window.ethereum !== "undefined") {
        if (window.ethereum && window.ethereum.isMetaMask) {
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
}

export async function getUserAddress() {
    const accounts = await window.ethereum.request({ method: "eth_requestAccounts", })

    return accounts[0];
}

export async function getChainID() {
    let chainID;
    chainID = await web3.eth.getChainId();
    return chainID;
}

export async function getWalletBalance() {
    const walletAddress = await getUserAddress();
    const walletBalanceInWei = await web3.eth.getBalance(walletAddress);
    const mainBalance = web3.utils.fromWei(walletBalanceInWei);
    return mainBalance;
}