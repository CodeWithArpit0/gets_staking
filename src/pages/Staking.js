import "./Staking.css";
import balance from "../assets/images/balance.png";
import staked from "../assets/images/staked.png";
import staking from "../assets/images/staking.png";
import { IoMdWallet } from "react-icons/io";
import { BiLogIn } from "react-icons/bi";
import { RiErrorWarningLine } from "react-icons/ri";
import { getTotalStakedAmount, getUserCurrentStakedAmount, getUserTotalStakedAmount, getBalance, stakeAmount, unstakeToken, claimToken, getUnlockTime } from "../actions/SmartActions";
import { useState, useEffect } from "react";
import Loader from "../Components/Loader";
import StakeModel from "../Components/stakeModel";
import StakeLoader from "../Components/stakeLoader";

export default function Staking({ User }) {
    const [Details, setDetails] = useState({
        checkDetails: false,
        totalStaked: 0,
        userTotalStaked: 0,
        userCurrentStake: 0,
        balance: 0,
        unlockTime: null,
    });
    const [amount, setAmount] = useState(0);
    const [model, setModel] = useState(false);
    const [loader, setLoader] = useState(false);
    const [error, setError] = useState({
        error: false,
        msg: ""
    });

    async function getUserData() {
        const totalStakedAmount = parseInt(await getTotalStakedAmount());
        const userCurrentStakedAmount = parseInt(await getUserCurrentStakedAmount(User.walletAddress));
        const GETsBalance = parseInt(await getBalance(User.walletAddress));
        const userTotalStakedAmount = parseInt(await getUserTotalStakedAmount(User.walletAddress));

        setDetails({
            checkDetails: true,
            totalStaked: totalStakedAmount,
            userTotalStaked: userTotalStakedAmount,
            userCurrentStake: userCurrentStakedAmount,
            balance: GETsBalance
        });
    }

    useEffect(() => {
        getUserData()
    }, []);

    const stake = async () => {
        try {
            if (amount === "0" || amount === 0) {
                setError({ error: true, msg: "Stake amount cannot be 0!" });
            }
            else if (amount === "") {
                setError({ error: true, msg: "Please enter the stake amount!" });
            } else {
                setError({ error: false, msg: null });
                setLoader(true);

                const res = await stakeAmount(amount);

                if (res.code === 200) {
                    setModel(true);

                } else if (res.code === 4001) {
                    setLoader(false);
                    setError({ error: true, msg: "User denied transaction signature!" });
                }
                setLoader(false);
            }

        } catch (err) {
            console.log(err)
        }
    }

    const unstake = async () => {
        setLoader(true);
        try {
            setError({ error: false, msg: null });
            const res = await unstakeToken();
            if (res.code === 200) {
                setLoader(false);
            } else if (res.code === 4001) {
                setLoader(false);
                setError({ error: true, msg: "User denied transaction signature!" });
            }
        } catch (err) {
            console.log(err);
        }
    }

    const claim = async () => {
        setError({ error: false, msg: null });
        setLoader(true);
        try {
            const res = await claimToken();
            if (res.code === 200) {
                setLoader(false);
            } else if (res.code === 4001) {
                setLoader(false);
                setError({ error: true, msg: "User denied transaction signature!" });
            }

        } catch (err) {
            console.log(err);
        }
    }

    const closeModelAndRefresh = async () => {
        setModel(false);

    }
    const handleInput = (amount) => {
        setAmount(amount);
    }
    const getTime = async () => {
        const res = await getUnlockTime(User.walletAddress);
        const time = new Date(res * 1000);
        console.log(time)
        console.log(time.getMinutes());
    }
    return (
        <div className="stakeContainer">
            {/* Staking loader */}
            {loader ? (
                <StakeLoader />
            ) : null}
            {Details.checkDetails ? (
                <div className="stakeUI">
                    <div className="walletDetails">
                        <div className="walletAddress">
                            <div className="walletIcon">
                                <IoMdWallet className="wallet-icon" />
                            </div>
                            <div className="address">
                                <p>{User.walletAddress.slice(0, 10)}...{User.walletAddress.slice(-5)}</p>
                            </div>
                        </div>

                        <button className="logoutBtn">
                            <BiLogIn className="logoutIcon" />
                            Logout
                        </button>
                    </div>
                    <div className="cardsContainer">
                        <Card title="Total Staked" balance={Details.userTotalStaked} iconPath={staked} />
                        <Card title="My Balance" balance={Details.balance} iconPath={balance} />
                        <Card title="My Staking" balance={Details.userCurrentStake} iconPath={staking} />
                    </div>

                    <div className="stakingContainer">
                        <h2>STAKE YOUR TOKENS</h2>
                        <div className="stakeBox">
                            <div className="stakeField">
                                <input type="text" onChange={(e) => handleInput(e.target.value)} placeholder="Amount" />
                                <span>GETS</span>
                            </div>
                            <div className="stakeDetails">
                                <p>Total Staked : <span>{Math.round(Details.totalStaked)} GETS</span></p>
                            </div>
                        </div>
                        <div className="stakeBtns">
                            <button onClick={stake}>Stake</button>
                            <button onClick={unstake}>Unstake</button>
                            <button onClick={claim}>Claim</button>
                        </div>
                        <div className="timerBox">
                            <div className="unstakeTime timer">
                                {/* <p>Unstake in : &nbsp;<span>1 H : 2 M : 5 S</span></p> */}
                                <p>Unstake in : <button onClick={getTime}>Get Time</button></p>
                            </div>
                            <div className="claimime timer">
                                <p>Claim in : &nbsp;<span>1 H : 2 M : 5 S</span></p>
                            </div>
                        </div>
                        {error.error ? (
                            <div className="errorBox">
                                <RiErrorWarningLine className="errorIcon" />
                                <p>{error.msg}</p>
                            </div>
                        ) : null}



                    </div>

                    {model ? (<StakeModel closeModel={closeModelAndRefresh} amount={amount} />) : (null)}
                </div>
            ) : (
                <Loader />
            )}

        </div>
    );
}

function Card({ title, balance, iconPath }) {
    return (
        <div className="card">
            <div className="cardLogo">
                <img src={iconPath} alt="Card Logo" />
            </div>
            <div className="cardDetails">
                <h3>{title}</h3>
                <h3>{Math.round(balance)}</h3>
                <h3>GETS</h3>
            </div>
        </div>
    );
}