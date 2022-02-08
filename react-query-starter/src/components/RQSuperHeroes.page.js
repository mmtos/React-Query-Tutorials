import { useState } from "react";
import { Link } from "react-router-dom";
import { useSuperHeroesData } from "../hooks/useSuperHeroesData";

export const RQSuperHeroesPage = () => {
  const [_refetchInterval, set_refetchInterval] = useState(3000);
  const onSuccess = (data) => {
    console.log("perform side effect after query", data);
    if (data.data.length === 4) {
      set_refetchInterval(false);
    }
  };
  const onError = (error) => {
    console.log("perform side effect after encountering error", error);
    set_refetchInterval(false);
  };

  const { data, isLoading, isError, error, isFetching, refetch } =
    useSuperHeroesData(onSuccess, onError, _refetchInterval);

  console.log({ isLoading, isFetching });
  if (isLoading || isFetching) {
    // default : 5분동안 cache
    return <h2>Loading..</h2>;
  }

  if (isError) {
    // default : retry 설정되어 있어서 좀더 늦게 에러메시지가 뜸.
    return <h2>{error.message}</h2>;
  }

  return (
    <>
      <h2>React Query Super Heroes Page</h2>
      <button onClick={refetch}>fetch heroes</button>
      {data.data?.map((hero) => {
        return (
          <div key={hero.id}>
            <Link to={`/rq-super-heroes/${hero.id}`}>{hero.name}</Link>
          </div>
        );
      })}
    </>
  );
};
