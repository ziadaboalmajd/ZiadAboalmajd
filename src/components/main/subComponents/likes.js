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
          console.log(response.data);
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

        </>
      ) : (
        <>
          <AiOutlineHeart
            className={classes.lovebtn}
            onClick={() => {
              postlikes(props.id);
            }}
          />

        </>
      )}
    </div>
  );
};

export default Likes;
