import axios from "axios";
import { useState } from "react";
import { useQuery } from "react-query";

const fetchSuperHeros = () => {
  return axios.get("http://localhost:4000/superheroes1");
};
const queryOptions = {
  cacheTime: 1000 * 60 * 5,
  staleTime: 1,
  refetchOnWindowFocus: true,
  refetchOnMount: true,

  // //polling
  // refetchInterval: 2000,
  // //polling when user are not focus the window
  // refetchIntervalInBackground: true,
};
const autoQueryDisableOptions = { enabled: false };

export const RQSuperHeroesPage = () => {
  const queryKey = "super-heroes";
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

  const { data, isLoading, isError, error, isFetching, refetch } = useQuery(
    queryKey,
    fetchSuperHeros,
    Object.assign(queryOptions, {
      onSuccess,
      onError,
      refetchInterval: _refetchInterval,
    })
  );

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
      {data?.data.map((hero) => {
        return <div key={hero.name}>{hero.name}</div>;
      })}
    </>
  );
};
