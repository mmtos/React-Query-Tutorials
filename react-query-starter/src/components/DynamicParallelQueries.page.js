import React from "react";
import { getSuperHero } from "../api/superHeroesAPI";
import { useQueries } from "react-query";
export function DynamicParallelQueriesPage({ heroIds }) {
  const queries = heroIds.map((id) => {
    return {
      queryKey: ["super-hero", id],
      queryFn: () => getSuperHero(id),
    };
  });
  const result = useQueries(queries);
  console.log(result);
  return (
    <>
      <h2>DynamicParallelQueries</h2>
      <p>컴포넌트에서 실행되어야할 query의 개수가 동적으로 정해짐</p>
      <p>useQueries Hook 사용</p>
      <p>console.log 확인</p>
    </>
  );
}
