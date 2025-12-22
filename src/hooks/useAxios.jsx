import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_DOMAIN_URL,
  withCredentials: true,
});

const useAxios = () => {
  return instance;
};

export default useAxios;
