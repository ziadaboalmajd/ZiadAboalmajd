import axios from "axios";
import { useEffect, useState } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import classes from "./certNcom.module.css";

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
    try {
      const body = {
        user: props.user,
      };
      axios.post(Url + "/usr", body).then((response) => {
        if (response.data !== null) {
          setLoved(response.data);
        } else {
          setLoved([]);
        }
      });
    } catch (err) {
      console.log(err);
    }
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

  const postlikes = async (id) => {
    const body = {
      id: id,
      name: props.log ? props.user : "",
    };
    axios
      .post(Url, body)
      .then((response) => {
        if (response.data !== "error") {
          getlikes();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  console.log(likes[props.index - 1]);
  console.log(likes[props.index - 1].cardinality);
  console.log(Number(likes[props.index - 1].cardinality));
  let nlike = Number(likes[props.index - 1].cardinality);
  return (
    <div className={classes.likeCont}>
      {loved.includes(Number(props.id)) && props.log ? (
        <>
          <AiFillHeart
            className={classes.lovebtn}
            onClick={() => {
              postlikes(props.id);
            }}
          />
          <h6>you {nlike > 1 ? ` and ${nlike - 1} other` : ""}</h6>
        </>
      ) : (
        <>
          <AiOutlineHeart
            className={classes.lovebtn}
            onClick={() => {
              postlikes(props.id);
            }}
          />
          <h6>
            {Number(likes[props.index - 1]) > 1
              ? `${likes[props.index - 1].length - 1} love`
              : "one love"}
          </h6>
        </>
      )}
    </div>
  );
};

export default Likes;
