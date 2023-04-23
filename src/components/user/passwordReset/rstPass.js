import React, { useState, Fragment, useContext, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AccountContext } from "../accountContext";
import classes from "../user.module.css";


const LogIn = () => {
    const navigate = useNavigate();

    const Url = process.env.REACT_APP_DOMAIN_LINK + process.env.REACT_APP_UP_PASS;

    const { setUser, setCodePass } = useContext(AccountContext);
    const [pass, setPass] = useState("");
    const [cpass, setCpass] = useState("");
    const [statueM, setStatueM] = useState("");

    useEffect(() => {
        let timer = setTimeout(() => setStatueM(""), 2000);
        return () => {
            clearTimeout(timer);
        };
    }, [statueM]);

    const checkValid = () => {
        if (pass.length < 6) {
            setStatueM("short username at least 6 characters");
        }
        if (cpass !== pass) {
            setStatueM("password don't match");
        }
    };

    const upPass = async (e) => {
        e.preventDefault();
        if (pass.length > 6 && cpass === pass) {
            const body = { pass: pass, cpass: cpass };
            axios.post(Url, body, { withCredentials: true }).then((response) => {
                if (response.data.login === true) {
                    setUser({ login: true, user: response.data.user });
                    navigate(process.env.REACT_APP_HOME);
                    setCodePass(false);
                }
            }).catch(() => {
                setUser({ login: false });
                setStatueM("an error occurs");
            })
        } else {
            checkValid()
        }
    };

    return (
        <Fragment>
            <section className={`section ${classes.login} ${classes.rstPass}`}>
                <h1>update password</h1>
                <form onSubmit={upPass}>
                    <label>new password</label>
                    <input
                        type="text"
                        name="text"
                        autoComplete="off"
                        maxLength={35}
                        value={pass}
                        onChange={(e) => setPass(e.target.value)}
                    ></input>
                    <label>confirm new password</label>
                    <input
                        type="text"
                        name="text"
                        autoComplete="off"
                        maxLength={35}
                        value={cpass}
                        onChange={(e) => setCpass(e.target.value)}
                    ></input>
                    <button>update</button>
                    <h3>{statueM}</h3>
                </form>
            </section>
        </Fragment>
    );
};

export default LogIn;