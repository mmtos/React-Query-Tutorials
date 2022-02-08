import axios from "axios";
import { useQuery } from "react-query";

const fetchSuperHeros = () => {
  return axios.get("http://localhost:4000/superheroes");
};

const queryOptions = {
  cacheTime: 1000 * 60 * 5,
  staleTime: 0,
  refetchOnWindowFocus: true,
  refetchOnMount: true,
  select: (data) => data.data.map((hero) => hero.name),
  // //polling
  // refetchInterval: 2000,
  // //polling when user are not focus the window
  // refetchIntervalInBackground: true,
};
const autoQueryDisableOptions = { enabled: false };

export const useSuperHeroesData = (onSuccess, onError, refetchInterval) => {
  const queryKey = "super-heroes";
  return useQuery(
    queryKey,
    fetchSuperHeros,
    Object.assign(queryOptions, {
      onSuccess,
      onError,
      refetchInterval,
    })
  );
};
