import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "react-query";

const fetchSuperHeros = () => {
  return axios.get("http://localhost:4000/superheroes");
};

const addSuperHero = (hero) => {
  //json-server에서 post 방식 제공함
  return axios.post("http://localhost:4000/superheroes", hero);
};

const queryOptions = {
  cacheTime: 1000 * 60 * 5,
  staleTime: 0,
  refetchOnWindowFocus: true,
  refetchOnMount: true,
  //select: (data) => data.data.map((hero) => hero.name),
  // //polling
  // refetchInterval: 2000,
  // //polling when user are not focus the window
  // refetchIntervalInBackground: true,
};
const autoQueryDisableOptions = { enabled: false };

export const useSuperHeroesData = (onSuccess, onError, refetchInterval) => {
  const queryId = "super-heroes";
  const _refetchInterval = refetchInterval ?? false;
  return useQuery(
    queryId,
    fetchSuperHeros,
    Object.assign(queryOptions, {
      onSuccess,
      onError,
      _refetchInterval,
    })
  );
};

export const useAddSuperHeroData = () => {
  // key가 필요 없음. 첫번째 인자는 mutation Function
  const queryClient = useQueryClient();
  return useMutation(addSuperHero, {
    // onSuccess: (data) => {
    //   //1. invalidate -> refetch
    //   //queryClient.invalidateQueries("super-heroes");
    //   //2. use POST response data, no additional fetch
    //   queryClient.setQueryData("super-heroes", (oldQueryData) => {
    //     return {
    //       ...oldQueryData,
    //       data: [...oldQueryData.data, data.data],
    //     };
    //   });
    // },
    onMutate: async (mutationParams) => {
      //onMutate is fired before mutation
      const newHero = mutationParams;

      //optimistic update 1. cancelQueries
      await queryClient.cancelQueries("super-heroes");
      const previousHero = queryClient.getQueryData("super-heroes");
      //optimistic update 2. setData with mutateParams
      queryClient.setQueryData("super-heroes", (oldQueryData) => {
        return {
          ...oldQueryData,
          data: [
            ...oldQueryData.data,
            { id: oldQueryData?.data?.length + 1, ...newHero },
          ],
        };
      });
      //optimistic update 3. return object for rollback (rollback in onError)
      return {
        previousHero,
      };
    },
    onError: (_error, mutationParams, context) => {
      //onError is fired when encounter error during onMutate
      queryClient.setQueryData("super-heroes", context.previousHero);
    },
    onSettled: () => {
      //like-finally. whether onMutate failed or successed, onSettled is fired
      queryClient.invalidateQueries("super-heroes");
    },
  });
};
