/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Button, Image } from 'react-bootstrap';
import Head from 'next/head';
// import PropTypes from 'prop-types';
import { useAuth } from '../utils/context/authContext';
import { signOut } from '../utils/auth';
import { getSingleUser, deleteUser } from '../api/userData';

export default function UserProfile() {
  const { user } = useAuth();
  const router = useRouter();

  // SET A STATE FOR THE USER
  const [userDetails, setUserDetails] = useState({});

  // FUNCTION TO DELETE USER PROFILE
  const deleteProfile = () => {
    if (window.confirm('Are you sure you would like to delete your profile? You cannot undo this action.')) {
      deleteUser(user.id).then(() => signOut());
    }
  };

  // API FUNCTION TO GET SINGLE USER
  const getTheSingleUser = () => {
    getSingleUser(user.id).then(setUserDetails);
  };
  console.warn(userDetails);

  // API CALL TO GET THE USER ON COMPONENT RENDER
  useEffect(() => {
    document.title = 'Feet First';
    getTheSingleUser(user.id);
  }, []);

  return (
    <>
      <Head>
        <title>Profile</title>
      </Head>
      {/* <div className="d-flex flex-column"> */}
      <div className="user-profile-page">
        <Image
          className="plant-image"
          src={userDetails.profile_image_url}
          alt={userDetails.name}
          style={{
            width: '300px', borderRadius: '0px', border: '3px solid #014415', boxShadow: '6px 6px rgb(216, 208, 208)',
          }}
        />
      </div>
      <div className="profile-font" style={{ marginTop: '35px' }}>
        <h1 className="post-details-title">{userDetails.first_name} {userDetails.last_name}</h1>
        <h4 className="post-details-title">{userDetails.email}</h4>
        <h4 className="post-details-text">User Name: <em>{userDetails.username}</em> </h4>
        <Button
          className="profile-btn"
          variant="outline-dark"
          onClick={() => {
            router.push(`/users/edit/${userDetails.id}`);
          }}
        >
          Edit Profile
        </Button>
        <Button variant="outline-dark" className="profile-btn" style={{ marginLeft: 5 }} onClick={deleteProfile}> Delete Profile
        </Button>
      </div>
    </>
  );
}
// DOES PROPTYPES NEED TO BE HERE?
// Throws erros when active: "Warning: Failed prop type: The prop `userObj` is marked as required in `UserProfile`, but its value is `undefined`."
// UserProfile.propTypes = {
//   userObj: PropTypes.shape({
//     username: PropTypes.string,
//     first_name: PropTypes.string,
//     last_name: PropTypes.string,
//     email: PropTypes.string,
//     uid: PropTypes.string,
//     profile_image_url: PropTypes.string,

//   }).isRequired,
// };
// BELOW GOES AFTER userObj PropTypes
// .isRequired,
