import React from "react";
import PropTypes from "prop-types";

export default function UserProfile({ userData }) {
  return (
    <div>
      <h1>
        {userData.firstname} {userData.lastname}
      </h1>
      <p>Registration Date: {userData.registration_date}</p>
    </div>
  );
}

UserProfile.propTypes = {
  userData: PropTypes.shape({
    firstname: PropTypes.string.isRequired,
    lastname: PropTypes.string.isRequired,
    registration_date: PropTypes.string.isRequired,
  }).isRequired,
};
