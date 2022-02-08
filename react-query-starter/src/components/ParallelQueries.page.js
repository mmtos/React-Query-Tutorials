import React from "react";
import useFriendsData from "../hooks/useFriendsData";
import { useSuperHeroesData } from "../hooks/useSuperHeroesData";

const onSuccess = () => {
  console.log("super heroes success");
};
const onError = () => {
  console.log("super heroes error");
};
export function ParallelQueriesPage() {
  const { data: friends } = useFriendsData();
  const { data: superheroes } = useSuperHeroesData(onSuccess, onError);
  return (
    <>
      {friends?.data.map((friend) => {
        return <div key={friend.id}>{friend.name}</div>;
      })}

      {superheroes?.data.map((hero) => {
        return <div key={hero.id}>{hero.name}</div>;
      })}
    </>
  );
}
