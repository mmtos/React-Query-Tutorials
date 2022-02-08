import axios from "axios";
import { useQuery } from "react-query";

const fetchFriends = ({ queryKey }) => {
  return axios.get("http://localhost:4000/friends");
};

export default function useFriendsData() {
  const friendId = "1";
  const queryKey = ["friends", friendId];
  return useQuery(queryKey, fetchFriends);
}
