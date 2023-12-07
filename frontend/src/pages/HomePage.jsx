import React, { useState, useEffect } from "react";
import axios from "axios";
import CardPost from "../components/CardPost";

export default function HomePage() {
  const [posts, setPosts] = useState([]);

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
    <div className="allpost">
      <h2>Home</h2>
      {posts.map((post) => (
        <CardPost key={post.post_id} details={post} />
      ))}
    </div>
  );
}
