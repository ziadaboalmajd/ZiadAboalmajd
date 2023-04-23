import { Fragment, useContext, useEffect, useState } from "react";
import classes from "../user.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AccountContext } from "../accountContext";

const RstCode = () => {
    const Url = process.env.REACT_APP_DOMAIN_LINK + process.env.REACT_APP_RST_MAIL;
    const Urle = process.env.REACT_APP_DOMAIN_LINK + process.env.REACT_APP_SEND_MAIL;

    const navigate = useNavigate();
    const { setCodePass, setRstCode } = useContext(AccountContext);

    const [code, setCode] = useState("");
    const [statueM, setStatueM] = useState("");
    const email = localStorage.getItem("mail");
    useEffect(() => {
        let timer = setTimeout(() => setStatueM(""), 2000);
        return () => {
            clearTimeout(timer);
        };
    }, [statueM]);

    useEffect(() => {
        axios.get(Url, { withCredentials: true }).then((response) => {
            try {
                if (response.data) {
                    setRstCode(response.data.code);
                }
            } catch (err) {
                console.log(err);
            }
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const numberInput = (e) => {
        const regex = /^[0-9\b]+$/;
        if (e.target.value === "" || regex.test(e.target.value)) {
            setCode(e.target.value);
        }
    };

    const verifyCode = (e) => {
        e.preventDefault();
        if (code.length > 5) {
            axios.get(Url, { withCredentials: true }).then((response) => {
                if (response.data) {
                    setRstCode(response.data.code);
                    if (Number(code) === Number(response.data.code)) {
                        setCodePass(true);
                        navigate(process.env.REACT_APP_RST_PASS);
                    } else {
                        setCodePass(false);
                        setStatueM("wrong code please check again");
                    }
                }
            }).catch(() => {
                setStatueM("an error occurs");
            });

        } else {
            setCodePass(false);
            setStatueM("enter 6 characters code");
        }
    };

    const reSend = async (e) => {
        setStatueM("waiting for resend");
        e.preventDefault();
        const body = {
            to: email
        };
        axios.post(Urle, body).then((response) => {
            if (response.data.sent === true) {
                // navigate("/user/restCode")
                setStatueM("email has been resend");
            }
        }).catch(() => {
            setStatueM("an error occurs");
        })
    };

    return (
        <Fragment>
            <section className={`section ${classes.login} ${classes.rstCode}`}>
                <h1>verify</h1>
                <form onSubmit={verifyCode}>
                    <label>enter the code</label>
                    <input
                        type="text"
                        pattern="\d*"
                        maxLength={6}
                        value={code}
                        onChange={(e) => numberInput(e)}
                    ></input>
                    <button>verify code</button>
                    <h3>{statueM}</h3>
                </form>
                <h6>
                    an email with a 6-digits number has been sent to {email},{" "}
                    <span onClick={reSend}>
                        resend email ?
                    </span>
                </h6>
            </section>
        </Fragment>
    );
};

export default RstCode;
