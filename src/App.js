import './App.css';
import Logo from "./assets/images/logo.png";
import MetaMask from './Components/MetaMask';
import { useState } from "react";
import Staking from './pages/Staking';

function App() {
  const [User, setUser] = useState({
    wallet: false,
    walletBalance: 0,
    walletAddress: "",
    chainID: null,
  });
  return (
    <div className="App">
      <div className="container">
        <div className="left">
          <div className="brandLogo">
            <div className="logo">
              <img src={Logo} alt="brand logo" />
            </div>
            <div className="logoText">
              <h1>GET SMART <br />STAKING</h1>
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
          {User.wallet ? (
            <Staking User={User}/>
          ) : (
            <MetaMask setUser={setUser} />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
