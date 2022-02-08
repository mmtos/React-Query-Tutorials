import axios from "axios";

const domain = "http://localhost:4000";
export const getSuperHero = (heroId) => {
  return axios.get(`${domain}/superheroes/${heroId}`);
};
