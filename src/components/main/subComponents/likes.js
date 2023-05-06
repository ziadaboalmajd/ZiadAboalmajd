import axios from "axios";
import { useEffect, useState } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import classes from "./likes&profile.module.css";

const Likes = (props) => {
  const Url = process.env.REACT_APP_DOMAIN_LINK + process.env.REACT_APP_LIKE;
  const [loved, setLoved] = useState([]);
  const [likes, setLikes] = useState([]);

  useEffect(() => {
    getNlikes();
    getlikes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getlikes = async () => {
    const body = {
      user: props.user,
    };
    axios
      .post(Url + "/usr", body)
      .then((response) => {
        if (response.data !== null) {
          setLoved(response.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getNlikes = async () => {
    axios
      .get(Url + "/nusr")
      .then((response) => {
        if (response.data !== null) {
          setLikes(response.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const postLlikes = (id, index) => {
    loved.includes(Number(id))
      ? setLoved(loved.filter((i) => i !== Number(id)))
      : setLoved(loved.concat(Number(id)));
    let newLike = likes;
    loved.includes(Number(id))
      ? (newLike[index].cardinality = newLike[index].cardinality - 1)
      : (newLike[index].cardinality += 1);
    setLikes(newLike);
  };
  const postlikes = async (id) => {
    const body = {
      id: id,
      name: props.log ? props.user : "",
    };
    axios.post(Url, body).catch((err) => {
      console.log(err);
    });
  };
  let nlike =
    likes[0] !== undefined ? Number(likes[props.index].cardinality) : 0;
  return (
    <div className={classes.likeCont}>
      {loved.includes(Number(props.id)) && props.log ? (
        <>
          <AiFillHeart
            className={classes.lovebtn}
            onClick={() => {
              postLlikes(props.id, props.index);
              postlikes(props.id);
            }}
          />
          {nlike !== 0 ? (
            <h6>you{nlike === 1 ? "" : ` and ${nlike - 1} other`}</h6>
          ) : (
            ""
          )}
        </>
      ) : (
        <>
          {props.log ? (
            <>
              <AiOutlineHeart
                className={classes.lovebtn}
                onClick={() => {
                  postLlikes(props.id, props.index);
                  postlikes(props.id);
                }}
              />
              {nlike !== 0 ? (
                <h6>{nlike === 1 ? "one love" : `${nlike} love`}</h6>
              ) : (
                ""
              )}
            </>
          ) : (
            <>
              {nlike !== 0 ? (
                <h6>{nlike === 1 ? "one 🤍 love" : `${nlike} 🤍 love`}</h6>
              ) : (
                ""
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};
export default Likes;
