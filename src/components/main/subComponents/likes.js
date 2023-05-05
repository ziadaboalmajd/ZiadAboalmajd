import axios from "axios";
import { useEffect, useState } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import classes from "./certNcom.module.css";

const Likes = (props) => {
  const Url = process.env.REACT_APP_DOMAIN_LINK + process.env.REACT_APP_LIKE;
  const [loved, setLoved] = useState(null);
  const [likes, setLikes] = useState();
  let HeartIcon = loved ? AiFillHeart : AiOutlineHeart;

  useEffect(() => {
    getlikes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    let obj = likes.find((o) => o.name === props.user);
    console.log(obj !== undefined);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [likes]);

  const getlikes = async () => {
    try {
      axios
        .post(Url, {
          withCredentials: true,
        })
        .then((response) => {
          if (response.data) {
            console.log(response.data);
            setLikes(response.data);
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
            setLikes(response.data);
          }
        });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <HeartIcon
      className={classes.lovebtn}
      onClick={() => {
        setLoved(!loved);
        postlikes(props.id);
      }}
    />
  );
};

export default Likes;
