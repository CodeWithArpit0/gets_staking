import Logo from "../assets/images/logo.png";
import MetaMask from '../Components/MetaMask';
import { useState } from "react";

export default function Staking() {
    const [ConnectBtn, setConnectBtn] = useState(false);

    return (
        <div className="container">
            <div className="left">
                <div className="brandLogo">
                    <div className="logo">
                        <img src={Logo} alt="brand logo" />
                    </div>
                    <div className="logoText">
                        <h1>GET SMART STAKING</h1>
                    </div>
                </div>

                <div className="primaryHeading">
                    <h1>STAKE YOUR ETHEREUM <br /> USING GETs TOKEN</h1>
                </div>
                {/* <div>
            <button className="stakeBtn" onClick={() => setConnectBtn(true)}>Stake Now</button>
          </div> */}
            </div>
            <div className="right">
                <MetaMask ConnectBtn={ConnectBtn} setConnectBtn={setConnectBtn} />
            </div>
        </div>
    );
}