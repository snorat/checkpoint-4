import React from "react";
import { Link } from "react-router-dom";
import { FaHeart, FaRegCommentDots } from "react-icons/fa";
import PropTypes from "prop-types";

export default function CardPost({ details }) {
  if (!details) {
    return <p>Erreur d'affichage des détails</p>;
  }

  return (
    <div className="allpost">
      <div className="main-content4">
        <div className="part1">
          <span className="circle-text">{details.first_letter}</span>
          <Link to="/myprofile">
            <h3>{details.firstname}</h3>
          </Link>
          <p>
            {details.created_at} ${details.created_time}
          </p>
        </div>
        <div className="details">
          <p> {details.content}</p>
        </div>
        <div className="icons-details">
          <span className="coeur">
            <FaHeart />
          </span>
          <span className="commentaire">
            <FaRegCommentDots />
          </span>
        </div>
      </div>
    </div>
  );
}

CardPost.propTypes = {
  details: PropTypes.shape({
    first_letter: PropTypes.string,
    firstname: PropTypes.string,
    created_at: PropTypes.string,
    created_time: PropTypes.string,
    content: PropTypes.string,
  }).isRequired,
};
