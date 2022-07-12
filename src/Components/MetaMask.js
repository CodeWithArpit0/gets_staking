import MetaMaskLogo from "../assets/images/metamask.png";
import Logo from "../assets/images/logo.png";
import { useState } from "react";
import { getChainID, getUserAddress, getWalletBalance, isWalletAvailable } from "../actions/Web3Actions";

export default function MetaMask({ setUser }) {
    const [ConnectBtn, setConnectBtn] = useState(false);


    async function connectToMetaMask() {
        const wallet = isWalletAvailable();

        if (wallet) {
            const walletAddress = await getUserAddress();
            const walletBalance = await getWalletBalance();
            const chainID = await getChainID();

            setUser({
                wallet,
                walletBalance,
                walletAddress,
                chainID
            })
        }
    }
    return (
        <div className="walletContainer">
            <div className="logoAvatar">
                <img src={Logo} />
            </div>
            {ConnectBtn ? (
                <div className="metamask">
                    <button className="metamaskBtn" onClick={connectToMetaMask}>
                        <div className="metamaskLogo">
                            <img src={MetaMaskLogo} alt="metamask icon" />
                        </div>
                        <p>Connect to MetaMask</p>
                    </button>
                </div>
            ) : (
                <button className="walletConnectBtn" onClick={() => setConnectBtn(true)}>Connect Wallet</button>
            )}

        </div>
    );
}