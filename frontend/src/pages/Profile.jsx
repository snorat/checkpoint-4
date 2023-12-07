/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { MdDeleteOutline } from "react-icons/md";
import ExportContext from "../contexts/Context";
import CardPost from "../components/CardPost";

export default function MyFavorite() {
  const { infoUser } = useContext(ExportContext.Context);
  const [favoris, setFavoris] = useState([]);

  const getFavoris = () => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/postbyuser/${infoUser.id}`)
      .then((response) => {
        setFavoris(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const deletePost = (postId) => {
    axios
      .delete(
        `${import.meta.env.VITE_BACKEND_URL}/post/${infoUser.id}/${postId}`
      )
      .then(() => {
        setFavoris((prevFavoris) =>
          prevFavoris.filter((post) => post.post_id !== postId)
        );
      })
      .catch((error) => {
        console.error("Error deleting data:", error);
      });
  };

  useEffect(() => {
    console.info(infoUser.id);
    getFavoris();
  }, [infoUser.id]);

  return (
    <div className="main">
      <h1>Mes Favoris</h1>
      <div className="card_section">
        {favoris.map((car, index) => (
          <div className="card" key={index}>
            <CardPost details={car} />
            <div className="coeur">
              <MdDeleteOutline
                className="heart-icon"
                onClick={() => deletePost(car.post_id)}
              />
            </div>
            <Link to="/profileedit">
              <button type="button">Edit Profile</button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
