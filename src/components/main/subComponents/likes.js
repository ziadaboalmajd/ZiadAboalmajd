import axios from "axios";
import { useEffect, useState } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import classes from "./certNcom.module.css";

const Likes = (props) => {
  const Url = process.env.REACT_APP_DOMAIN_LINK + process.env.REACT_APP_LIKE;
  const [loved, setLoved] = useState([]);
  const [likes, setLikes] = useState([]);

  useEffect(() => {
    getlikes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getlikes = async () => {
    try {
      console.log(props.user);
      const body = {
        user: props.user ? props.user : "",
      };
      axios
        .post(Url + "/usr", body, {
          withCredentials: true,
        })
        .then((response) => {
          if (response.data) {
            console.log(response.data);
            setLoved(response.data);
          }
        });
    } catch (err) {
      console.log(err);
    }
  };

  const postlikes = async (id) => {
    try {
      const body = {
        id: id,
        name: props.log ? props.user : "",
      };
      axios
        .post(Url, body, {
          withCredentials: true,
        })
        .then((response) => {
          if (response.data) {
            console.log(response.data);
            setLoved(response.data);
          }
        });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={classes.likeCont}>
      {props.log && loved.includes(props.id) ? (
        <AiFillHeart
          className={classes.lovebtn}
          onClick={() => {
            postlikes(props.id);
          }}
        />
      ) : (
        <AiOutlineHeart
          className={classes.lovebtn}
          onClick={() => {
            postlikes(props.id);
          }}
        />
      )}
      <h6>number of likes</h6>
    </div>
  );
};

export default Likes;
