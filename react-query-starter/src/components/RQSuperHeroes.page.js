import axios from "axios";
import { useQuery } from "react-query";

const fetchSuperHeros = () => {
  return axios.get("http://localhost:4000/superheroes1");
};
export const RQSuperHeroesPage = () => {
  const queryKey = "super-heroes";
  const { data, isLoading, isError, error } = useQuery(
    queryKey,
    fetchSuperHeros
  );

  if (isLoading) {
    return <h2>Loading..</h2>;
  }

  if (isError) {
    //retry가 기본적으로 설정되어 있어서 좀더 늦게 에러메시지가 뜸.
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
