import axios from "axios";

const domain = "http://localhost:4000";
export const fetchUserByEmail = (email) => {
  return axios.get(`${domain}/users/${email}`);
};

export const fetchCoursesByChannelId = (channelId) => {
  return axios.get(`${domain}/channels/${channelId}`);
};
