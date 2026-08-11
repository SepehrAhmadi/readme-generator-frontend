import axios from "axios";

export default defineNuxtPlugin(() => {
  const { API_URL } = useRuntimeConfig().public;

  const api = axios.create({
    baseURL: API_URL,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  return {
    provide: { axios: api },
  };
});
