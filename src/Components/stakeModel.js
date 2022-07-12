import "./stakeModel.css";
import { useState } from "react";
import logo from "../assets/images/logo.png";

export default function stakeModel({ closeModel, amount }) {
    return (
        <div className="stakeModelBG">
            <div className="mainModel">
                <div className="stakeLogo">
                    <img src={logo} alt="Gets logo" />
                </div>
                <h1>Congratulations</h1>
                <h2>You have staked your {amount} GETS {amount > 1 ? "tokens" : "token"}</h2>

                <div className="modelBtns">
                    <button className="closeBtnA" onClick={closeModel} title="Close model and stake more tokens">
                        Stake more tokens
                    </button>
                    <button className="closeBtnB" onClick={closeModel} title="Close Model">
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}