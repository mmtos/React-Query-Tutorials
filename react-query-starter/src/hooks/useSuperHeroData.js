import axios from "axios";
import { useQuery, useQueryClient } from "react-query";

const fetchSuperHero = ({ queryKey }) => {
  console.log(queryKey); //useQuery의 첫번째 파라미터 : [queryId, heroId]
  const heroId = queryKey[1];
  return axios.get(`http://localhost:4000/superheroes/${heroId}`);
};

export const useSuperHeroData = (heroId) => {
  const queryId = "super-hero";
  //for access cache, set initial data
  const queryClient = useQueryClient();

  //return useQuery([queryId, heroId], () => fetchSuperHero(heroId));
  //queryKey를 fetching function으로 전달해줌.
  return useQuery([queryId, heroId], fetchSuperHero, {
    initialData: () => {
      const hero = queryClient
        .getQueryData("super-heroes")
        ?.data?.find((hero) => hero.id === parseInt(heroId));
      if (hero) {
        return {
          //structure important!
          data: hero,
        };
      } else {
        //undefined인 경우 hard loading state로 fetch 해옴.
        return undefined;
      }
    },
  });
};
