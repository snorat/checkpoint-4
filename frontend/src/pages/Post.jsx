import axios from "axios";
import React, { useState, useContext, useEffect } from "react";
import ExportContext from "../contexts/Context";
import CardPost from "../components/CardPost";
import "../styles/post.css";

export default function Post() {
  const { infoUser } = useContext(ExportContext.Context);
  const [posts, setPosts] = useState([]);
  const [postData, setPostData] = useState({
    user_id: infoUser.id,
    content: "",
    image_1: "",
  });

  const handleInputChange = (e) => {
    setPostData({ ...postData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/post`, postData)
      .then((response) => {
        console.info("Post créé avec succès:", response.data);
        setPostData({ user_id: infoUser.id, content: "" });

        // Mettez à jour les posts après la création d'un nouveau post
        setPosts((prevPosts) => [response.data, ...prevPosts]);
      })
      .catch((error) => {
        console.error("Erreur lors de la création du post:", error);
      });
  };

  const handleFileChange = (event) => {
    setPostData((prevData) => ({
      ...prevData,
      image_1: event.target.files[0],
    }));
  };

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/posts`)
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des posts:", error);
      });
  }, []);

  return (
    <>
      <div className="PostContainer">
        <h2>Créer un nouveau post</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Contenu du post:
            <textarea
              name="content"
              value={postData.content}
              onChange={handleInputChange}
            />
            <input type="file" name="image_1" onChange={handleFileChange} />
          </label>
          <br />
          <button type="submit">Post</button>
        </form>
      </div>
      <div className="allpost">
        {posts.map((post) => (
          <CardPost key={post.post_id} details={post} />
        ))}
      </div>
    </>
  );
}
