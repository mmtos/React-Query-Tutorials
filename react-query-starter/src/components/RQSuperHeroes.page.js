import axios from "axios";
import { useQuery } from "react-query";

const fetchSuperHeros = () => {
  return axios.get("http://localhost:4000/superheroes");
};
export const RQSuperHeroesPage = () => {
  const queryKey = "super-heroes";
  const { data, isLoading, isError, error, isFetching } = useQuery(
    queryKey,
    fetchSuperHeros,
    {
      cacheTime: 1000 * 60 * 5,
      staleTime: 1,
      refetchOnWindowFocus: true,
      refetchOnMount: true,
      //polling
      refetchInterval: 2000,
      //polling when user are not focus the window
      refetchIntervalInBackground: true,
    }
  );

  console.log({ isLoading, isFetching });
  if (isLoading) {
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
      {data?.data.map((hero) => {
        return <div key={hero.name}>{hero.name}</div>;
      })}
    </>
  );
};
