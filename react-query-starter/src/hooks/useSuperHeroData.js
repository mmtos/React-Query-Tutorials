import axios from "axios";
import { useQuery } from "react-query";

const fetchSuperHero = ({ queryKey }) => {
  console.log(queryKey); //useQuery의 첫번째 파라미터 : [queryId, heroId]
  const heroId = queryKey[1];
  return axios.get(`http://localhost:4000/superheroes/${heroId}`);
};

export const useSuperHeroData = (heroId) => {
  const queryId = "super-hero";
  //return useQuery([queryId, heroId], () => fetchSuperHero(heroId));
  //queryKey를 fetching function으로 전달해줌.
  return useQuery([queryId, heroId], fetchSuperHero);
};
