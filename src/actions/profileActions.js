import axios from "axios";
import {
  GET_PROFILE,
  PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE,
  GET_ERRORS
} from "./types";
import { logoutUser } from "./authActions";

//Get current profile
export const getCurrentProfile = () => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get("http://localhost:5000/api/profiles")
    .then(profile => {
      dispatch({ type: GET_PROFILE, payload: profile.data });
    })
    .catch(err => {
      dispatch({
        type: GET_PROFILE,
        payload: {}
      });
    });
};

//Profile loading
export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING
  };
};

//CLEAR current profile
export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE
  };
};

//CREATE PROFILE
export const createProfile = (profileData, history) => dispatch => {
  axios
    .post("http://localhost:5000/api/profiles", profileData)
    .then(profile => {
      history.push("/dashboard");
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//Delete account
export const deleteAccount = history => dispatch => {
  axios
    .delete("http://localhost:5000/api/profiles")
    .then(response => {
      dispatch(logoutUser());
      history.push("/login");
      dispatch({
        type: CLEAR_CURRENT_PROFILE
      });
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
