import React from "react";
import { useQuery } from "react-query";
import { fetchUserByEmail, fetchCoursesByChannelId } from "../api/userAPI";
/**
 * get user channel by email
 * get course by channelId
 * @returns
 */

function DependentQueriesPage({ email }) {
  const { data: user } = useQuery(["user", email], () =>
    fetchUserByEmail(email)
  );
  const channelId = user?.data.channelId;
  //channelId 있을때만 enable 되게
  useQuery(["courses", channelId], () => fetchCoursesByChannelId(channelId), {
    enabled: !!channelId,
  });
  return <div></div>;
}

export default DependentQueriesPage;
