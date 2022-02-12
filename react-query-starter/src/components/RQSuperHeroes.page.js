import { useState } from "react";
import { Link } from "react-router-dom";
import {
  useSuperHeroesData,
  useAddSuperHeroData,
} from "../hooks/useSuperHeroesData";

export const RQSuperHeroesPage = () => {
  const [name, setName] = useState("");
  const [alterEgo, setAlterEgo] = useState("");
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

  const { mutate } = useAddSuperHeroData();

  console.log({ isLoading, isFetching });

  const handleAddHeroClick = () => {
    console.log(name, alterEgo);
    mutate({ name, alterEgo });
  };

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

      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      ></input>
      <input
        type="text"
        value={alterEgo}
        onChange={(e) => setAlterEgo(e.target.value)}
      ></input>
      <button type="button" onClick={handleAddHeroClick}>
        Add Hero
      </button>

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
