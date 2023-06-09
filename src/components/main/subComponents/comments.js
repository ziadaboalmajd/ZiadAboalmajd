import { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import { AccountContext } from "../../user/accountContext";
import { FaTrash } from "react-icons/fa";
import classes from "./certNcom.module.css";
import { useNavigate } from "react-router-dom";
import Likes from "./likes";

const Comments = () => {
  const navigate = useNavigate();
  const { user } = useContext(AccountContext);
  const comSec = useRef();
  const [comment, setComment] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [comMore, setComMore] = useState(false);
  const [deleteC, setDeleteC] = useState(false);
  const [statueM, setStatueM] = useState("");
  const [comId, setComId] = useState("");
  const [noComm, setNoComm] = useState(null);
  const [statuedis, setStatuedis] = useState(false);

  const Url =
    process.env.REACT_APP_DOMAIN_LINK + process.env.REACT_APP_COMMENTA;
  const urll = process.env.REACT_APP_DOMAIN_LINK + process.env.REACT_APP_LIKE;

  const current = new Date();
  const date = `${current.getDate()}-${
    current.getMonth() + 1
  }-${current.getFullYear()}`;
  /*const aComment =!comMore && comment.length > 3 && comment.length !== 0? comment.slice(0, 3): comment;*/
  deleteC
    ? document.body.classList.add(classes.stopScroll)
    : document.body.classList.remove(classes.stopScroll);

  useEffect(() => {
    setStatuedis(false);
    let timer = setTimeout(() => setStatueM(""), 2000);
    return () => {
      clearTimeout(timer);
    };
  }, [statueM]);

  useEffect(() => {
    getComments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    let obj = comment.find((o) => o.name === user.user);
    setNoComm(obj !== undefined);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [comment]);

  const postComments = async (e) => {
    e.preventDefault();
    if (newComment.replace(/ /g, "").length > 7) {
      try {
        const body = {
          name: user.user,
          value: String(newComment),
          time: date,
        };
        axios
          .post(Url, body, {
            withCredentials: true,
          })
          .then((response) => {
            if (response.data) {
              setNewComment("");
              setComMore(true);
            }
            getComments();
          });
      } catch (err) {
        console.log(err);
      }
    } else {
      setStatueM("comment must be at least 7 characters");
    }
  };

  const deleteComment = async (e) => {
    e.preventDefault();
    setStatuedis(false);
    const body = {
      id: comId,
    };
    axios.post(urll + "/rmv", body);
    axios
      .post(Url + "/delete", body, {
        withCredentials: true,
      })
      .then((response) => {
        if (response) {
          setDeleteC(false);
          setStatueM("comment has been deleted");
        }
        getComments();
      })
      .catch(() => {
        setStatueM("an error occurs");
      });
  };

  const getComments = async () => {
    try {
      axios
        .get(Url, {
          withCredentials: true,
        })
        .then((response) => {
          if (response.data && user) {
            setComment(response.data);
          }
        });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div id="comments" className={`section ${classes.comment}`}>
      <h1>comments</h1>
      {user.login && !noComm ? (
        <form
          onSubmit={(e) => {
            setStatuedis(true);
            postComments(e);
          }}
          className={classes.comForm}
        >
          <label>leave your comment here</label>
          <textarea
            maxLength={150}
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          ></textarea>
          <h5>{statueM}</h5>
          <button disabled={statuedis}>post</button>
        </form>
      ) : (
        <div className={classes.comLock}>
          <h3
            onClick={() => {
              if (!user.login) navigate(process.env.REACT_APP_LOGIN);
            }}
          >
            {noComm && user.login
              ? "you only could post one comment"
              : "login to be able to comment"}
          </h3>
        </div>
      )}
      <div ref={comSec}>
        {!comment || comment.length === 0 ? (
          <div className={classes.comAlert}>
            <h4>no comments yet , be the first one to comment</h4>
          </div>
        ) : (
          comment?.map((comments, index) => {
            const { id, time, value, name } = comments;
            return (
              <div
                key={id}
                className={`${classes.secomment} ${
                  index > 2 && comMore
                    ? classes.secMoreC
                    : index > 2
                    ? classes.seclessC
                    : ""
                }`}
              >
                <div>
                  <h3>{name}</h3>
                  <h5>{time}</h5>
                </div>
                <div className={classes.comSupSec}>
                  <p>{value}</p>
                  <div>
                    <Likes
                      index={index}
                      user={user.user}
                      log={user.login}
                      id={id}
                    />
                    {user.login && user.user === name ? (
                      <FaTrash
                        className={classes.trash}
                        onClick={() => {
                          setComId(id);
                          setDeleteC(true);
                        }}
                      />
                    ) : (
                      ""
                    )}
                  </div>
                </div>
                <div></div>
              </div>
            );
          })
        )}
        {comment.length > 3 ? (
          <h6
            className={classes.showCom}
            onClick={() => {
              setComMore(!comMore);
            }}
          >
            {comMore ? (
              `show less`
            ) : (
              <span>
                show <span>{comment.length - 3}</span> more
              </span>
            )}
          </h6>
        ) : (
          ""
        )}
      </div>
      <div className={`${classes.delete} ${deleteC ? classes.imgOpen : ""}`}>
        <div>
          <p>are you sure you want to delete your comment ?</p>
          <div>
            <h5 onClick={deleteComment}>yes</h5>
            <h5
              onClick={() => {
                setDeleteC(false);
              }}
            >
              no
            </h5>
          </div>
        </div>
        <div
          onClick={() => {
            setDeleteC(false);
          }}
        ></div>
      </div>
    </div>
  );
};

export default Comments;
