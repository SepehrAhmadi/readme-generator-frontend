import type { useGeneratorState } from "./state";
import { useApi } from "~/composables/useApi";
import { useHandlerStore } from "~/store/handler";

type StateType = ReturnType<typeof useGeneratorState>;

export function useGeneratorActions(state: StateType) {
  const createOrUpdateRepository = (githubUrl: string) => {
    const axios = useApi();
    const handlerStore = useHandlerStore();
    handlerStore.loading = true;

    return axios
      .post("/repository", { githubUrl })
      .then((res) => {
        state.repositoryResult.value = res.data.data;
      })
      .catch((err) => {
        console.log(err);
        const message = err.response?.data?.message || "Something went wrong. Please try again.";
        handlerStore.setError(message);
      })
      .finally(() => {
        setTimeout(() => {
          handlerStore.loading = false;
        }, 500);
      });
  };

  const startGeneration = (repositoryId: number) => {
    const axios = useApi();
    const handlerStore = useHandlerStore();
    handlerStore.loading = true;

    return axios
      .get(`/generationJob/${repositoryId}/generate`)
      .then((res) => {
        state.jobResult.value = res.data.data;
      })
      .catch((err) => {
        console.log(err);
        const message = err.response?.data?.message || "Something went wrong. Please try again.";
        handlerStore.setError(message);
      })
      .finally(() => {
        setTimeout(() => {
          handlerStore.loading = false;
        }, 500);
      });
  };

  const getJobStatus = (jobId: number) => {
    const axios = useApi();
    const handlerStore = useHandlerStore();
    handlerStore.loading = true;

    return axios
      .get(`/generation-job/${jobId}`)
      .then((res) => {
        state.jobResult.value = res.data.data;
      })
      .catch((err) => {
        console.log(err);
        const message = err.response?.data?.message || "Something went wrong. Please try again.";
        handlerStore.setError(message);
      })
      .finally(() => {
        setTimeout(() => {
          handlerStore.loading = false;
        }, 500);
      });
  };

  return {
    createOrUpdateRepository,
    startGeneration,
    getJobStatus,
  };
}
